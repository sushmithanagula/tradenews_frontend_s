import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockNewsAnalyzer from "./components/StockSelector.js";
import StockAnalysis from "./components/stockanalysis.js"; // ✅ new import
import InitialScreen from "./components/InitialScreen.js";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Routes>
          <Route path="/" element={<InitialScreen />} />
          <Route path="/analyzer" element={<StockNewsAnalyzer />} />
          <Route path="/stock-trends" element={<StockAnalysis />} /> {/* ✅ new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
