
# Chatlive Backend

## Description

Chatlive Backend est une application de serveur qui supporte une application de chat en temps réel avec des suggestions d'IA fournies par OpenAI. Ce projet est construit avec Node.js, Express, MongoDB, et utilise des sockets pour la communication en temps réel.

## Structure du Projet

Voici la structure actuelle du projet, avec une description de chaque dossier et fichier.

- **backend/**
  - **config/**
    - `db.js`: Connexion à la base de données MongoDB.
  - **controllers/**
    - `openaiController.js`: Intégration avec OpenAI pour la suggestion IA.
  - **models/**
    - `Model.js`: Modèle Mongoose pour les messages.
  - **routes/**
    - `chatRoutes.js`: Routes de l’API pour le chat.
  - `.env`: Variables d'environnement.
  - `server.js`: Fichier principal pour démarrer le serveur (contient la configuration des sockets).
  - `package.json`: Fichier des dépendances et scripts du projet.

## Installation

Suivez ces étapes pour installer et configurer le projet en local.

1. **Clonez le dépôt** :
   ```bash
   git clone url
   cd Chatlive-backend
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   - Créez un fichier `.env` à la racine du projet en utilisant les variables nécessaires (voir `.env.example` s'il est fourni).
   - Exemple de variables d'environnement :
     ```makefile
     MONGO_URI=your_mongodb_connection_string
     OPENAI_API_KEY=your_openai_api_key
     PORT=5000
     ```

## Utilisation

1. **Démarrez le serveur en mode développement** :
   ```bash
   npm run dev
   ```

2. Le serveur sera accessible à `http://localhost:5000` par défaut, mais vous pouvez ajuster le port dans le fichier `.env`.


## Améliorations Futures

- **Séparation de la Configuration des Sockets** : Actuellement, la configuration des sockets est incluse dans le fichier `server.js`. Une amélioration future consisterait à déplacer cette configuration dans un fichier dédié, tel que `config/socket.js`, pour améliorer la modularité et l'organisation du projet.

## Dépendances

- **Node.js** et **Express** : Pour créer et gérer le serveur.
- **MongoDB** avec **Mongoose** : Pour gérer la base de données.
- **OpenAI API** : Fournit les suggestions de réponses IA pour le chat en temps réel.
- **Socket.io** : Pour les communications en temps réel dans le chat.


