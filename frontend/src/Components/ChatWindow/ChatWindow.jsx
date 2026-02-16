import React, { useContext, useState, useRef,useEffect } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./ChatWindow.css";

function ChatWindow() {
  const { openChats, closeChat,messages,setMessages } = useContext(StoreContext);
  const [inputMap, setInputMap] = useState({});
  const [minimizedChats,setMinimizedChats]=useState({});
  const scrollRefs = useRef({});
  
  const handleInputChange = (chatId, value) => {
    setInputMap(prev => ({ ...prev, [chatId]: value }));
  };
  const toggleMinimize=(chatId)=>{
    setMinimizedChats((prev)=>({
      ...prev,[chatId]:!prev[chatId]
    }))
  }
  const handleSend = (chatId) => {
    const text = inputMap[chatId]?.trim();
    if (!text) return;
    setMessages(prev=>({...prev,[chatId]:[...(prev[chatId] || []),{
      senderId:"u1",
      text,
      timestamp:new Date().toISOString()
    }]}))
    setInputMap(prev => ({ ...prev, [chatId]: "" }));
    if (scrollRefs.current[chatId]) {
      scrollRefs.current[chatId].scrollTop = scrollRefs.current[chatId].scrollHeight;
    }
  };

  return (
    <div className="chat-windows-container">
      {openChats.map((conv, index) => {
        const otherUser = conv.members.find(m => m._id !== "u1");
        const isMinimized=minimizedChats[conv._id];
        return (
          <div
            key={conv._id}
            className={`chat-window ${isMinimized ? "minimized" : ""}`}
            style={{ left: `${index * 340 + 10}px` }} // Dock ke left se stack
          >
            <div className="chat-window-header">
              <span>{otherUser.userName}</span>
              <div className="chat-header-actions">
              <button
               className="minimize-btn"
               onClick={()=>toggleMinimize(conv._id)}
               >
                {isMinimized? "▢" : "—"}
               </button>
              <button className="close-btn" onClick={() => closeChat(conv)}>
                ×
              </button>
              </div>
            </div>
            {!isMinimized && (
              <>
            <div
              className="chat-window-messages"
              ref={el => (scrollRefs.current[conv._id] = el)}
            >
              {messages[conv._id]?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${msg.senderId === "u1" ? "self" : "other"}`}
                >
                  <div className="message-text">
                   {msg.text}
                   </div>
                  <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                  day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
                   })}
                 </div>
                </div>
                
              ))}
            </div>

            <div className="chat-window-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMap[conv._id] || ""}
                onChange={e => handleInputChange(conv._id, e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend(conv._id)}
              />
            </div>
            </>)}
          </div>
        );
      })}
    </div>
  );
}

export default ChatWindow;
