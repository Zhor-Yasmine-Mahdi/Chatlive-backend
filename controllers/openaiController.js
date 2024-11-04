const { OpenAIApi, Configuration } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }));
  


const getAIResponse = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });
    res.json({ aiResponse: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error with OpenAI API:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Unable to fetch response from AI." });
  }
};

module.exports = { getAIResponse };
