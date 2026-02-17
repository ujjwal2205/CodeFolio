  import { useState,useEffect,useContext } from "react";
  import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
  import RightSidebar from "../RightSidebar/RightSidebar.jsx";
  import { StoreContext } from "../../context/StoreContext.jsx";
  import { useParams } from "react-router-dom";
  import { toast } from "react-toastify";
  import "./Dashboard.css";
  import axios from "axios";
 function Dashboard() {
    const {userName}=useParams();
    const [active, setActive] = useState("overview");
    const {url,user,friendRequestSent,setFriendRequestSent}=useContext(StoreContext);
    const [data,setData]=useState({
      "id":"",
      "userName":"",
      "email":"",
      "linkedIn":"",
      "twitter":"",
      "leetCode":null,
      "codeChef":null,
      "codeForces":null,
      "leaderboardRank":null,
      "friendRequests":null
    });
    useEffect(()=>{
      const fetchData=async()=>{
        try {
          const friendRequests=await axios.post(url+`/api/friends/getFriendRequests/${userName}`,{},{withCredentials:true});
          if(friendRequests.data.success){
            setData(prev=>({...prev,friendRequests:friendRequests.data.requests}));
          }
          else{
            toast.error(friendRequests.data.message);
            console.log(friendRequests.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
      fetchData();
    },[friendRequestSent]);
    useEffect(()=>{
      const fetchData=async()=>{
        try {
          const lcRes=await axios.post(url+`/api/site/leetcode/${userName}`,{},{withCredentials:true});
          const ccRes=await axios.post(url+`/api/site/codeChef/${userName}`,{},{withCredentials:true});
          const cfRes=await axios.post(url+`/api/site/codeForces/${userName}`,{},{withCredentials:true});
          const leaderBoard=await axios.post(url+`/api/Leaderboard/fetchLeaderBoard/${userName}`,{},{withCredentials:true});
          const friendRequests=await axios.post(url+`/api/friends/getFriendRequests/${userName}`,{},{withCredentials:true});
          if(lcRes.data.success){
            const user=lcRes.data.data.data.matchedUser;
            setData(prev=>({...prev,leetCode:{
              userName:user.username,
              solvedStats:user.submitStats.acSubmissionNum,
              contest:lcRes.data.contest
            },
          id:lcRes.data.id,
          email:lcRes.data.email,
          linkedIn:lcRes.data.linkedIn,
          twitter:lcRes.data.twitter,
          userName:lcRes.data.userName}));
          }
          else{
            if(lcRes.data.message==="LeetCode handle not provided"){
              console.log(lcRes.data.message);
            }
            else if(lcRes.data.message==="Invalid LeetCode Username"){
              console.log(lcRes.data.message);
              if(user.userName==userName){
              toast.error(lcRes.data.message);
              }
            }
            else{
            console.log(lcRes.data.message);
            if(user.userName==userName){
            toast.error("We couldn’t fetch your LeetCode data right now. Please try again shortly.");
            }
          }
          setData(prev => {
          if (prev.email !== "") return prev;
          return {
          ...prev,
          id:lcRes.data.id,
          email: lcRes.data.email,
          linkedIn: lcRes.data.linkedIn,
          twitter: lcRes.data.twitter,
          userName: lcRes.data.userName
          };
         });
        }
          if(ccRes.data.success){
            const user=ccRes.data;
            setData(prev=>({...prev,codeChef:{
              userName:ccRes.data.userName,
              rating:user.rating,
              highestRating:user.highestRating,
              stars:user.stars,
              contestParticipated:user.contestParticipated,
              problemsSolved:user.problemsSolved
            },
            id:ccRes.data.id,
            email:ccRes.data.email,
            linkedIn:ccRes.data.linkedIn,
            twitter:ccRes.data.twitter,
             userName:ccRes.data.userName
          }))
          }
          else{
            if(ccRes.data.message==="CodeChef handle not provided."){
              console.log(ccRes.data.message);
            }
            else{
            console.log(ccRes.data.message);
            if(user.userName==userName){
            toast.error(ccRes.data.message);
            }
            }
            setData(prev => {
          if (prev.email !== "") return prev;
          return {
          ...prev,
          id:ccRes.data.id,
          email: ccRes.data.email,
          linkedIn: ccRes.data.linkedIn,
          twitter: ccRes.data.twitter,
          userName: ccRes.data.userName
          };
         });
          }
          if(cfRes.data.success){
            const user=cfRes.data;
            setData(prev=>({...prev,codeForces:{
              rating:user.data.rating,
              rank:user.data.rank,
              userName:user.data.handle,
              maxRating:user.data.maxRating,
              maxRank:user.data.maxRank,
              problemsSolved:user.totalSolved,
              contest:user.contest,
            },
            id:cfRes.data.id,
            email:cfRes.data.email,
            linkedIn:cfRes.data.linkedIn,
            twitter:cfRes.data.twitter,
            userName:cfRes.data.userName
          }))
          }
          else{
            if(cfRes.data.message==="CodeForces handle not provided"){
            console.log(cfRes.data.message);
            }
            else{
            console.log(cfRes.data.message);
            if(user.userName==userName){
            toast.error(cfRes.data.message);
            }
            }
            setData(prev => {
          if (prev.email !== "") return prev;
          return {
          ...prev,
          id:cfRes.data.id,
          email: cfRes.data.email,
          linkedIn: cfRes.data.linkedIn,
          twitter: cfRes.data.twitter,
          userName: cfRes.data.userName
          };
         });
          }
          if(leaderBoard.data.success){
            setData(prev=>({...prev,leaderboardRank:leaderBoard.data.myRank}));
          }
          else{
            toast.error(leaderBoard.data.message);
            console.log(leaderBoard.data.message);
          }
          if(friendRequests.data.success){
            setData(prev=>({...prev,friendRequests:friendRequests.data.requests}));
          }
          else{
            toast.error(friendRequests.data.message);
            console.log(friendRequests.data.message);
          }
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      }
      fetchData();
      console.log(data);
    },[userName]);
    return (
      <div className="dashboard-root">
        <LeftSidebar active={active} setActive={setActive} data={data}/>
        <RightSidebar active={active} data={data}/>
      </div>
    );
  }
export default Dashboard;