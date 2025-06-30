import TradingChart from "../components/TradingChart";

function Dashboard() {
  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      backgroundColor: "#111", 
      margin: 0 
    }}>
      <header style={{ 
        padding: "10px", 
        color: "white", 
        fontSize: "20px", 
        borderBottom: "1px solid #444" 
      }}>
        Live Gold Chart
      </header>

      <div style={{ flex: 1, minHeight: 0 }}>
        <TradingChart />
      </div>
    </div>
  );
}

export default Dashboard;
