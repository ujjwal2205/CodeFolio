import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const { url } = useContext(StoreContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    userName: "",
    firstName: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
          <GoogleLogin />
        </div>

        <p className="cf-signup-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
