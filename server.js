const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/chat", chatRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Stocke l'agent en charge de chaque client
const clientAgentMap = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (role) => {
    if (role === "client") {
      socket.join(socket.id); // Chaque client rejoint une salle unique avec son propre ID de socket
      socket.role = "client";
      console.log(`Client ${socket.id} joined room: ${socket.id}`);
    } else if (role === "agent") {
      socket.join("agents"); // Les agents rejoignent tous la salle commune "agents"
      socket.role = "agent";
      console.log(`Agent ${socket.id} joined room: agents`);
    }
  });

  // Gestion des messages envoyés par le client
  socket.on("client_message", (data) => {
    const clientRoom = socket.id; // Utilise l'ID de socket du client pour nommer sa salle

    // Réinitialise la prise en charge d'un agent à chaque message client
    delete clientAgentMap[clientRoom];

    io.to("agents").emit("server_message", { ...data, room: clientRoom });
    io.to("agents").emit("clear_notification", clientRoom);
    console.log(`Message from client ${clientRoom} sent to agents`);
  });

  // Gestion des réponses envoyées par l'agent
  socket.on("agent_message", (data) => {
    const { content, room } = data;
    
    // Si aucun agent n'a encore pris en charge ce client
    if (!clientAgentMap[room]) {
      clientAgentMap[room] = socket.id; // Associe l'agent actuel au client
    }

    // Si l'agent actuel est celui en charge, il envoie la réponse au client
    if (clientAgentMap[room] === socket.id) {
      io.to(room).emit("server_message", { sender: "agent", content });
      console.log(`Message from agent ${socket.id} sent to client in room ${room}`);

      // Notifier les autres agents qu'une réponse a été envoyée, sauf à celui qui a envoyé la réponse
      socket.broadcast.to("agents").emit("response_sent", { room });
    } else {
      console.log(`Agent ${socket.id} ignored for client in room ${room}, as another agent took over`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Si un agent se déconnecte, supprime la prise en charge pour les clients associés
    if (socket.role === "agent") {
      for (const clientRoom in clientAgentMap) {
        if (clientAgentMap[clientRoom] === socket.id) {
          delete clientAgentMap[clientRoom];
        }
      }
    }
  });
});
