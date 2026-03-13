import React, { useContext, useState,useEffect } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import {useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {GoogleLogin} from '@react-oauth/google'
import "./Login.css";
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {
  const { url,checkAuth,fetchFriendsAndRequests,login,setLogin } = useContext(StoreContext);
  const navigate=useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleForgotPassword=(e)=>{
    if(!data.email){
      toast.error("Enter your email first");
      return;
    }
    navigate("/forgot-password",{state:{email:data.email}});
  }
  useEffect(() => {
  if(login){
    checkAuth();
   
  }
}, [login]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post(url+"/api/user/login",data, { withCredentials: true });
      if(response.data.success){
        setLogin(true);
        navigate('/',{state:{toastMessage:"Login Successful!"}})
      }
      else{
        setLogin(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleSuccess=async(CredentialResponse)=>{
    const token=CredentialResponse.credential;
    try {
      const response=await axios.post(url+"/api/user/googleLogin",{
        idToken:token
      },{ withCredentials: true })
      if(response.data.success){
        setLogin(true);
      navigate('/',{state:{toastMessage:"Login Successful!"}})
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      navigate('/signUp');
    }
  }
  const handleError = () => {
        alert("Google Sign In was unsuccessful. Try again later.");
      };
  return (
    <div className="cf-login-page">
      <div className="cf-login-card">
        <h1 className="cf-login-logo">
          Code<span>Folio</span>
        </h1>
        <p className="cf-login-subtitle">Build.Showcase.Get Hired.</p>

        <form onSubmit={handleSubmit} className="cf-login-form">
          <div className="cf-input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="cf-input-group">
            <label>Password</label>
            <input
              type={showPassword?"text":"password"}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
            <span onClick={()=>setShowPassword(prev=>!prev)}>{showPassword?<FaEyeSlash/>:<FaEye/>}</span>
          </div>
          <div className="forgot-password-box">
          <button type="button" className="forgot-password" onClick={handleForgotPassword}>Forgot your password?</button>
        </div>
          <button type="submit" className="cf-login-btn">
            Login
          </button>
        </form>
        <p className="or-text">OR</p>
        <div className="google-login">
          <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          />
        </div>
        <p className="cf-login-footer-text">
          Don't have an account? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
