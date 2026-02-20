import React, { useContext, useState,useEffect } from "react";
import "./ChatDock.css";
import { StoreContext } from "../../context/StoreContext";

function ChatDock() {
  const { openChat, login, onlineUsers, conversations, user } =
    useContext(StoreContext);
  const isOnline = (friendId) => {
    return onlineUsers.includes(friendId);
  };

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
      <div
        className={`chatdock-container ${
          isMinimized ? "chatdock-minimized" : ""
        }`}
      >
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

              const unread =
                conv.unreadCount?.[user.userId] || 0;

              return (
                <div
                  key={conv._id}
                  className={`chatdock-user ${
                    unread > 0 ? "chatdock-unread" : ""
                  }`}
                  onClick={() => openChat(conv)}
                >
                  <div
                    className={`chatdock-avatar ${
                      isOnline(otherUser._id)
                        ? "chatdock-online"
                        : "chatdock-offline"
                    }`}
                  >
                    {otherUser.userName
                      .charAt(0)
                      .toUpperCase()}

                    {unread > 0 && (
                      <span className="chatdock-badge">
                        {unread}
                      </span>
                    )}
                  </div>

                  <div className="chatdock-info">
                    <div className="chatdock-top">
                      <span
                        className={`chatdock-name ${
                          unread > 0 ? "bold" : ""
                        }`}
                      >
                        {otherUser.userName}
                      </span>
                      <span className="chatdock-time">
                        {formatTime(conv.updatedAt)}
                      </span>
                    </div>

                    <div
                      className={`chatdock-last-message ${
                        unread > 0 ? "bold" : ""
                      }`}
                    >
                      {conv.lastMessage}
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
