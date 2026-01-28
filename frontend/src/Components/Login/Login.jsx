import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import {useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {GoogleLogin} from '@react-oauth/google'
import "./Login.css";
import {toast} from 'react-toastify';
import { Link } from "react-router-dom";
function Login() {
  const { url } = useContext(StoreContext);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
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
