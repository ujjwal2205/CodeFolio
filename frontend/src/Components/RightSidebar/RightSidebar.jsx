import React, { useState } from "react";
import "./RightSidebar.css";
import {
  AreaChart, Area, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis
} from "recharts";
import { SiLeetcode,SiCodeforces,SiCodechef } from "react-icons/si";
export default function RightSidebar({ active }) {
  const [ratingPlatform, setRatingPlatform] = useState("leetCode");

  const dsaData = [
    { name: "Easy", value: 310, color: "#22c55e" },
    { name: "Medium", value: 220, color: "#facc15" },
    { name: "Hard", value: 48, color: "#ef4444" },
  ];

  const cpData = [
    { name: "CodeChef", value: 62, color: "#22c55e" },
    { name: "CodeForces", value: 25, color: "#facc15" },
  ];

  return (
    <main className="dashboard-scroll-container">
      {active === "overview" && (
        <div className="main-viewport">
          
          <div className="stats-header-row">
            <StatCard title="Total Questions" value="665" />
            <StatCard title="DSA Questions" value="578" />
            <StatCard title="CP Questions" value="87" />
          </div>

          <div className="dashboard-body-grid-half">
            
            <div className="col-balanced">
              <div className="glass-card contest-box-main">
                <div className="contest-flex-ui">
                  <div className="contest-big">
                    <p>Total Contests</p>
                    <h1>20</h1>
                  </div>
                  <div className="platform-breakdown-list">
                    <button 
                    className={`p-list-btn ${ratingPlatform === "leetCode" ? "active" : ""}`}
                    onClick={() => setRatingPlatform("leetCode")}
                     >
                   <div className="p-left">
                   <SiLeetcode />
                   <span>Leetcode</span>
                   </div>
                  <strong>17</strong>
                  </button>

                  <button 
                  className={`p-list-btn ${ratingPlatform === "codeforces" ? "active" : ""}`}
                  onClick={() => setRatingPlatform("codeforces")}
                  >
                  <div className="p-left">
                  <SiCodeforces />
                   <span>CodeForces</span>
                   </div>
                  <strong>13</strong>
                  </button>
                   <button 
                  className={`p-list-btn ${ratingPlatform === "codeChef" ? "active" : ""}`}
                  onClick={() => setRatingPlatform("codeChef")}
                  >
                  <div className="p-left">
                  <SiCodechef />
                   <span>CodeChef</span>
                   </div>
                  <strong>13</strong>
                  </button>
                  </div>
                </div>
              </div>

              <div className="glass-card rating-graph-wrapper">
                  {ratingPlatform!=="codeChef" &&
                <div className="g-meta-header">
                  <div className="r-display">
                    <p>Rating</p>
                    <h2>{ratingPlatform === "leetCode" ? "1428" : "987"}</h2>
                  </div>
                </div>
                  }
                <div className="chart-box-ui">
                  <RatingGraph platform={ratingPlatform} />
                </div>
              </div>
            </div>

            <div className="col-balanced">
              <PieSectionCard title="DSA" data={dsaData} total="578" />
              <PieSectionCard title="Competitive Programming" data={cpData} total="87" />

              <div className="glass-card ranking-footer-card">
                <h3 className="section-label-ui">Contest Rankings</h3>
                
                <div className="ranking-platform-section">
                  <p className="platform-name-tag">CODECHEF</p>
                  <div className="ranking-content-flex">
                    <div className="stars-badge-container">
                      <span className="star-ui-icon">★</span>
                      <span className="star-ui-icon">★</span>
                    </div>
                    <div className="score-main-stack">
                      <h1>1428</h1>
                      <small>(max : 1489)</small>
                    </div>
                  </div>
                </div>

                <div className="ranking-platform-section">
                  <p className="platform-name-tag">CODEFORCES</p>
                  <div className="ranking-content-flex">
                    <div className="rank-label-tag">Newbie</div>
                    <div className="score-main-stack">
                      <h1>987</h1>
                      <small>(max : 987)</small>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
      {active === "leetCode" && (
        <div className="lc-main-viewport">
          
          <div className="lc-stats-header-row">
            <StatCard title="Total Questions" value="578" />
          </div>

          <div className="lc-dashboard-body-grid-half">
            
            <div className="lc-col-balanced">
              <div className="lc-glass-card contest-box-main">
                <div className="lc-contest-flex-ui">
                  <div className="contest-big">
                    <p>Total Contests</p>
                    <h1>20</h1>
                  </div>
                  <div className="lc-platform-breakdown-list">
                    <button 
                    className="lc-p-list-btn"
                     >
                   <div className="p-left">
                   <SiLeetcode />
                   <span>Leetcode</span>
                   </div>
                  <strong>20</strong>
                  </button>

                  </div>
                </div>
              </div>

              <div className="lc-glass-card rating-graph-wrapper">
                <div className="lc-g-meta-header">
                  <div className="lc-r-display">
                    <p>Rating</p>
                    <h2> 1428</h2>
                  </div>
                </div>
                <div className="lc-chart-box-ui">
                  <RatingGraph platform={"leetCode"} />
                </div>
              </div>
            </div>

            <div className="lc-col-balanced">
              <PieSectionCard title="DSA" data={dsaData} total="578" />
            </div>
          </div>
        </div>
      )}
      {active === "codeChef" && (
        <div className="cc-main-viewport">
          
          <div className="cc-stats-header-row">
            <StatCard title="Total Questions" value="62" />
          </div>

          <div className="cc-dashboard-body-grid-half">
            
            <div className="cc-col-balanced">
              <div className="cc-glass-card contest-box-main">
                <div className="cc-contest-flex-ui">
                  <div className="cc-contest-big">
                    <p>Total Contests</p>
                    <h1>13</h1>
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
                  <strong>13</strong>
                  </button>

                  </div>
                </div>
              </div>

            </div>

            <div className="cc-col-balanced">
              <div className="cc-glass-card ranking-footer-card">
                <h3 className="cc-section-label-ui">Contest Rankings</h3>
                
                <div className="cc-ranking-platform-section">
                  <p className="cc-platform-name-tag">CODECHEF</p>
                  <div className="cc-ranking-content-flex">
                    <div className="cc-stars-badge-container">
                      <span className="cc-star-ui-icon">★</span>
                      <span className="cc-star-ui-icon">★</span>
                    </div>
                    <div className="cc-score-main-stack">
                      <h1>1428</h1>
                      <small>(max : 1489)</small>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
      {active === "codeForces" && (
        <div className="cf-main-viewport">
          
          <div className="cf-stats-header-row">
            <StatCard title="Total Questions" value="25" />
          </div>

          <div className="cf-dashboard-body-grid-half">
            
            <div className="cf-col-balanced">
              <div className="cf-glass-card contest-box-main">
                <div className="cf-contest-flex-ui">
                  <div className="cf-contest-big">
                    <p>Total Contests</p>
                    <h1>13</h1>
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
                  <strong>13</strong>
                  </button>
                  </div>
                </div>
              </div>

              <div className="cf-glass-card rating-graph-wrapper">
                  {ratingPlatform!=="codeChef" &&
                <div className="cf-g-meta-header">
                  <div className="cf-r-display">
                    <p>Rating</p>
                    <h2>987</h2>
                  </div>
                </div>
                  }
                <div className="cf-chart-box-ui">
                  <RatingGraph platform={"codeForces"} />
                </div>
              </div>
            </div>

            <div className="cf-col-balanced">
              <div className="cf-glass-card ranking-footer-card">
                <h3 className="cf-section-label-ui">Contest Rankings</h3>

                <div className="cf-ranking-platform-section">
                  <p className="cf-platform-name-tag">CODEFORCES</p>
                  <div className="cf-ranking-content-flex">
                    <div className="cf-rank-label-tag">Newbie</div>
                    <div className="cf-score-main-stack">
                      <h1>987</h1>
                      <small>(max : 987)</small>
                    </div>
                  </div>
                </div>
              </div>

            </div>
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

function RatingGraph({ platform }) {
  const data =
    platform === "leetCode"
      ? [
          {
            rating: 1410,
            contest: "Weekly Contest 379",
            time: "Dec 20, 2025"
          },
          {
            rating: 1425,
            contest: "Weekly Contest 380",
            time: "Dec 27, 2025"
          },
          {
            rating: 1415,
            contest: "Weekly Contest 381",
            time: "Jan 03, 2026"
          },
          {
            rating: 1428,
            contest: "Weekly Contest 382",
            time: "Jan 10, 2026"
          }
        ]
      : [
          {
            rating: 850,
            contest: "CF Round #920",
            time: "Dec 18, 2025"
          },
          {
            rating: 920,
            contest: "CF Round #925",
            time: "Jan 02, 2026"
          },
          {
            rating: 987,
            contest: "CF Round #931",
            time: "Jan 15, 2026"
          }
        ];
  if (platform === "codeChef") return null;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
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
  );
}
