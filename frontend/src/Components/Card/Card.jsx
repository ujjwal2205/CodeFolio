import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import "./Card.css";

function Card() {
  const location = useLocation();
  const { data } = location.state || {};
  const cardRef = useRef();

  if (!data) return <div className="card-page">No data available</div>;

  const userNameCapital = data.userName
    ? data.userName.charAt(0).toUpperCase() + data.userName.slice(1)
    : "";

  const leetCode = data.leetCode?.solvedStats?.[0].count||0;
  const totalDSA = leetCode;

  
  const codeChef = data.codeChef?.problemsSolved || 0;
  const codeForces = data.codeForces?.problemsSolved || 0;
  const totalCP =  codeChef + codeForces;

  const totalQuestions = totalDSA + totalCP;

  const platforms = [];
  if (data.leetCode?.userName) platforms.push({ name: "LeetCode", icon: <SiLeetcode /> });
  if (data.codeChef?.userName) platforms.push({ name: "CodeChef", icon: <SiCodechef /> });
  if (data.codeForces?.userName) platforms.push({ name: "CodeForces", icon: <SiCodeforces /> });

  const achievements = [];
  if (data.codeChef?.stars) achievements.push(`⭐ ${data.codeChef.stars} Stars`);
  if (data.codeForces?.rank) achievements.push(`🏆  ${data.codeForces.rank}`);

  const handleDownload = async () => {
  if (!cardRef.current) return;
  const canvas = await html2canvas(cardRef.current, {
    scale: 2,
    backgroundColor: "#0f1219" 
  });
  const imgData = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = `${data.userName}_Codefolio.png`;
  link.click();
};


  return (
    <div className="card-page">
      <div className="card-container" ref={cardRef}>
        <div className="card-avatar-container">
          <div className="card-avatar">{userNameCapital.charAt(0)}</div>
        </div>

        <div className="card-userinfo">
          <h2 className="card-username">@{data?.userName}</h2>
          {(totalDSA>0 && totalCP==0) && <p className="card-tagline">DSA Explorer</p>}
          {(totalDSA==0 && totalCP>0) && <p className="card-tagline">Competitive Programming Explorer</p>}
          {(totalDSA>0 && totalCP>0) && <p className="card-tagline">DSA & CP Conquerer</p>}
        </div>

        <div className="card-total">
          <h4>Total Questions</h4>
          <p>{totalQuestions}</p>
        </div>

        <div className="card-questions">
          <div className="question-item">
            <h4>DSA</h4>
            <p>{totalDSA}</p>
          </div>
          <div className="question-item">
            <h4>CP</h4>
            <p>{totalCP}</p>
          </div>
        </div>

        {platforms.length>0 && 
        <div className="card-section">
          <h4>You can find me on ...</h4>
          <div className="platforms-list">
            {platforms.map((p) => (
              <div key={p.name} className="platform-item">
                <div className="platform-icon">{p.icon}</div>
                <span className="platform-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
        }
  
        {achievements.length>0 &&
        <div className="card-section">
          <h4>Achievements</h4>
          <div className="achievements-list">
            {achievements.map((a, idx) => (
              <span key={idx} className="achievement-item">{a}</span>
            ))}
          </div>
        </div>
        }
        <div className="card-footer">
          <span className="card-footer-code">Code</span>
          <span className="card-footer-folio">Folio</span>
        </div>
      </div>

      <button className="download-btn" onClick={handleDownload}>Download Your CodeFolio Card</button>
    </div>
  );
}

export default Card;
