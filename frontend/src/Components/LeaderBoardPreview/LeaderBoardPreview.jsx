import React,{useEffect,useContext,useState} from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import { FaLock, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LeaderBoardPreview.css";
import axios from "axios";
import { toast } from "react-toastify";

function LeaderBoardPreview({ login }) {
  const { url, user } = useContext(StoreContext);

  const leaders = [
    { rank: 1, name: "coder_***", score: "9120" },
    { rank: 2, name: "dev_***", score: "8840" },
    { rank: 3, name: "algo_***", score: "8605" },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    if (login && user?.userName) {
      const fetchLeaderBoard = async () => {
        try {
          const response = await axios.post(
            `${url}/api/Leaderboard/fetchLeaderBoard/${user.userName}`,
            {},
            { withCredentials: true }
          );

          if (response.data.success) {
            setData(response.data.data);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchLeaderBoard();
    }
  }, [user, login]);

  return (
    <section className="lb-showcase">
      <div className="lb-container">
        <h2>Top Coders</h2>
        <p className="lb-subtitle">
          See who’s dominating competitive coding right now
        </p>

        <div className="lb-cards">
          {(login ? data : leaders).slice(0, 3).map((u, index) => (
            <div
              key={index}
              className={`lb-card lb-rank-${index + 1}`}
            >
              {!login && (
                <div className="lb-overlay">
                  <FaLock />
                </div>
              )}

              <div className="lb-rank">#{index + 1}</div>
              <FaTrophy className="lb-trophy" />

              <h3 className={!login ? "lb-locked" : ""}>
                {login ? u.userName : u.name}
              </h3>

              <span className={`lb-score ${!login ? "lb-locked" : ""}`}>
                {u.score} pts
              </span>
            </div>
          ))}
        </div>

        {login ? (
          <div className="lb-footer">
            <Link to="/leaderboard" className="lb-btn">
              Explore Full Leaderboard
            </Link>
          </div>
        ) : (
          <div className="lb-footer">
            <FaLock />
            <p>Sign in to view full leaderboard & compete globally</p>
            <Link to="/login" className="lb-btn">
              Unlock Leaderboard
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default LeaderBoardPreview;
