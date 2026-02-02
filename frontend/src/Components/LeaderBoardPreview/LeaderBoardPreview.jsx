import React,{useEffect,useContext,useState} from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import { FaLock, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LeaderBoardPreview.css";
import axios from "axios";
import { toast } from "react-toastify";
function LeaderBoardPreview({login}) {
  const {url}=useContext(StoreContext);
  const leaders = [
    { rank: 1, name: "coder_***", score: "9120 pts" },
    { rank: 2, name: "dev_***", score: "8840 pts" },
    { rank: 3, name: "algo_***", score: "8605 pts" },
  ];
  const[data,setData]=useState([]); 
  useEffect(()=>{
  if(login){
  const fetchLeaderBoard=async()=>{
        try {
          const response=await axios.post(url+"/api/Leaderboard/fetchLeaderBoard",{},{withCredentials:true});
          if(response.data.success){
            setData(response.data.data);
          }
          else{
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }
      fetchLeaderBoard();
    }
  },[login]);
  const loggedIn = login;

  return (
    <section className="leaderboard-showcase">
      <div className="ls-container">
        <h2>Top Coders</h2>
        <p className="ls-subtitle">
          See who’s dominating competitive coding right now
        </p>
        {login?(
        <div className="leader-cards">
          {data.slice(0,3).map((user,index) => (
            <div
              key={index+1}
              className={`leader-card rank-${index+1}`}
            >
              {!loggedIn && (
                <div className="card-overlay">
                  <FaLock />
                </div>
              )}

              <div className="rank">#{index+1}</div>
              <FaTrophy className="trophy" />
              <h3 className={!loggedIn ? "locked" : ""}>
                {user.userName}
              </h3>
              <span className={`score ${!loggedIn ? "locked" : ""}`}>
                {user.score} pts
              </span>
            </div>
          ))}
        </div>
        ):(
           <div className="leader-cards">
          {leaders.slice(0,3).map((user,index) => (
            <div
              key={index+1}
              className={`leader-card rank-${index+1}`}
            >
              {!loggedIn && (
                <div className="card-overlay">
                  <FaLock />
                </div>
              )}

              <div className="rank">#{index+1}</div>
              <FaTrophy className="trophy" />
              <h3 className={!loggedIn ? "locked" : ""}>
                {user.name}
              </h3>
              <span className={`score ${!loggedIn ? "locked" : ""}`}>
                {user.score} pts
              </span>
            </div>
          ))}
        </div>
        )

        }
        {loggedIn ? (
          <div className="ls-lock">
            <Link to="/leaderboard" className="ls-btn">
              Explore Full Leaderboard
            </Link>
          </div>
        ) : (
          <div className="ls-lock">
            <FaLock />
            <p>Sign in to view full leaderboard & compete globally</p>
            <Link to="/login" className="ls-btn">
              Unlock Leaderboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default LeaderBoardPreview;
