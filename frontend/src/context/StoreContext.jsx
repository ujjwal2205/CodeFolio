import React,{createContext,useState,useEffect} from 'react'
import axios from "axios";
import{io} from "socket.io-client";
import { useMemo } from 'react';
import {toast} from 'react-toastify'
export const StoreContext=createContext();
function StoreProvider(props) {
  
  const url="http://localhost:4000";
  const dummyMessages = {
  c1: [
    { senderId: "u2", text: "Bro kal milte hain?", timestamp: "2026-02-14T10:30:00" },
    { senderId: "u1", text: "Haan bhai 7 baje", timestamp: "2026-02-14T10:32:00" }
  ],
  c2: [
    { senderId: "u3", text: "Project ho gaya?", timestamp: "2026-02-13T16:10:00" },
    { senderId: "u1", text: "Almost done", timestamp: "2026-02-13T16:12:00" }
  ]
};
  const [user,setUser]=useState(null);
  const [friends,setFriends]=useState([]);
  const [requests,setRequests]=useState([]);
  const [friendRequestSent,setFriendRequestSent]=useState(false);
  const [login,setLogin]=useState(false);
  const [onlineUsers,setOnlineUsers]=useState([]);
  const [openChats,setOpenChats]=useState([]);
  const [messages,setMessages]=useState(dummyMessages);
  const [conversations,setConversations]=useState([]);
  const openChat=(conversation)=>{
    const exists=openChats.find(c=>c._id===conversation._id);
    if(exists){
      return;
    }
    let updatedChats=[...openChats,conversation];
    if(updatedChats.length>3){
      updatedChats=updatedChats.slice(1);
    }
    setOpenChats(updatedChats);
    console.log(updatedChats);
  }
  const closeChat=(conversation)=>{
    setOpenChats(prev=>prev.filter(c=>c._id!==conversation._id));
  }
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
    const [r1,r2,r3]=await Promise.all([
      axios.post(url+"/api/friends/getFriends",{},{withCredentials:true}),
      axios.post(url+`/api/friends/getFriendRequests/${user?.userName}`,{},{withCredentials:true}),
      axios.post(url+"/api/chat/getConversations",{},{withCredentials:true})
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
    if(r3.data.success){
      setConversations(r3.data.data);
    }
    else{
      console.log(r3.data.message);
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
    url,user,checkAuth,friends,requests,setFriends,setRequests,fetchFriendsAndRequests2,friendRequestSent,setFriendRequestSent,login,setLogin,onlineUsers,socket,openChat,closeChat,openChats,messages,setMessages,conversations
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
