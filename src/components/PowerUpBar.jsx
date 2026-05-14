export default function PowerUpBar({ onUseFifty, canUseFifty, usedFifty }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
      <div style={{ color: "rgba(255,255,255,0.6)", fontWeight: 700, letterSpacing: 0.5 }}>
        Power-ups
      </div>
      <button
        onClick={onUseFifty}
        disabled={!canUseFifty}
        style={{
          background: usedFifty
            ? "rgba(255,255,255,0.06)"
            : "linear-gradient(135deg, rgba(255,165,2,0.25), rgba(255,165,2,0.1))",
          border: usedFifty ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,165,2,0.45)",
          color: usedFifty ? "rgba(255,255,255,0.45)" : "#FFCF56",
          borderRadius: 999,
          padding: "10px 16px",
          fontWeight: 800,
          cursor: usedFifty ? "not-allowed" : "pointer",
          boxShadow: usedFifty ? "none" : "0 8px 32px rgba(255,165,2,0.2)",
          backdropFilter: "blur(10px)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (usedFifty) return;
          e.currentTarget.style.transform = "scale(1.03)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {usedFifty ? "✅ 50/50 used" : "🪄 50/50"}
      </button>
    </div>
  );
}

