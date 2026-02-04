import React,{createContext,useState,useEffect} from 'react'
import axios from "axios";
export const StoreContext=createContext();
function StoreProvider(props) {
  const url="http://localhost:4000";
  const [user,setUser]=useState([]);
  const [friends,setFriends]=useState(null);
  const [requests,setRequests]=useState(null);
 const checkAuth=async()=>{
  try {
    const response=await axios.post(url+"/api/user/me",{},{withCredentials:true});
    if(response.data.success){
      setUser({
        userName:response.data.userName,
        email:response.data.email
      })
    }
  } catch (error) {
    console.log(error);
  }
 }
 useEffect(()=>{
const fetchFriendsAndRequests=async()=>{
  try {
    const [r1,r2]=await Promise.all([
      axios.post(url+"/api/friends/getFriends",{},{withCredentials:true}),
      axios.post(url+`/api/friends/getFriendRequests/${user?.userName}`,{},{withCredentials:true})
    ]); 
    if(r1.data.success){
      setFriends(r1.data.friends);
    }
    else{
      console.log(r1.data.message);
    }
    if(r2.data.success){
      setRequests(r2.data.requests);
    }
    else{
      console.log(r2.data.message);
    }
  } catch (error) {
    console.log(error);
  }
 }
 fetchFriendsAndRequests();
 },[user])
 
 useEffect(()=>{
  checkAuth();
 },[]);

  const contextValue={
    url,user,checkAuth,friends,requests
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
