import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import StockNewsAnalyzer from "./components/StockSelector";
import StockAnalysis from "./components/stockanalysis";
import InitialScreen from "./components/InitialScreen";
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
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/analyzer" element={<StockNewsAnalyzer />} />
          <Route path="/stock-trends" element={<StockAnalysis />} />
          <Route path="/home" element={<InitialScreen />} /> {/* Use /home for InitialScreen */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
