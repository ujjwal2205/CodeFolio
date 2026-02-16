import React, { useContext, useState } from "react";
import "./ChatDock.css";
import { StoreContext } from "../../context/StoreContext";

function ChatDock() {
  const { openChat,login } = useContext(StoreContext);

  const user = { userId: "u1", userName: "You" };

  const dummyConversations = [
    {
      _id: "c1",
      members: [
        { _id: "u1", userName: "You" },
        { _id: "u2", userName: "Rahul" }
      ],
      lastMessage: { text: "Bro kal milte hain?" },
      updatedAt: "2026-02-14T10:30:00",
      status: "online"
    },
    {
      _id: "c2",
      members: [
        { _id: "u1", userName: "You" },
        { _id: "u3", userName: "Aman" }
      ],
      lastMessage: { text: "Project ho gaya?" },
      updatedAt: "2026-02-13T16:10:00",
      status: "offline"
    },
    {
      _id: "c3",
      members: [
        { _id: "u1", userName: "You" },
        { _id: "u4", userName: "Sahil" }
      ],
      lastMessage: {
        text: "Kal call karte hain bhai thoda lamba message check truncate ho raha hai ya nahi"
      },
      updatedAt: "2026-02-16T09:00:00",
      status: "online"
    }
  ];

  const [conversations] = useState(dummyConversations);
  const [isMinimized, setIsMinimized] = useState(true);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diff = now - date;
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } else {
      return date.toLocaleDateString();
    }
  };

  return ( 
    login && (
    <div className={`chatdock-container ${isMinimized ? "chatdock-minimized" : ""}`}>
      <div className="chatdock-header">
        <h4 className="chatdock-title">Messages</h4>
        <button
          className="chatdock-minimize-btn"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? "▢" : "—"}
        </button>
      </div>

      {!isMinimized && (
        <div className="chatdock-list">
          {conversations.map((conv) => {
            const otherUser = conv.members.find(
              (m) => m._id !== user.userId
            );

            return (
              <div
                key={conv._id}
                className="chatdock-user"
                onClick={() => openChat(conv)}
              >
                <div
                  className={`chatdock-avatar ${
                    conv.status === "online"
                      ? "chatdock-online"
                      : "chatdock-offline"
                  }`}
                >
                  {otherUser.userName.charAt(0).toUpperCase()}
                </div>

                <div className="chatdock-info">
                  <div className="chatdock-top">
                    <span className="chatdock-name">
                      {otherUser.userName}
                    </span>
                    <span className="chatdock-time">
                      {formatTime(conv.updatedAt)}
                    </span>
                  </div>

                  <div className="chatdock-last-message">
                    {conv.lastMessage?.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    
    )
  );
}

export default ChatDock;
