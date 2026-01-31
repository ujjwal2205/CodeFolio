import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaEnvelope, FaLinkedin, FaXTwitter, FaTrophy, FaChevronDown } from "react-icons/fa6";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import './LeftSidebar.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function LeftSidebar({ active, setActive }) {
  const [psDropdown, setPsDropdown] = useState(true);

  const user = {
    name: "Ujjwal Gupta",
    username: "ujjwal22",
    email: true,
    linkedin: true,
    twitter: false,
    leetcode: true,
    codechef: true,
    codeforces: true,
    leaderboardRank: 2300,
    handle: "ujjwal2202"
  };

  return (
    <aside className="sidebar">
      <div className="profile-box">
        <div className="edit-profile-btn">
          <Link to="/edit"><FiEdit /></Link>
        </div>
        <div className="avatar">U</div>
        <h3>{user.name}</h3>
        <p>@{user.username}</p>
      </div>

      <div className="social-row">
        <FaEnvelope
          className={user.email ? "icon active" : "icon disabled"}
          onClick={() => {
            if (user.email) {
              navigator.clipboard.writeText("ujjwal22@gmail.com");
              toast.success("Email copied to clipboard.");
            }
          }}
          title={user.email && "ujjwal22@gmail.com"}
        />
        <FaLinkedin
          className={user.linkedin ? "icon active" : "icon disabled"}
          onClick={() => {
            if (user.linkedin) {
              window.open(`https://www.linkedin.com/in/${user.handle}`, "_blank");
            }
          }}
          title={user.linkedin && `https://www.linkedin.com/in/${user.handle}`}
        />
        <FaXTwitter
          className={user.twitter ? "icon active" : "icon disabled"}
          onClick={() => {
            if (user.twitter) {
              window.open(`https://x.com/${user.handle}`, "_blank");
            }
          }}
          title={user.twitter && `https://x.com/${user.handle}`}
        />
      </div>

      <button className="codefolio-btn">Get your Codefolio Card</button>

      <div className="menu">
        <div className={`menu-item ${active === "overview" ? "active" : ""}`}>
          <span
            style={{ flex: 1, cursor: "pointer" }}
            onClick={() => setActive("overview")}
          >
            Problem Solving Stats
          </span>
          <button
            className="dropdown-btn"
            onClick={() => setPsDropdown(!psDropdown)}
          >
            <FaChevronDown
              style={{
                transform: psDropdown ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              }}
            />
          </button>
        </div>
        {psDropdown && (
          <div className="submenu">
            {user.leetcode && (
              <MenuItemWithLink
                icon={<SiLeetcode />}
                label="LeetCode"
                active={active === "leetCode"}
                onClick={() => setActive("leetCode")}
                url={`https://www.leetcode.com/u/${user.handle}`}
              />
            )}
            {user.codechef && (
              <MenuItemWithLink
                icon={<SiCodechef />}
                label="CodeChef"
                active={active === "codeChef"}
                onClick={() => setActive("codeChef")}
                url={`https://www.codechef.com/users/${user.handle}`}
              />
            )}
            {user.codeforces && (
              <MenuItemWithLink
                icon={<SiCodeforces />}
                label="CodeForces"
                active={active === "codeForces"}
                onClick={() => setActive("codeForces")}
                url={`https://codeforces.com/profile/${user.handle}`}
              />
            )}
          </div>
        )}
      </div>

      <div className="leaderboard-box">
        <FaTrophy />
        <h2>{user.leaderboardRank}</h2>
        <p>Leaderboard Rank</p>
        <button className="view-btn">View Leaderboard</button>
      </div>
    </aside>
  );
}

function MenuItemWithLink({ icon, label, active, onClick, url }) {
  return (
    <div
      className={`menu-item ${active ? "active" : ""}`}
      onClick={onClick}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icon && <span className="menu-icon">{icon}</span>}
        {label}
      </div>
      <a href={url} target="_blank" className="submenu-link">
        <FaArrowUpRightFromSquare />
      </a>
    </div>
  );
}
