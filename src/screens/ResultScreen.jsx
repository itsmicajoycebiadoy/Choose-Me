import COLORS from "../data/colors";

export default function ResultScreen({ question, feedback, score, totalAnswered, usedColors, onNext }) {
  const isLast = usedColors.length + 1 >= COLORS.length;
  return (
    <div style={{ width: "100%", maxWidth: 600, textAlign: "center", animation: "slideUp 0.4s ease" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{feedback === "correct" ? "🎉" : "😬"}</div>
      <h2 style={{ 
        color: feedback === "correct" ? "#2ED573" : "#FF4757", 
        fontSize: "clamp(1.5rem, 4vw, 2.2rem)", 
        fontWeight: 900, 
        margin: "0 0 8px" 
      }}>
        {feedback === "correct" ? "Tama! 🏆" : feedback === "timeout" ? "Naubos ang oras! ⏰" : "Mali! ❌"}
      </h2>
      <div style={{ 
        background: "rgba(255,255,255,0.06)", 
        border: "1px solid rgba(255,255,255,0.12)", 
        borderRadius: 20, 
        padding: "20px 24px", 
        margin: "20px 0", 
        backdropFilter: "blur(12px)" 
      }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: 2, margin: "0 0 8px" }}>
          Tamang Sagot
        </p>
        <p style={{ color: "#2ED573", fontWeight: 700, fontSize: "1.1rem", margin: "0 0 12px" }}>
          {question.answer}
        </p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", margin: 0, lineHeight: 1.5 }}>
          {question.explanation}
        </p>
      </div>
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24, fontSize: "0.9rem" }}>
        Score: <span style={{ color: "#FFA502", fontWeight: 700, fontSize: "1.1rem" }}>{score}</span> / {totalAnswered}
      </div>
      <button 
        onClick={onNext} 
        style={{ 
          background: "linear-gradient(135deg, #2ED573, #1E90FF)", 
          color: "#fff", 
          border: "none", 
          borderRadius: 50, 
          padding: "14px 40px", 
          fontSize: "1.1rem", 
          fontWeight: 700, 
          cursor: "pointer", 
          boxShadow: "0 8px 24px rgba(46,213,115,0.4)", 
          transition: "transform 0.2s" 
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"} 
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {isLast ? "Tingnan ang Resulta 📊" : "Susunod na Kulay →"}
      </button>
    </div>
  );
}