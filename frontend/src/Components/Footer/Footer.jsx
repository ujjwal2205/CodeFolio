import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const loggedIn = isAuthenticated();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>CodeFolio</h2>
          <p>
            Track your coding journey, compete globally, and showcase your
            achievements in one place.
          </p>
          <div className="social-icons">
            <a href="https://github.com/ujjwal2205" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/ujjwal-gupta-52a466336/" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://x.com/__ujjwal1" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/about">About Us</Link>
          <Link to="/#why-codefolio">Why CodeFolio</Link>
          {loggedIn ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/signUp">Get Started</Link>
          )}
        </div>
        <div className="footer-cta">
          <h4>{loggedIn ? "Welcome Back!" : "Join CodeFolio"}</h4>
          <p>
            {loggedIn
              ? "Go to your dashboard to track progress and compete globally."
              : "Start tracking your coding journey and build your public profile today."}
          </p>
          {loggedIn ? (
            <Link to="/dashboard" className="cta-btn">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/signUp" className="cta-btn">
              Create Your CodeFolio
            </Link>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Made with <FaHeart className="heart" /> by CodeFolio
        </p>
        <span>© {new Date().getFullYear()} CodeFolio. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
