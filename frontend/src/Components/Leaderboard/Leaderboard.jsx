import React, { useState,useEffect,useContext} from "react";
import "./Leaderboard.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
function Leaderboard() {
  const [activeTab, setActiveTab] = useState("overall");
  const {url}=useContext(StoreContext);
  const [userName,setUserName]=useState("");
  const [leaderBoardData,setLeaderBoardData]=useState({
    overall:[],
    leetCode:[],
    codeChef:[],
    codeForces:[]
  })
 
  useEffect(()=>{
    const fetchLeaderBoard=async()=>{
        try {
            const [leaderboard,leetCode,codeChef,codeForces]=await Promise.all([
                axios.post(url+"/api/Leaderboard/fetchLeaderboard",{},{withCredentials:true}),
                axios.post(url+"/api/Leaderboard/fetchLeetcodeLeaderBoard",{},{withCredentials:true}),
                axios.post(url+"/api/Leaderboard/fetchCodeChefLeaderBoard",{},{withCredentials:true}),
                axios.post(url+"/api/Leaderboard/fetchCodeForcesLeaderBoard",{},{withCredentials:true}),
            ])
            if(leaderboard.data.success){
                setUserName(leaderboard.data.userName);
                setLeaderBoardData(prev=>({...prev,overall:leaderboard.data.data}));
            }
            else{
                toast.error(leaderBoardData.data.message);
                console.log(leaderboard.data.message);
            }
            if(leetCode.data.success){
                setLeaderBoardData(prev=>({...prev,leetCode:leetCode.data.data}));
            }
            else{
                toast.error(leaderBoardData.data.message);
                console.log(leaderBoardData.data.message);
            }
            if(codeChef.data.success){
                setLeaderBoardData(prev=>({...prev,codeChef:codeChef.data.data}));
            }
            else{
                toast.error(codeChef.data.message);
                console.log(codeChef.data.message);
            }
            if(codeForces.data.success){
                setLeaderBoardData(prev=>({...prev,codeForces:codeForces.data.data}));
            }
            else{
                toast.error(codeForces.data.message);
                console.log(codeForces.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    fetchLeaderBoard();
  },[])
  useEffect(()=>{
 console.log(userName);
  },[userName])
  return (
    <div className="leaderboard-page">
      <h1 className="title">🏆 Leaderboard</h1>

      {/* Tabs */}
      <div className="tabs">
        {["overall", "leetCode", "codeChef", "codeForces"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="leaderboard-table">
        <div className="table-header">
          <span>Rank</span>
          <span>User</span>
          <span>Score</span>
        </div>

        {leaderBoardData[activeTab].map((user,index) => {
          const isMyUserName = user.userName === userName;

          return (
            <div
              key={index}
              className={`table-row ${isMyUserName ? "my-rank" : ""}`}
            >
              <span className="rank">#{user.rank}</span>

              <span className="name">
                {user.userName}
                {isMyUserName && <span className="me-badge">YOU</span>}
              </span>

              {activeTab==="overall" &&<span className="score">{user.score}</span>}
              {activeTab==="leetCode" &&<span className="score">{user.leetCodeSolved}</span>}
              {activeTab==="codeChef" &&<span className="score">{user.codeChefRating}</span>}
              {activeTab==="codeForces" &&<span className="score">{user.codeForcesRating}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Leaderboard;
