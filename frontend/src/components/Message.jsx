import React from "react";
import "../css/Message.css";

const Message = ({ message, type, isLast }) => {
  return (
    <div
      className={`${
        type === "user" ? "user-message mine" : "chatbot-message yours"
      } ${isLast ? "last" : ""}`}
    >
      {message}
    </div>
  );
};

export default Message;
