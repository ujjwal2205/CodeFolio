import { useState,useEffect,useContext } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaEnvelope, FaLinkedin, FaXTwitter, FaTrophy, FaChevronDown } from "react-icons/fa6";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import './LeftSidebar.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
function LeftSidebar({ active, setActive,data }) {
  const [psDropdown, setPsDropdown] = useState(true);
  const {user,friends,requests,fetchFriendsAndRequests2,url,setFriendRequestSent}=useContext(StoreContext);
  const hasRequested=data.friendRequests?.some(
    req=>req.userName==user.userName
  )
  useEffect(() => {
     console.log(isFriend);
     console.log(hasRequested);
   }, [data.friendRequests]);
  const isFriend=friends?.some(f=>f.userName==data.userName);
  const anotherUserRequested=requests?.some(r=>r.userName==data.userName);
  
  const handleRequest=async()=>{
   try {
    const response=await axios.post(url+"/api/friends/sendFriendRequest",{
      receiverUserName:data.userName
    },{withCredentials:true});
    if(response.data.success){
      toast.success("Friend Request sent!");
      setFriendRequestSent(prev=>!prev);
    }
    else{
      console.log(response.data.message);
      toast.error(response.data.message);
    }
   } catch (error) {
    console.log(error);
    toast.error(error.message);
   }
  }
  return (
    <aside className="sidebar">
      <div className="profile-box">
      {user.userName==data.userName &&
        <div className="edit-profile-btn">
          <Link to="/edit"><FiEdit /></Link>
        </div>
      }
        <div className="avatar">{data.userName[0]?.toUpperCase()}</div>
        <h3>@{data.userName}</h3>
      </div>
      <div className="social-row">
        <FaEnvelope
          className={data.email!=="" ? "icon active" : "icon disabled"}
          onClick={() => {
            if (data.email!=="") {
              navigator.clipboard.writeText(`${data.email}`);
              toast.success("Email copied to clipboard.");
            }
          }}
          title={data.email!=="" && `${data.email}`}
        />
        <FaLinkedin
          className={data.linkedIn!="" ? "icon active" : "icon disabled"}
          onClick={() => {
            if (data.linkedIn!="") {
              window.open(`https://www.linkedin.com/in/${data.linkedIn}`, "_blank");
            }
          }}
          title={data.linkedIn!=="" && `https://www.linkedin.com/in/${data.linkedIn}`}
        />
        <FaXTwitter
          className={data.twitter!=="" ? "icon active" : "icon disabled"}
          onClick={() => {
            if (data.twitter!=="") {
              window.open(`https://x.com/${data.twitter}`, "_blank");
            }
          }}
          title={data.twitter!=="" && `https://x.com/${data.twitter}`}
        />
      </div>
       {( !anotherUserRequested && !hasRequested && !isFriend && user.userName !== data.userName) && (
       <button
       className="friend-btn"
       onClick={handleRequest}
       >
       Add Friend
      </button>
      )}
      {user.userName==data.userName && 
      <Link to={`/card/${user.userName}`} state={{data}}><button className="codefolio-btn">Get your Codefolio Card</button></Link>
      }
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
            {data.leetCode && (
              <MenuItemWithLink
                icon={<SiLeetcode />}
                label="LeetCode"
                active={active === "leetCode"}
                onClick={() => setActive("leetCode")}
                url={`https://www.leetcode.com/u/${data.leetCode.userName}`}
              />
            )}
            {data.codeChef && (
              <MenuItemWithLink
                icon={<SiCodechef />}
                label="CodeChef"
                active={active === "codeChef"}
                onClick={() => setActive("codeChef")}
                url={`https://www.codechef.com/users/${data.codeChef.userName}`}
              />
            )}
            {data.codeForces && (
              <MenuItemWithLink
                icon={<SiCodeforces />}
                label="CodeForces"
                active={active === "codeForces"}
                onClick={() => setActive("codeForces")}
                url={`https://codeforces.com/profile/${data.codeForces.userName}`}
              />
            )}
          </div>
        )}
      </div>

      <div className="leaderboard-box">
        <FaTrophy />
        <h2>{data.leaderboardRank}</h2>
        <p>Leaderboard Rank</p>
        <Link to={`/leaderboard`}><button className="view-btn">View Leaderboard</button></Link>
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
export default LeftSidebar;