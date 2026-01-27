import React from 'react'
import { FaUserPlus, FaLaptopCode, FaTrophy, FaShareAlt } from "react-icons/fa";
import './HowItWorks.css'
function HowItWorks() {
    const steps = [
    {
      icon: <FaUserPlus />,
      title: "Sign Up & Connect Accounts",
      description: "Create your CodeFolio account and link your LeetCode, Codeforces, and CodeChef profiles.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Solve Problems",
      description: "Track your DSA journey, see your progress, and solve problems across multiple platforms.",
    },
    {
      icon: <FaTrophy />,
      title: "Climb the Leaderboard",
      description: "Compare your rank with friends and other coders globally on the leaderboard.",
    },
    {
      icon: <FaShareAlt />,
      title: "Showcase Your Profile",
      description: "Build a public developer profile that highlights your skills and achievements.",
    },
  ];
  return (
    <section className="how-it-works">
      <div className="hiw-container">
        <h2 className="hiw-title">How CodeFolio Works</h2>
        <p className="hiw-subtitle">
          Follow these simple steps to get started and track your coding journey.
        </p>

        <div className="hiw-steps">
          {steps.map((step, index) => (
            <div key={index} className="hiw-card">
              <div className="hiw-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
