import React,{createContext,useState,useEffect} from 'react'
import axios from "axios";
import{io} from "socket.io-client";
import { useMemo } from 'react';
import {toast} from 'react-toastify'
export const StoreContext=createContext();
function StoreProvider(props) {
  const url="http://localhost:4000";
  const [user,setUser]=useState(null);
  const [friends,setFriends]=useState([]);
  const [requests,setRequests]=useState([]);
  const [friendRequestSent,setFriendRequestSent]=useState(false);
  const [login,setLogin]=useState(false);
  const [onlineUsers,setOnlineUsers]=useState([]);
 const checkAuth=async()=>{
  try {
    const response=await axios.post(url+"/api/user/me",{},{withCredentials:true});
    console.log("auth response:", response.data);
    if(response.data.success){
      setUser({
        userId:response.data.userId,
        userName:response.data.userName,
        email:response.data.email
      })
      setLogin(true);
    }
    else{
      setLogin(false);
    }
  } catch (error) {
    console.log(error);
  }
 }
 const fetchFriendsAndRequests2=async()=>{
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
 useEffect(()=>{
const fetchFriendsAndRequests=async()=>{
  if(!user?.userName){
    return;
  }
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
 const socket=useMemo(()=>io(url,{withCredentials:true}),[]);
 useEffect(()=>{
   checkAuth();
   socket.on("connect",()=>{
      console.log("connected",socket.id);
    })
    return ()=>socket.disconnect();
 },[]);
 useEffect(()=>{
  if(user?.userId){
    console.log(user?.userId);
    socket.emit("register",user.userId);
  }
 },[user,socket]);
useEffect(()=>{
if(!socket){
  return;
}
const handler=(newRequest)=>{
  setRequests(prev=> [newRequest,...prev]);
  console.log(requests);
  toast.info(`${newRequest.userName} sent you a friend Request!`);
}
const handler2=(users)=>{
  setOnlineUsers(users);
}
const handler3=(friend)=>{
 setFriends(prev=>[...prev,friend]);
}
const handler4=(remove)=>{
  setFriends(prev=>prev.filter(f=>f.userName!==remove.userName));
}
socket.on("friendRequestReceived",handler);
socket.on("onlineUsers",handler2);
socket.on("friendRequestAccepted",handler3);
socket.on("friendRemoved",handler4);
return ()=>{
socket.off("friendRequestReceived",handler);
socket.off("onlineUsers",handler2);
socket.off("friendRequestAccepted",handler3);
socket.off("friendRemoved",handler4);
}
},[socket]);

  const contextValue={
    url,user,checkAuth,friends,requests,setFriends,setRequests,fetchFriendsAndRequests2,friendRequestSent,setFriendRequestSent,login,setLogin,onlineUsers,socket
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
