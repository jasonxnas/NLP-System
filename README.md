# Chat Bot using React.js, Node.js, Express.js, and OpenAI API

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Openai](https://img.shields.io/badge/Openai-404D59?style=for-the-badge)

## Description

This is a chat bot built with React.js, Node.js and Express.js, integrated with OpenAI's API to provide natural language processing capabilities. The bot can engage in conversations with users, answer questions, and provide responses based on the context of the conversation.

## Features

- Natural Language Processing (NLP) using OpenAI's API.
- Interactive conversations with users.
- Ability to answer questions and provide context-aware responses.
- Fully customizable/tweakable



## Installation

1. Clone the repository:

```bash
git clone https://github.com/jasonxnas/NLP-System.git
cd react-chat-bot
```

2. Install dependencies:

```bash
npm install
```

3. Obtain OpenAI API Key:

Sign up for an account at OpenAI.
Get your API key from the OpenAI dashboard.
Create a .env file in the root directory and add your API key:
```dotenv
API_KEY='YOUR KEY HERE'
# You may need to change this depending on your accounts access, gpt 3.5 is available to all accounts
MODEL='gpt-4'
# MODEL='gpt-3.5-turbo-1106' This model is soon to be deprecated
# MODEL='gpt-3.5-turbo'
# If you change this express port, it also must be changed in frontend/src/chat/Chat.jsx EXPRESS_PORT variable
EXPRESS_PORT='3000' 
VITE_PORT='5173'
```
```javascript
const gptModel = process.env.MODEL;
const response = await openai.createChatCompletion({
      model: gptModel,
      messages: messages,
    });
```
NOTE: Works best with GPT-4

## Usage
Run the following command from the root directory
```bash
npm start
```



