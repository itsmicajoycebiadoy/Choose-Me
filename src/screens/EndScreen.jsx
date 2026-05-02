import Confetti from "../components/Confetti";
import COLORS from "../data/colors";

export default function EndScreen({ score, totalAnswered, onReset }) {
  const medal = score >= 4 ? "🏆" : score >= 3 ? "🥈" : "🎮";
  const message = score >= 4 ? "Excellent! 🌟" : score >= 3 ? "Good job! 👍" : score >= 2 ? "Keep going! 💪" : "Try again! 🔄";
  
  return (
    <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease", maxWidth: 500 }}>
      <Confetti />
      <div style={{ fontSize: 80, marginBottom: 16, animation: "float 2s ease-in-out infinite" }}>{medal}</div>
      <h2 style={{ 
        color: "#fff", 
        fontSize: "clamp(2rem, 6vw, 3rem)", 
        fontWeight: 900, 
        margin: "0 0 12px",
        textShadow: "0 4px 30px rgba(0,0,0,0.3)"
      }}>
        It's over! 🎊
      </h2>
      <p style={{ 
        color: "rgba(255,255,255,0.6)", 
        marginBottom: 28,
        fontSize: "1rem",
        fontWeight: 500,
        letterSpacing: 2,
        textTransform: "uppercase"
      }}>
        Final Score
      </p>
      <div style={{ 
        background: "linear-gradient(135deg, rgba(165,94,234,0.15), rgba(30,144,255,0.15))", 
        border: "2px solid rgba(165,94,234,0.3)", 
        borderRadius: 28, 
        padding: "36px", 
        marginBottom: 32,
        backdropFilter: "blur(16px)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.2)"
      }}>
        <div style={{ fontSize: "4.5rem", fontWeight: 900, color: "#fff", lineHeight: 1, textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          {score}<span style={{ color: "rgba(255,255,255,0.3)", fontSize: "2.2rem" }}>/{totalAnswered}</span>
        </div>
        <div style={{ 
          color: score >= 4 ? "#2ED573" : score >= 3 ? "#FFA502" : "#FF4757", 
          fontWeight: 700, 
          marginTop: 12, 
          fontSize: "1.2rem",
          textShadow: score >= 4 ? "0 0 20px rgba(46,213,115,0.5)" : score >= 3 ? "0 0 20px rgba(255,165,2,0.5)" : "0 0 20px rgba(255,71,87,0.5)"
        }}>
          {message}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
        {COLORS.map((c, i) => ( 
          <div 
            key={c.name} 
            style={{ 
              background: c.bg, 
              borderRadius: 50, 
              padding: "8px 16px", 
              color: "#fff", 
              fontSize: "0.85rem", 
              fontWeight: 600, 
              boxShadow: `0 6px 16px ${c.glow}66`,
              opacity: 0, 
              animation: `fadeIn 0.4s ${i * 0.1}s ease forwards`,
              border: "2px solid rgba(255,255,255,0.15)"
            }}
          >
            {c.emoji} {c.name}
          </div>
        ))}
      </div>
      <button 
        onClick={onReset} 
        style={{ 
          background: "linear-gradient(135deg, #FF4757, #A55EEA)", 
          color: "#fff", 
          border: "none", 
          borderRadius: 50, 
          padding: "18px 52px", 
          fontSize: "1.25rem", 
          fontWeight: 700, 
          cursor: "pointer", 
          boxShadow: "0 8px 32px rgba(255,71,87,0.45), inset 0 2px 0 rgba(255,255,255,0.15)", 
          transition: "all 0.25s ease"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.05) translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 16px 48px rgba(255,71,87,0.55)";
        }} 
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,71,87,0.45), inset 0 2px 0 rgba(255,255,255,0.15)";
        }}
      >
        🔄 Play Again!
      </button>
    </div>
  );
}
