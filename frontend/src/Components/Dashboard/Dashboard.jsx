import { useState } from "react";
import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
import RightSidebar from "../RightSidebar/RightSidebar.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  const [active, setActive] = useState("overview");

  return (
    <div className="dashboard-root">
      <LeftSidebar active={active} setActive={setActive} />
      <RightSidebar active={active} />
    </div>
  );
}
