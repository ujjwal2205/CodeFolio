import React, { useState } from "react";
import "./RightSidebar.css";
import {
  AreaChart, Area, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis
} from "recharts";
import { SiLeetcode,SiCodeforces,SiCodechef } from "react-icons/si";
function RightSidebar({ active,data }) {
  const [ratingPlatform, setRatingPlatform] = useState("leetCode");

  const dsaData = [
    { name: "Easy", value: data.leetCode?.solvedStats[1].count||0, color: "#22c55e" },
    { name: "Medium", value: data.leetCode?.solvedStats[2].count||0, color: "#facc15" },
    { name: "Hard", value: data.leetCode?.solvedStats[3].count||0, color: "#ef4444" },
  ];

  const cpData = [
    { name: "CodeChef", value: data.codeChef?.problemsSolved||0, color: "#22c55e" },
    { name: "CodeForces", value: data.codeForces?.problemsSolved||0, color: "#facc15" },
  ];

  return (
    <main className="dashboard-scroll-container">
      {active === "overview" && (
        <div className="main-viewport">
          
          <div className="stats-header-row">
            <StatCard title="Total Questions" value={(data.leetCode?.solvedStats[0].count||0)+(data.codeChef?.problemsSolved||0)+(data.codeForces?.problemsSolved||0)} />
            <StatCard title="DSA Questions" value={data.leetCode?.solvedStats[0].count||0} />
            <StatCard title="CP Questions" value={(data.codeChef?.problemsSolved||0)+(data.codeForces?.problemsSolved||0)} />
          </div>

          <div className="dashboard-body-grid-half">
            {(data.leetCode?.contest?.contestAttend>0 || data.codeChef?.contestParticipated!=0 || data.codeForces?.contest.length!=0) && <>
            <div className="col-balanced">
              <div className="glass-card contest-box-main">
                <div className="contest-flex-ui">
                  <div className="contest-big">
                    <p>Total Contests</p>
                    <h1>{(data.codeChef?.contestParticipated||0)+(data.codeForces?.contest.length||0)+(data.leetCode?.contest.contestAttend||0)}</h1>
                  </div>
                  <div className="platform-breakdown-list">
                    {data.leetCode?.contest?.contestAttend>0 && <>
                    <button 
                    className={`p-list-btn ${ratingPlatform === "leetCode" ? "active" : ""}`}
                    onClick={() => setRatingPlatform("leetCode")}
                     >
                   <div className="p-left">
                   <SiLeetcode />
                   <span>Leetcode</span>
                   </div>
                  <strong>{data.leetCode?.contest.contestAttend||0}</strong>
                  </button>
                  </>}
                  {(data.codeForces!=null && data.codeForces?.contest.length!=0) && 
                  <>
                  <button 
                  className={`p-list-btn ${ratingPlatform === "codeforces" ? "active" : ""}`}
                  onClick={() => setRatingPlatform("codeforces")}
                  >
                  <div className="p-left">
                  <SiCodeforces />
                   <span>CodeForces</span>
                   </div>
                  <strong>{data.codeForces?.contest.length||0}</strong>
                  </button>
                  </>
                  }
                  {(data.codeChef!=null && data.codeChef?.contestParticipated!=0) && <>
                   <button 
                  className={`p-list-btn ${ratingPlatform === "codeChef" ? "active" : ""}`}
                  onClick={() => setRatingPlatform("codeChef")}
                  >
                  <div className="p-left">
                  <SiCodechef />
                   <span>CodeChef</span>
                   </div>
                  <strong>{data.codeChef?.contestParticipated||0}</strong>
                  </button>
                  </>}
                  </div>
                </div>
              </div>

              <div className="glass-card rating-graph-wrapper">
                  {ratingPlatform!=="codeChef" &&
                <div className="g-meta-header">
                  <div className="r-display">
                    <p>Rating</p>
                    <h2>{ratingPlatform === "leetCode" ? Math.floor(data.leetCode?.contest.contestRating ||0) : data.codeForces?.rating||0}</h2>
                  </div>
                </div>
                  }
                <div className="chart-box-ui">
                  <RatingGraph platform={ratingPlatform} data={data} />
                </div>
              </div>
            </div>
            </>}
            <div className="col-balanced">
              {data.leetCode!=null && <>
              <PieSectionCard title="DSA" data={dsaData} total={data.leetCode?.solvedStats[0].count||0} />
              </>}
              {(data.codeChef!=null || data.codeForces!=null)&&<>
              <PieSectionCard title="Competitive Programming" data={cpData} total={(data.codeChef?.problemsSolved||0)+(data.codeForces?.problemsSolved||0)} />
              </>}
              {(data.codeChef!=null || data.codeForces?.contest.length>0)&&<>
              <div className="glass-card ranking-footer-card">
                <h3 className="section-label-ui">Contest Rankings</h3>
                {data.codeChef?.contestParticipated>0 && <>
                <div className="ranking-platform-section">
                  <p className="platform-name-tag">CODECHEF</p>
                  <div className="ranking-content-flex">
                    <div className="stars-badge-container">
                      {[...Array(data.codeChef?.stars || 0)].map((_, i) => (
                     <span key={i} className="star-ui-icon">★</span>
                     ))}                   
                    </div>
                    <div className="score-main-stack">
                      <h1>{data.codeChef?.rating}</h1>
                      <small>(max : {data.codeChef?.highestRating})</small>
                    </div>
                  </div>
                </div>
                 </>}
                 {data.codeForces?.contest.length>0 && <>
                <div className="ranking-platform-section">
                  <p className="platform-name-tag">CODEFORCES</p>
                  <div className="ranking-content-flex">
                    <div className="rank-label-tag">{data.codeForces?.rank}</div>
                    <div className="score-main-stack">
                      <h1>{data.codeForces?.rating}</h1>
                      <small>(max : {data.codeForces?.maxRating})</small>
                    </div>
                  </div>
                </div>
                </>}
              </div>
               </> }
            </div>
          </div>
        </div>
      )}
      {active === "leetCode" && (
        <div className="lc-main-viewport">
          
          <div className="lc-stats-header-row">
            <StatCard title="Total Questions" value={data.leetCode?.solvedStats[0].count||0} />
          </div>

          <div className="lc-dashboard-body-grid-half">
            {data.leetCode?.contest?.contestAttend>0 && <>
            <div className="lc-col-balanced">
              <div className="lc-glass-card contest-box-main">
                <div className="lc-contest-flex-ui">
                  <div className="contest-big">
                    <p>Total Contests</p>
                    <h1>{data.leetCode?.contest.contestAttend||0}</h1>
                  </div>
                  <div className="lc-platform-breakdown-list">
                    <button 
                    className="lc-p-list-btn"
                     >
                   <div className="p-left">
                   <SiLeetcode />
                   <span>Leetcode</span>
                   </div>
                  <strong>{data.leetCode?.contest.contestAttend||0}</strong>
                  </button>

                  </div>
                </div>
              </div>

              <div className="lc-glass-card rating-graph-wrapper">
                <div className="lc-g-meta-header">
                  <div className="lc-r-display">
                    <p>Rating</p>
                    <h2>{Math.floor(data.leetCode?.contest.contestRating||0)}</h2>
                  </div>
                </div>
                <div className="lc-chart-box-ui">
                  <RatingGraph platform={"leetCode"} data={data}/>
                </div>
              </div>
            </div>
            </>}
            <div className="lc-col-balanced">
              <PieSectionCard title="DSA" data={dsaData} total={data.leetCode?.solvedStats[0].count||0} />
            </div>
          </div>
        </div>
      )}
      {active === "codeChef" && (
        <div className="cc-main-viewport">
          
          <div className="cc-stats-header-row">
            <StatCard title="Total Questions" value={data.codeChef?.problemsSolved||0} />
          </div>

          <div className="cc-dashboard-body-grid-half">
            {data.codeChef!=null && <>
            <div className="cc-col-balanced">
              <div className="cc-glass-card contest-box-main">
                <div className="cc-contest-flex-ui">
                  <div className="cc-contest-big">
                    <p>Total Contests</p>
                    <h1>{data.codeChef?.contestParticipated||0}</h1>
                  </div>
                  <div className="cc-platform-breakdown-list">
                    <button 
                    className="cc-p-list-btn"
                    onClick={() => setRatingPlatform("codeChef")}
                     >
                   <div className="cc-p-left">
                   <SiCodechef />
                   <span>CodeChef</span>
                   </div>
                  <strong>{data.codeChef?.contestParticipated||0}</strong>
                  </button>

                  </div>
                </div>
              </div>

            </div>
            </>}
             {data.codeChef?.contestParticipated>0 && <>
            <div className="cc-col-balanced">
              <div className="cc-glass-card ranking-footer-card">
                <h3 className="cc-section-label-ui">Contest Rankings</h3>
                
                <div className="cc-ranking-platform-section">
                  <p className="cc-platform-name-tag">CODECHEF</p>
                  <div className="cc-ranking-content-flex">
                    <div className="cc-stars-badge-container">
                      {[...Array(data.codeChef?.stars || 0)].map((_, i) => (
                     <span key={i} className="star-ui-icon">★</span>
                     ))} 
                    </div>
                    <div className="cc-score-main-stack">
                      <h1>{data.codeChef?.rating}</h1>
                      <small>(max : {data.codeChef?.highestRating})</small>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            </>}
          </div>
        </div>
      )}
      {active === "codeForces" && (
        <div className="cf-main-viewport">
          
          <div className="cf-stats-header-row">
            <StatCard title="Total Questions" value={data.codeForces?.problemsSolved ||0} />
          </div>

          <div className="cf-dashboard-body-grid-half">
            {data.codeForces?.contest.length>0 && <>
            <div className="cf-col-balanced">
              <div className="cf-glass-card contest-box-main">
                <div className="cf-contest-flex-ui">
                  <div className="cf-contest-big">
                    <p>Total Contests</p>
                    <h1>{data.codeForces?.contest.length || 0}</h1>
                  </div>
                  <div className="cf-platform-breakdown-list">

                  <button 
                  className={"cf-p-list-btn"}
                  onClick={() => setRatingPlatform("codeForces")}
                  >
                  <div className="cf-p-left">
                  <SiCodeforces />
                   <span>CodeForces</span>
                   </div>
                  <strong>{data.codeForces?.contest.length ||0}</strong>
                  </button>
                  </div>
                </div>
              </div>

              <div className="cf-glass-card rating-graph-wrapper">
                  {ratingPlatform!=="codeChef" &&
                <div className="cf-g-meta-header">
                  <div className="cf-r-display">
                    <p>Rating</p>
                    <h2>{data.codeForces?.rating || 0}</h2>
                  </div>
                </div>
                  }
                <div className="cf-chart-box-ui">
                  <RatingGraph platform={"codeForces"} data={data}/>
                </div>
              </div>
            </div>
            <div className="cf-col-balanced">
              <div className="cf-glass-card ranking-footer-card">
                <h3 className="cf-section-label-ui">Contest Rankings</h3>

                <div className="cf-ranking-platform-section">
                  <p className="cf-platform-name-tag">CODEFORCES</p>
                  <div className="cf-ranking-content-flex">
                    <div className="cf-rank-label-tag">{data.codeForces?.rank || ""}</div>
                    <div className="cf-score-main-stack">
                      <h1>{data.codeForces?.rating ||0}</h1>
                      <small>(max : {data.codeForces?.rating||0})</small>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            </>}
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="glass-card stat-item-top">
      <p>{title}</p>
      <h1>{value}</h1>
    </div>
  );
}

function PieSectionCard({ title, data, total }) {
  return (
    <div className="glass-card pie-item-balanced">
      <h4>{title}</h4>
      <div className="pie-body-ui">
        <div className="pie-visual-wrapper">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={data} innerRadius={45} outerRadius={60} dataKey="value" stroke="none">
                {data.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center-val"><strong>{total}</strong></div>
        </div>
        <div className="pie-legend-ui">
          {data.map(item => (
            <div key={item.name} className="legend-row-ui">
              <div className="l-info"><span className="dot-ui" style={{background: item.color}}></span> {item.name}</div>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RatingGraph({ platform,data }) {
  
  if (platform === "codeChef") return null;
  const chartData =
  platform === "leetCode"
        ? data.leetCode?.contest?.contestParticipation?.map(c => ({
        rating: Math.floor(c.rating),
        contest: c.contest.title,
        time: new Date(c.contest.startTime * 1000)
          .toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          })
      })) || []
    : data.codeForces?.contest?.map(c=>({
      rating:c.newRating,
      contest:c.contestName,
      time:new Date(c.ratingUpdateTimeSeconds*1000).toLocaleDateString("en-US",{
        month:"short",
        day:"2-digit",
        year:"numeric"
      })
    }))||[];
  return(
    platform==="leetCode"?(
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
      >
        <defs>
          <linearGradient id="chartG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip
          cursor={{ stroke: "#fbbf24", strokeWidth: 0 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              return (
                <div
                  style={{
                    background: "#1f212a",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #2a2e38",
                    color: "#fff"
                  }}
                >
                  <strong>{d.contest}</strong>
                  <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
                    {d.time}
                  </p>
                  <p style={{ color: "#fbbf24" }}>
                    Rating: {d.rating}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Area
          type="monotone"
          dataKey="rating"
          stroke="#d97706"
          fill="url(#chartG)"
          strokeWidth={3}
          activeDot={{ r: 6 }}
        />

        <XAxis hide />
        <YAxis  domain={["dataMin - 50", "dataMax + 50"]} />
      </AreaChart>
    </ResponsiveContainer>

    ):(
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
      >
        <defs>
          <linearGradient id="chartG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip
          cursor={{ stroke: "#fbbf24", strokeWidth: 0 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              return (
                <div
                  style={{
                    background: "#1f212a",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #2a2e38",
                    color: "#fff"
                  }}
                >
                  <strong>{d.contest}</strong>
                  <p style={{ fontSize: "0.8rem", margin: "4px 0" }}>
                    {d.time}
                  </p>
                  <p style={{ color: "#fbbf24" }}>
                    Rating: {d.rating}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Area
          type="monotone"
          dataKey="rating"
          stroke="#d97706"
          fill="url(#chartG)"
          strokeWidth={3}
          activeDot={{ r: 6 }}
        />

        <XAxis hide />
        <YAxis  domain={["dataMin - 50", "dataMax + 50"]} />
      </AreaChart>
    </ResponsiveContainer>
    
    ))}
  ;

export default RightSidebar;
