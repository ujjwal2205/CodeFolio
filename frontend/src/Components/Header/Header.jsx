import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({login}) {
  useEffect(()=>{
  },[login]);
    const isAuthenticated=()=>{
        return login;
    }
  return (
    <section className="header">
      <div className="header-container">
        <div className="header-left">
          <span className="header-badge">Track • Compete • Grow</span>

          <h1>
            Your Coding Journey,
            <br />
            <span>Visible to the World</span>
          </h1>

          <p>
            CodeFolio helps you track DSA progress across platforms, compete on
            leaderboards, compare with friends and build a public developer
            identity.
          </p>

          <div className="header-cta">
            {!isAuthenticated()?<Link to="/signUp" className="cta-primary">
              Create Your CodeFolio
            </Link>:<Link to="/dashboard" className="cta-primary">
              My Coding Hub
            </Link>}
            
            {isAuthenticated()?
            <Link to="/leaderboard" className="cta-link">
              Explore Leaderboard →
            </Link>
            :<Link to="login" className="cta-link">
              Explore Leaderboard →
            </Link>
            }
          </div>
        </div>

        <div className="header-right">
          <div className="terminal">
            <div className="terminal-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>

            <div className="terminal-body">
              <p><span>$</span> user.rank</p>
              <p className="output">#142 Global</p>

              <p><span>$</span> problems.solved</p>
              <p className="output">457</p>

              <p><span>$</span> contests.joined</p>
              <p className="output">23</p>
            </div>
          </div>
          <div className="platforms">
            <div className="platform-card lc">
              <h4>LeetCode</h4>
              <p>312 Solved</p>
            </div>

            <div className="platform-card cf">
              <h4>Codeforces</h4>
              <p>Rating 1480</p>
            </div>

            <div className="platform-card cc">
              <h4>CodeChef</h4>
              <p>★★★★</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
