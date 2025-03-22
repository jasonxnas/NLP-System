import React, { useState, useEffect, useRef } from "react";
import ChatBody from "../components/ChatBody";
import ChatInput from "../components/ChatInput";

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [typingIntervalId, setTypingIntervalId] = useState(null);
  const [typingIndicatorMessage, setTypingIndicatorMessage] =
    useState("Typing");
  const [darkMode, setDarkMode] = useState(false); // 🔹 Added dark mode state

  const EXPRESS_PORT = 3000;
  const firstRender = useRef(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#1e1e1e";
  };

  const displayUserMessage = (message) => {
    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { message, type: "user" },
    ]);
    setUserInput("");
  };

  const displayChatbotMessage = (message) => {
    if (isChatbotTyping) {
      clearInterval(typingIntervalId);
      setIsChatbotTyping(false);
    }

    setChatMessages((prevChatMessages) => [
      ...prevChatMessages,
      { message, type: "chatbot" },
    ]);
  };

  const displayTypingIndicator = () => {
    if (!isChatbotTyping) {
      setIsChatbotTyping(true);
      clearInterval(typingIntervalId);
      const intervalId = setInterval(() => {
        setTypingIndicatorMessage((prevMessage) => {
          if (prevMessage === "Typing...") return "Typing";
          if (prevMessage === "Typing") return "Typing.";
          if (prevMessage === "Typing.") return "Typing..";
          if (prevMessage === "Typing..") return "Typing...";
        });
      }, 400);
      setTypingIntervalId(intervalId);
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    displayUserMessage(userInput);
    displayTypingIndicator();

    try {
      const response = await fetch(`http://127.0.0.1:${EXPRESS_PORT}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      displayChatbotMessage(data.message);
      setIsChatbotTyping(false);
    } catch (error) {
      console.error("Error:", error);
      displayChatbotMessage(`Sorry, an error occurred... (${error})`);
      setIsChatbotTyping(false);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      displayChatbotMessage(
        "Hi, I'm a Chat Bot. What can I help you with today?"
      );
    }
  }, []);

  return (
    <div className={`chat-container ${darkMode ? "dark-mode" : ""}`}>
      {/* 🔹 Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="chat-title">
        <img src="/favicon.png" alt="Chat Logo" className="chat-logo" />
        ChatBot
      </div>
      <ChatBody
        chatMessages={chatMessages}
        isChatbotTyping={isChatbotTyping}
        typingIndicatorMessage={typingIndicatorMessage}
      />
      <ChatInput
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message here..."
        onClick={sendMessage}
      />
    </div>
  );
};

export default Chat;
