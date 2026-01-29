import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp({login,setLogin}) {
  const { url } = useContext(StoreContext);
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    userName: "",
    firstName: "",
    middleName:"",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    leetCode: "",
    codeChef: "",
    codeForces: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const response=await axios.post(url+"/api/user/signUp",data,{ withCredentials: true });
    if(response.data.success){
    setLogin(true);
    navigate('/',{state:{toastMessage:"Login Successful!"}})
    }
    else{
      setLogin(false);
      toast.error(response.data.message);
    }
  }
  catch(error){
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
    <div className="cf-signup-page">
      <div className="cf-signup-card">
        <h1 className="cf-signup-logo">
          Code<span>Folio</span>
        </h1>
        <p className="cf-signup-subtitle">Create your developer identity</p>

        <form className="cf-signup-form" onSubmit={handleSubmit}>
          <div className="cf-row">
            <input name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input name="middleName" placeholder="MiddleName" onChange={handleChange}/>
            <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          </div>

          <input name="userName" placeholder="Enter your Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

          <div className="cf-password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="cf-password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <h4 className="cf-section-title">Coding Profiles (optional)</h4>

          <input name="leetCode" placeholder="LeetCode Username" onChange={handleChange} />
          <input name="codeChef" placeholder="CodeChef Username" onChange={handleChange} />
          <input name="codeForces" placeholder="CodeForces Username" onChange={handleChange} />

          <button className="cf-signup-btn" type="submit">
            Create Account
          </button>
        </form>

        <p className="or-text">OR</p>

        <div className="google-login">
          <GoogleLogin 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>

        <p className="cf-signup-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
