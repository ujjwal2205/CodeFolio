import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import {Trophy,UserMinus,Check,X,Users,UserPlus} from "lucide-react";
import "./Friends.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function Friends() {
  const [activeTab, setActiveTab] = useState("friends");
  const { friends, requests,setFriends,setRequests,url,fetchFriendsAndRequests2,onlineUsers } = useContext(StoreContext);
  const navigate = useNavigate();
  const isOnline=(friendId)=>{
    return onlineUsers.includes(friendId);
  }
  useEffect(() => {
    console.log(friends);
  }, [friends,requests]);
  
  const acceptRequest = async(userName) => {
    try {
      const response=await axios.post(url+"/api/friends/acceptFriendRequest",{
        senderUserName:userName
      },{withCredentials:true})
      if(response.data.success){
        fetchFriendsAndRequests2();
        toast.success("Friend added 🎉");
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const rejectRequest = async(userName) => {
    try {
      const response=await axios.post(url+"/api/friends/rejectFriendRequest",{
      senderUserName:userName
      },{withCredentials:true});
      if(response.data.success){
        fetchFriendsAndRequests2();
        toast.info("Request rejected");
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const removeFriend = async(userName) => {
    const result=await Swal.fire({
      title:"Remove friend?",
      text:"This action cannot be undone",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:"Yes, remove",
      cancelButtonText:"Cancel"
    })
    if (!result.isConfirmed){
       return;
    }
    else{
      try {
        const response=await axios.post(url+"/api/friends/removeFriend",{
          friendUserName:userName
        },{withCredentials:true});
        if(response.data.success){
          fetchFriendsAndRequests2();
          toast.error("Friend removed");
        }
        else{
          toast.error(response.data.messsage);
        }
      } catch (error) {
        console.log(error);
      }
    }

  };

  return (
    <div className="fr-page">
      <h2>Friends</h2>

      <div className="fr-tabs">
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

      {friends != null && activeTab === "friends" && (
        <div className="fr-list">
          {friends.length === 0 ? (
            <p className="fr-empty">No friends yet 🥲</p>
          ) : (
            friends.map((f) => (
              <div
                className="fr-row"
                key={f._id}
                onClick={() => navigate(`/dashboard/${f.userName}`)}
              >
                <div className="fr-left">
                  <div className="fr-avatar">
                    {f.userName.charAt(0).toUpperCase()}
                    <span className={`status-dot ${isOnline(f._id) ? "online" : "offline"}`}/>
                  </div>
                  <div>
                    <h4>{f.userName}</h4>
                    <div className="fr-meta">
                      <span className="fr-score">
                        <Trophy size={13} />
                        {f.score}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="fr-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFriend(f.userName);
                  }}
                  title="Remove Friend"
                >
                  <UserMinus size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {requests != null && activeTab === "requests" && (
        <div className="fr-list">
          {requests.length === 0 ? (
            <p className="fr-empty">No pending requests ✨</p>
          ) : (
            requests.map((r) => (
              <div
                className="fr-row"
                key={r._id}
                onClick={() => navigate(`/dashboard/${r.userName}`)}
              >
                <div className="fr-left">
                  <div className="fr-avatar fr-alt">
                    {r.userName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4>{r.userName}</h4>
                    <p className="fr-subtext">wants to connect</p>
                  </div>
                </div>

                <div className="fr-actions">
                  <button
                    className="fr-accept"
                    onClick={(e) => {
                      e.stopPropagation();
                      acceptRequest(r.userName);
                    }}
                    title="Accept"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    className="fr-reject"
                    onClick={(e) => {
                      e.stopPropagation();
                      rejectRequest(r.userName);
                    }}
                    title="Reject"
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
