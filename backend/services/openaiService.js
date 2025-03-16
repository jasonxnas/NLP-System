const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config(); // No path needed for Render

// OpenAI API Key
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

// Model used for chatbot (e.g., gpt-4, gpt-3.5-turbo)
const gptModel = process.env.MODEL || "gpt-4"; // Default to gpt-4 if MODEL is not set

// Function to call GPT
async function callGPT(promptContent, systemContent, previousChat) {
  try {
    const messages = [
      { role: "user", content: promptContent },
      { role: "system", content: systemContent },
      { role: "assistant", content: previousChat },
    ].filter(m => m.content); // Remove empty messages

    const response = await openai.chat.completions.create({
      model: gptModel,
      messages: messages,
    });

    console.log("Response:", response.choices[0].message.content);
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return `An error occurred while processing the request: ${error.message}`;
  }
}

module.exports = { callGPT };
