import Confetti from "../components/Confetti";
import COLORS from "../data/colors";

export default function EndScreen({ score, totalAnswered, onReset }) {
  const medal = score >= 4 ? "🏆" : score >= 3 ? "🥈" : "🎮";
  const message = score >= 4 ? "Excellent! 🌟" : score >= 3 ? "Good job! 👍" : score >= 2 ? "Keep going! 💪" : "Try again! 🔄";
  return (
    <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease", maxWidth: 500 }}>
      <Confetti />
      <div style={{ fontSize: 72, marginBottom: 12 }}>{medal}</div>
      <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, margin: "0 0 8px" }}>It’s over! 🎊</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Final Score</p>
      <div style={{ background: "linear-gradient(135deg, rgba(165,94,234,0.2), rgba(30,144,255,0.2))", border: "2px solid rgba(165,94,234,0.4)", borderRadius: 24, padding: "32px", marginBottom: 28 }}>
        <div style={{ fontSize: "4rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
          {score}<span style={{ color: "rgba(255,255,255,0.3)", fontSize: "2rem" }}>/{totalAnswered}</span>
        </div>
        <div style={{ color: score >= 4 ? "#2ED573" : score >= 3 ? "#FFA502" : "#FF4757", fontWeight: 700, marginTop: 8, fontSize: "1.1rem" }}>{message}</div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
        {COLORS.map((c, i) => ( 
          <div key={c.name} style={{ background: c.bg, borderRadius: 50, padding: "6px 14px", color: "#fff", fontSize: "0.8rem", fontWeight: 600, boxShadow: `0 4px 12px ${c.glow}`, opacity: 0, animation: `fadeIn 0.4s ${i * 0.1}s ease forwards` }}>
            {c.emoji} {c.name}
          </div>
        ))}
      </div>
      <button 
        onClick={onReset} 
        style={{ background: "linear-gradient(135deg, #FF4757, #A55EEA)", color: "#fff", border: "none", borderRadius: 50, padding: "16px 48px", fontSize: "1.2rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(255,71,87,0.4)", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"} 
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Retry Again!
      </button>
    </div>
  );
}