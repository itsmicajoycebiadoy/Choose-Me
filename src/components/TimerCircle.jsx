export default function TimerCircle({ timer, onPause, onResume, isRunning }) {
  const color =
    timer <= 2 ? "#FF4757" : timer <= 3 ? "#FFA502" : "#2ED573";

  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 72,
          height: 72,
          borderRadius: "50%",
          background:
            timer <= 2 ? "rgba(255,71,87,0.2)" : "rgba(255,255,255,0.08)",
          border: `4px solid ${color}`,
          fontSize: "2rem",
          fontWeight: 900,
          color,
          transition: "all 0.3s",
          boxShadow: timer <= 2 ? "0 0 24px rgba(255,71,87,0.5)" : "none",
          animation: timer <= 2 ? "timerPulse 0.5s ease infinite alternate" : "none",
          position: "relative",
        }}
      >
        {timer}
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "center" }}>
        {!isRunning && timer > 0 && timer < 5 && (
          <button
            onClick={onResume}
            style={{
              background: "rgba(46,213,115,0.2)",
              border: "1px solid #2ED573",
              borderRadius: 30,
              padding: "4px 12px",
              color: "#2ED573",
              fontSize: "0.7rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ▶️ Play
          </button>
        )}
        {isRunning && (
          <button
            onClick={onPause}
            style={{
              background: "rgba(255,71,87,0.2)",
              border: "1px solid #FF4757",
              borderRadius: 30,
              padding: "4px 12px",
              color: "#FF4757",
              fontSize: "0.7rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ⏸️ Pause
          </button>
        )}
      </div>
    </div>
  );
}