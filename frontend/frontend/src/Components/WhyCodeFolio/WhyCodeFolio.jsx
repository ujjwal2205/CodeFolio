import React from 'react'
import {SiLeetcode,SiCodeforces,SiCodechef} from "react-icons/si";
import {FaChartLine, FaUsers } from "react-icons/fa";
import './WhyCodeFolio.css'
function WhyCodeFolio() {
  return (
     <section className="why-codefolio" id="why-codefolio">
      <div className="why-container">
        <h2 className="why-title">Why CodeFolio?</h2>
        <p className="why-subtitle">
          Everything you need to track, compare, and showcase your coding journey — in one place.
        </p>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icons">
              <SiLeetcode />
              <SiCodeforces />
              <SiCodechef />
            </div>
            <h3>All Platforms. One Profile.</h3>
            <p>
             No more platform hopping , all your LeetCode, Codeforces, and CodeChef stats live in one place.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-single">
              <FaChartLine />
            </div>
            <h3>Unified Progress Tracking</h3>
            <p>
              See problems solved, ratings, and consistency combined into a
              single powerful developer profile.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon-single">
              <FaUsers />
            </div>
            <h3>Competitive Leaderboard</h3>
            <p>
              Compare yourself with friends and top coders worldwide.
              Rankings update daily based on real performance.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyCodeFolio
