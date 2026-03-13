import React, { useState,useEffect,useContext} from "react";
import "./Leaderboard.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Leaderboard() {
  const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState("overall");
  const {url,user}=useContext(StoreContext);
  const [userName,setUserName]=useState("");
  const [currentPage,setCurrentPage]=useState(1);
  const usersPerPage=10;
  useEffect(()=>{
    setCurrentPage(1);
  },[activeTab]);
  const [leaderBoardData,setLeaderBoardData]=useState({
    overall:[],
    leetCode:[],
    codeChef:[],
    codeForces:[]
  })
 
  useEffect(()=>{
    if (!user?.userName) return;
    const fetchLeaderBoard=async()=>{
        try {
            const [leaderboard,leetCode,codeChef,codeForces]=await Promise.all([
                axios.post(url+`/api/Leaderboard/fetchLeaderboard/${user.userName}`,{},{withCredentials:true}),
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
  const totalUsers=leaderBoardData[activeTab].length;
  const totalPages=Math.ceil(totalUsers/usersPerPage);
  const startIndex=(currentPage-1)*usersPerPage;
  const endIndex=startIndex+usersPerPage;
  const currentUsers=leaderBoardData[activeTab]?.slice(startIndex,endIndex);
  return (
    <div className="leaderboard-page">
      <h1 className="title">🏆 Leaderboard</h1>
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
      <div className="leaderboard-table">
        <div className="table-header">
          <span>Rank</span>
          <span>User</span>
          <span>Score</span>
        </div>

        {currentUsers.map((user,index) => {
          const isMyUserName = user.userName === userName;

          return (
            <div
              key={index}
              onClick={()=>navigate(`/dashboard/${user.userName}`)}
              style={{cursor:"pointer"}}
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
      <div className="pagination">
  <button
    className="page-btn"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(prev => prev - 1)}
  >
    ← Prev
  </button>

  <div className="page-info">
    <span className="current-page">{currentPage}</span>
    <span className="divider">/</span>
    <span>{totalPages}</span>
  </div>

  <button
    className="page-btn"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => prev + 1)}
  >
    Next →
  </button>
</div>
    </div>
  );
}

export default Leaderboard;
