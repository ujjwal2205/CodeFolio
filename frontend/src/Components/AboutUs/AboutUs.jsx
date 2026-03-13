import React from 'react'
import { FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";
import './AboutUs.css'
function AboutUs() {
     const sections = [
    {
      icon: <FaLightbulb />,
      title: "Our Mission",
      description:
        "Empower coders globally to track their progress, compete, and grow in the world of DSA and competitive programming.",
    },
    {
      icon: <FaUsers />,
      title: "Our Vision",
      description:
        "To create a vibrant community where coders can learn, share knowledge, and showcase their skills effectively.",
    },
    {
      icon: <FaRocket />,
      title: "Our Goal",
      description:
        "Simplify coding growth tracking and leaderboard competitions across platforms, all in one place.",
    },
  ];
  return (
    <section className="aboutus">
      <div className="aboutus-container">
        <h2>About CodeFolio</h2>
        <p className="aboutus-subtitle">
          Learn more about our journey and how we aim to empower coders worldwide.
        </p>

        <div className="aboutus-cards">
          {sections.map((section, index) => (
            <div key={index} className="aboutus-card">
              <div className="aboutus-icon">{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  )
}

export default AboutUs
