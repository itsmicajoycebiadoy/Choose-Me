import COLORS from "../data/colors";

export default function ResultScreen({ 
  question, 
  feedback, 
  usedColors, 
  onNext,
  onRetry,
  onChangeColor
}) {
  const isLast = usedColors.length + 1 >= COLORS.length;
  const titleColor = feedback === "correct" ? "#2ED573" : "#FF4757";

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: 600, 
      textAlign: "center", 
      animation: "slideUp 0.4s ease" 
    }}>
      
      <div style={{ fontSize: 72, marginBottom: 20, animation: feedback === "correct" ? "float 2s ease-in-out infinite" : "none" }}>
        {feedback === "correct" ? "🎉" : feedback === "timeout" ? "⏰" : "😬"}
      </div>

      <h2 style={{ 
        color: titleColor, 
        fontSize: "clamp(1.6rem, 5vw, 2.4rem)", 
        fontWeight: 900,
        textShadow: `0 0 30px ${feedback === "correct" ? "rgba(46,213,115,0.5)" : "rgba(255,71,87,0.5)"}`,
        marginBottom: 28
      }}>
        {feedback === "correct" 
          ? "Correct!" 
          : feedback === "timeout" 
          ? "Time's up!" 
          : "Wrong!"}
      </h2>

      <div style={{
        background: "rgba(255,255,255,0.06)",
        border: feedback === "correct" ? "2px solid rgba(46,213,115,0.4)" : "2px solid rgba(255,71,87,0.4)",
        borderRadius: 20,
        padding: "28px 32px",
        marginBottom: 36,
        backdropFilter: "blur(16px)",
        boxShadow: feedback === "correct" 
          ? "0 8px 32px rgba(46,213,115,0.15)" 
          : "0 8px 32px rgba(255,71,87,0.15)"
      }}>
        <p style={{ 
          color: titleColor, 
          fontWeight: 700,
          fontSize: "1.3rem",
          margin: "0 0 16px 0"
        }}>
          Answer: {question.answer}
        </p>
        
        <p style={{ 
          color: "rgba(255,255,255,0.85)",
          fontSize: "1rem",
          lineHeight: "1.7",
          margin: 0
        }}>
          {question.explanation}
        </p>
      </div>

      {/* 🔁 RETRY BUTTON */}
      {feedback !== "correct" && (
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button 
            onClick={onRetry}
            style={{
              background: "linear-gradient(135deg, #FF4757, #FF6B81)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "18px 52px",
              fontSize: "1.25rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255,71,87,0.45), inset 0 2px 0 rgba(255,255,255,0.15)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(255,71,87,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,71,87,0.45), inset 0 2px 0 rgba(255,255,255,0.15)";
            }}
          >
            🔁 Retry Question
          </button>

          <button 
            onClick={onChangeColor}
            style={{
              background: "linear-gradient(135deg, #FFA502, #FFB633)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "18px 52px",
              fontSize: "1.25rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255, 165, 2, 0.45), inset 0 2px 0 rgba(255,255,255,0.15)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(255, 165, 2, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 165, 2, 0.45), inset 0 2px 0 rgba(255,255,255,0.15)";
            }}
          >
            🎨 Change Color
          </button>
        </div>
      )}

      {/* ➡️ NEXT BUTTON */}
      {feedback === "correct" && (
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button 
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg, #A55EEA, #6C5CE7)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "18px 52px",
              fontSize: "1.25rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(165,94,234,0.45), inset 0 2px 0 rgba(255,255,255,0.15)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(165,94,234,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(165,94,234,0.45), inset 0 2px 0 rgba(255,255,255,0.15)";
            }}
          >
            {isLast ? "🏁 Finish" : "➡️ Next"}
          </button>

          <button 
            onClick={onChangeColor}
            style={{
              background: "linear-gradient(135deg, #FFA502, #FFB633)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "18px 52px",
              fontSize: "1.25rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255, 165, 2, 0.45), inset 0 2px 0 rgba(255,255,255,0.15)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(255, 165, 2, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 165, 2, 0.45), inset 0 2px 0 rgba(255,255,255,0.15)";
            }}
          >
            🎨 Change Color
          </button>
        </div>
      )}
    </div>
  );
}
