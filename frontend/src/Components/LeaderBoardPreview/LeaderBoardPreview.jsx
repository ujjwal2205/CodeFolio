import React,{useEffect} from "react";
import { FaLock, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LeaderBoardPreview.css";

function LeaderBoardPreview({login}) {
  const leaders = [
    { rank: 1, name: "coder_***", score: "9120 pts" },
    { rank: 2, name: "dev_***", score: "8840 pts" },
    { rank: 3, name: "algo_***", score: "8605 pts" },
  ];
  useEffect(()=>{
  },[login]);
  const isAuthenticated = () => {
    return login;
  };

  const loggedIn = isAuthenticated();

  return (
    <section className="leaderboard-showcase">
      <div className="ls-container">
        <h2>Top Coders</h2>
        <p className="ls-subtitle">
          See who’s dominating competitive coding right now
        </p>

        <div className="leader-cards">
          {leaders.map((user) => (
            <div
              key={user.rank}
              className={`leader-card rank-${user.rank}`}
            >
              {!loggedIn && (
                <div className="card-overlay">
                  <FaLock />
                </div>
              )}

              <div className="rank">#{user.rank}</div>
              <FaTrophy className="trophy" />
              <h3 className={!loggedIn ? "locked" : ""}>
                {user.name}
              </h3>
              <span className={`score ${!loggedIn ? "locked" : ""}`}>
                {user.score}
              </span>
            </div>
          ))}
        </div>

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
            <Link to="/signUp" className="ls-btn">
              Unlock Leaderboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default LeaderBoardPreview;
