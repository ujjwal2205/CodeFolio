import React, { useEffect, useState,useContext } from "react";
import { toast } from "react-toastify";
import {Trophy,Hash,UserMinus,Check,X,Users,UserPlus} from "lucide-react";
import "./Friends.css";
import {StoreContext} from '../../context/StoreContext.jsx'
import {useNavigate} from "react-router-dom";

function Friends() {
  const [activeTab, setActiveTab] = useState("friends");
  const [loading, setLoading] = useState(true);
  const {friends,requests}=useContext(StoreContext);
  const navigate=useNavigate();
  useEffect(()=>{
    console.log(friends);
  },[]);
  const acceptRequest = (id) => {
    const user = requests.find((r) => r._id === id);
    setRequests((prev) => prev.filter((r) => r._id !== id));
    setFriends((prev) => [...prev, { ...user, score: 0, rank: "—" }]);
    toast.success("Friend added 🎉");
  };

  const rejectRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r._id !== id));
    toast.info("Request rejected");
  };

  const removeFriend = (id) => {
    if (!window.confirm("Remove this friend?")) return;
    setFriends((prev) => prev.filter((f) => f._id !== id));
    toast.error("Friend removed");
  };

  return (
    <div className="friends-page">
      <h2>Friends</h2>

      <div className="friends-tabs">
        <button
          className={activeTab === "friends" ? "active" : ""}
          onClick={() => setActiveTab("friends")}
        >
          <Users size={16} />
          Friends <span>{friends.length}</span>
        </button>
        <button
          className={activeTab === "requests" ? "active" : ""}
          onClick={() => setActiveTab("requests")}
        >
          <UserPlus size={16} />
          Requests <span>{requests.length}</span>
        </button>
      </div>

      {friends!=null && activeTab === "friends" && (
        <div className="friends-list">
          {friends.length === 0 ? (
            <p className="empty">No friends yet 🥲</p>
          ) : (
            friends.map((f) => (
              <div className="friend-row" key={f._id} onClick={()=>navigate(`/dashboard/${f.userName}`)}
              style={{cursor:"pointer"}}>
                <div className="friend-left">
                  <div className="avatar">
                    {f.userName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4>{f.userName}</h4>

                    {/* ---- SCORE + RANK ---- */}
                    <div className="meta">
                      <span className="score">
                        <Trophy size={13} />
                        {f.score}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  title="Remove friend"
                  onClick={() => removeFriend(f._id)}
                >
                  <UserMinus size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ---------- REQUESTS ---------- */}
      {requests!=null && activeTab === "requests" && (
        <div className="friends-list" >
          {requests.length === 0 ? (
            <p className="empty">No pending requests ✨</p>
          ) : (
            requests.map((r) => (
              <div className="friend-row" key={r._id} onClick={()=>navigate(`/dashboard/${r.userName}`)}
              style={{cursor:"pointer"}}>
                <div className="friend-left">
                  <div className="avatar alt">
                    {r.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{r.userName}</h4>
                    <p className="subtext">wants to connect</p>
                  </div>
                </div>

                <div className="request-actions">
                  <button
                    className="accept"
                    title="accept"
                    onClick={() => acceptRequest(r._id)}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className="reject"
                    title="reject"
                    onClick={() => rejectRequest(r._id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Friends;
