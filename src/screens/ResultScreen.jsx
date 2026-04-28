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

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: 600, 
      textAlign: "center", 
      animation: "slideUp 0.4s ease" 
    }}>
      
      <div style={{ fontSize: 64, marginBottom: 16 }}>
        {feedback === "correct" ? "🎉" : feedback === "timeout" ? "⏰" : "😬"}
      </div>

      <h2 style={{ 
        color: feedback === "correct" ? "#2ED573" : "#FF4757", 
        fontSize: "clamp(1.5rem, 4vw, 2.2rem)", 
        fontWeight: 900 
      }}>
        {feedback === "correct" 
          ? "Correct!" 
          : feedback === "timeout" 
          ? "Time's up!" 
          : "Wrong!"}
      </h2>

      <div style={{
        background: "rgba(46, 213, 115, 0.12)",
        border: "2px solid #2ED573",
        borderRadius: 16,
        padding: "24px 32px",
        marginBottom: 32,
        backdropFilter: "blur(8px)"
      }}>
        <p style={{ 
          color: "#2ED573", 
          fontWeight: 700,
          fontSize: "1.2rem",
          margin: "0 0 16px 0"
        }}>
          Answer: {question.answer}
        </p>
        
        <p style={{ 
          color: "rgba(255,255,255,0.85)",
          fontSize: "0.95rem",
          lineHeight: "1.6",
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
              padding: "16px 48px",
              fontSize: "1.2rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255,71,87,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,71,87,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,71,87,0.5)";
            }}
          >
            Retry Question
          </button>

          <button 
            onClick={onChangeColor}
            style={{
              background: "linear-gradient(135deg, #FFA502, #FFB633)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "16px 48px",
              fontSize: "1.2rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255, 165, 2, 0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(255, 165, 2, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 165, 2, 0.5)";
            }}
          >
            Change Color
          </button>
        </div>
      )}

      {/* ➡️ NEXT BUTTON */}
      {feedback === "correct" && (
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button 
            onClick={onNext}
            style={{
              background: "linear-gradient(135deg, #A55EEA, #1E90FF)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "16px 48px",
              fontSize: "1.2rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(165,94,234,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(165,94,234,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(165,94,234,0.5)";
            }}
          >
            {isLast ? "Finish" : "Next"}
          </button>

          <button 
            onClick={onChangeColor}
            style={{
              background: "linear-gradient(135deg, #FFA502, #FFB633)",
              color: "#fff",
              border: "none",
              borderRadius: 50,
              padding: "16px 48px",
              fontSize: "1.2rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(255, 165, 2, 0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(255, 165, 2, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 165, 2, 0.5)";
            }}
          >
            Change Color
          </button>
        </div>
      )}
    </div>
  );
}