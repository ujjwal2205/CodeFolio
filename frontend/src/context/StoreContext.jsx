import React,{createContext,useState,useEffect} from 'react'
import axios from "axios";
export const StoreContext=createContext();
function StoreProvider(props) {
  const url="http://localhost:4000";
  const [user,setUser]=useState([]);
 const checkAuth=async()=>{
  try {
    const response=await axios.post(url+"/api/user/me",{},{withCredentials:true});
    if(response.data.success){
      setUser({
        userName:response.data.userName,
        email:response.data.email
      })
      console.log("u");
    }
  } catch (error) {
    console.log("i");
    console.log(error);
  }
 }
 useEffect(()=>{
  checkAuth();
 },[]);
  const contextValue={
    url,user,checkAuth
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
