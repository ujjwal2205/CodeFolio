import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';
import './ForgotPassword.css';

function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  const { email } = location.state || {};

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      toast.error("Please fill in both fields");
      return;
    }
    toast.success("Password reset successful!");
    navigate("/login");
  };

  return (
    <div className="cf-forgot-page">
      <div className="cf-forgot-card">
        <h1 className="cf-forgot-title">Reset Password</h1>
        {email && <p className="cf-forgot-subtitle">Resetting password for: <strong>{email}</strong></p>}

        <form onSubmit={handleSubmit} className="cf-forgot-form">
          <div className="cf-input-group">
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div className="cf-input-group">
            <label>New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="cf-forgot-btn">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
