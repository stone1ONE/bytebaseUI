import React from "react";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
import "./styles/global.css";

function App() {
  return (
    <div className="container">
      <LeftSection />
      <RightSection />
    </div>
  );
}

export default App;
