import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import stockOptions from "../data/stockOptions";
import "./StockAnalysis.css";

const StockAnalysis = () => {
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const wsRef = useRef(null);

  // 🔹 WebSocket to send stock symbol for full analysis
  const startWebSocket = () => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws/stock-analysis/");

    wsRef.current.onopen = () => {
      if (selectedStock) {
        const symbol = selectedStock.value?.toUpperCase();
        console.log("Sending stock for analysis:", symbol);

        wsRef.current.send(
          JSON.stringify({
            action: "analyze",
            symbol: symbol,
            prompt: "Analyze the stock performance, considering fundamentals, technicals, sentiment, and recent news.",
          })
        );
      }
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAnalysisResult(data.result); // Assuming backend sends { result: "..." }
      setLoading(false);
    };

    wsRef.current.onerror = (error) => console.error("WebSocket error:", error);
    wsRef.current.onclose = () => console.log("WebSocket closed");
  };

  const handleAnalyze = () => {
    if (!selectedStock) {
      alert("Please select a stock.");
      return;
    }
    setLoading(true);
    setAnalysisResult("⏳ Waiting for analysis...");
    startWebSocket();
  };

  const handleEndAnalysis = () => {
    setLoading(false);
    setAnalysisResult("");
    if (wsRef.current) wsRef.current.close();
  };

  // 🔹 Top-bar navigation handlers
  const handleAnalyzeNews = () => navigate("/analyzer");
  const handleChat = () => navigate("/");
  const handleAnalyzeStock = () => navigate("/stock-trends");

  return (
    <div className="stock-analysis">
      {/* Top Bar */}
      <div className="top-bar">
        <h1 className="brand-name">News2Trade</h1>
        <div className="top-buttons">
          <button onClick={() => navigate("/analyzer")}>Analyse News with AI</button>
          <button onClick={() => navigate("/")}>FinAI Assistant</button>
          <button onClick={() => navigate("/stock-trends")}>Analyze Stock Trends</button>
        </div>
        <style>
          {`
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 05px 30px;
    background: linear-gradient(90deg, #0a0f1a, #313843ff, #444e62ff); /* subtle dark gradient for stock theme */
    box-shadow: 0 4px 14px rgba(0,0,0,0.6);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .brand-name {
    font-size: 50px; /* increased size */
    font-weight: 900;
    background: linear-gradient(90deg, #ff6f3c, #ff3e3e); /* warm gradient to stand out */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
    text-shadow: 0 3px 8px rgba(0,0,0,0.8); /* glow for prominence */
  }

  .top-buttons {
    display: flex;
    gap: 20px;
  }

  .top-buttons button {
    padding: 10px 24px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #1e293b, #111827); /* muted dark gradient */
    color: #f9fafb; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.6);
  }

  .top-buttons button:hover {
    background: linear-gradient(135deg, #374151, #1f2937); /* subtle hover */
    box-shadow: 0 4px 12px rgba(0,0,0,0.7);
  }

  @media (max-width: 768px) {
    .top-bar {
      flex-direction: column;
      align-items: flex-start;
      padding: 16px 20px;
    }
    .top-buttons {
      margin-top: 14px;
      width: 100%;
      justify-content: space-between;
    }
    .top-buttons button {
      flex: 1;
      text-align: center;
    }
  }
`}
        </style>
      </div>

      {/* Analysis Container */}
      <div className="stock-analysis-page">
        <div className="stock-analysis-container">
          <h2>Stock Full Analysis</h2>

          <div className="stock-selector-section">
            <label>Select Stock:</label>
            <Select
              options={[
                { label: "Stocks", options: stockOptions.stocks },
                { label: "Crypto", options: stockOptions.crypto },
                { label: "Indices", options: stockOptions.indices },
              ]}
              value={selectedStock}
              onChange={setSelectedStock}
              placeholder="Search and select..."
              isDisabled={loading}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#111',
                  borderColor: '#333',
                  color: '#fff',
                }),
                singleValue: (base) => ({ ...base, color: '#fff' }),
                menu: (base) => ({ ...base, backgroundColor: '#111', color: '#fff' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#ff4d4d' : '#111',
                  color: state.isFocused ? '#fff' : '#f9fafb',
                }),
                input: (base) => ({ ...base, color: '#fff' }),
                placeholder: (base) => ({ ...base, color: '#bbb' }),
              }}
            />
          </div>

          <div className="stock-buttons-section">
            <button onClick={handleAnalyze} disabled={loading}>
              🔍 Analyze
            </button>
            {loading && (
              <button onClick={handleEndAnalysis} className="end-btn">
                ❌ End Analysis
              </button>
            )}
          </div>

          {analysisResult && (
            <div className="stock-analysis-result">
              <p>{analysisResult}</p>
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default StockAnalysis;
