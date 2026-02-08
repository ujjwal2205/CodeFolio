import React,{useState,useEffect,useRef,useContext} from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';
import { Link } from 'react-router-dom';
import {FaUserCircle} from "react-icons/fa"
import './Navbar.css';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
function Navbar() {
    const {url,user,requests,login,setLogin,socket}=useContext(StoreContext);
    const location=useLocation();
    const navigate=useNavigate();
    const [dropdown,setDropdown]=useState(false);
    const dropdownRef=useRef(null);
    const [value,setValue]=useState("");
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(!dropdownRef.current?.contains(event.target)){
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown",handleClickOutside);
    },[]);
    
    const toggleDropdown=()=>setDropdown((prev)=>!prev);
    const handleLogout=async(e)=>{
        try {
            const response=await axios.post(url+"/api/user/logOut",{},{ withCredentials: true });
            if(response.data.success){
                socket.emit("unregister");
                setLogin(false);
                toast.success(response.data.message);
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const handleChange=(e)=>{
    setValue(e.target.value);
    }
    const handleSubmit=async(e)=>{
        if(e.key=="Enter"){
            console.log(value);
            if(value.trim()===""){
                toast.error("Please enter a username");
                return;
            }
            try {
                const response=await axios.get(url+`/api/user/userExists/${value}`,{withCredentials:true});
                if(response.data.success){
                    if(response.data.exists){
                        navigate(`/dashboard/${value}`);
                    }
                    else{
                        toast.error("User does not exist.");
                    }
                }
            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
            setValue("");
        }
    }
  return (
    <div className='Navbar'>
     <div className='navbar-container'>
        <Link to="/" className='logo'>
  <span className="code-text">Code</span>
  <span className="folio-text">Folio</span>
</Link>
        <div className='nav-links'>
            <Link to="/"><h2>Home</h2></Link>
            <Link to="/about"><h2>About Us</h2></Link>
            <Link to="/#why-codefolio"><h2>Why CodeFolio</h2></Link>
            {login?<Link to="/leaderboard"><h2>Leaderboard</h2></Link>:<Link to="/login"><h2>Leaderboard</h2></Link>}
            
        </div>
        <div className='right-container'>
        {!login?(
            <>
            <Link to="/login" className='login-btn'>Login</Link>
            <Link to="/signUp" className='sign-up'>Get Started</Link>
            </>
        ):(
           <div className="user-actions">
          <input
          className="user-Search"
          type="text"
          placeholder="Search users"
          value={value}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          />
          <div className='user-menu' ref={dropdownRef}>
           <div className='user-icon' onClick={toggleDropdown}>
           <FaUserCircle/>
           </div>
           <div className={`user-dropdown ${dropdown?"show":""}`}>
           <Link to={`/dashboard/${user?.userName}`} className='friends-page-btn' onClick={toggleDropdown}>Dashboard</Link>
           <Link to="/friends" className='friends-page-btn' onClick={toggleDropdown}>Friends
           {requests?.length>0 && <span className='red-dot'></span>}
           </Link>
           <Link to="/edit" className='edit-btn' onClick={()=>toggleDropdown()}>Edit Profile</Link>
           <Link to="/" className='logout-btn' onClick={handleLogout}>Logout</Link>
           </div>
          </div>
          </div>
        )
        }
        </div>
     </div>
    </div>
  )
}

export default Navbar
