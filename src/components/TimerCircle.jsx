export default function TimerCircle({ timer, onPause, onResume, isRunning }) {
  const getColor = () => {
    if (timer <= 3) return "#FF4757";
    if (timer <= 5) return "#FFA502";
    return "#2ED573";
  };
  
  const color = getColor();
  const isLow = timer <= 3;

  return (
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          border: `3px solid ${color}`,
          fontSize: "2.2rem",
          fontWeight: 900,
          color: color,
          transition: "all 0.3s ease",
          boxShadow: isLow 
            ? `0 0 30px ${color}66, 0 0 60px ${color}33` 
            : "0 8px 32px rgba(0,0,0,0.3), inset 0 2px 8px rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          animation: isLow ? "pulse 0.5s ease infinite alternate" : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          background: isLow ? `${color}22` : "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          animation: "pulse 2s ease infinite",
        }} />
        <span style={{ position: "relative", zIndex: 1 }}>{timer}</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 10, justifyContent: "center" }}>
        {!isRunning && timer > 0 && timer < 10 && timer !== 0 && (
          <button
            onClick={onResume}
            style={{
              background: "linear-gradient(135deg, rgba(46,213,115,0.2), rgba(46,213,115,0.1))",
              border: "1px solid rgba(46,213,115,0.4)",
              borderRadius: 30,
              padding: "6px 16px",
              color: "#2ED573",
              fontSize: "0.75rem",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(46,213,115,0.35), rgba(46,213,115,0.2))";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(46,213,115,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(46,213,115,0.2), rgba(46,213,115,0.1))";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ▶️ Resume
          </button>
        )}
        {isRunning && timer > 0 && (
          <button
            onClick={onPause}
            style={{
              background: "linear-gradient(135deg, rgba(255,71,87,0.2), rgba(255,71,87,0.1))",
              border: "1px solid rgba(255,71,87,0.4)",
              borderRadius: 30,
              padding: "6px 16px",
              color: "#FF4757",
              fontSize: "0.75rem",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.2s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,71,87,0.35), rgba(255,71,87,0.2))";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,71,87,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,71,87,0.2), rgba(255,71,87,0.1))";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ⏸️ Pause
          </button>
        )}
      </div>
    </div>
  );
}
