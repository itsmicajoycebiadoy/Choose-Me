import { resumeAudioContext } from "../utils/sounds";

const LABELS = ["A", "B", "C", "D"];

export default function ChoiceButton({ choice, index, chosen, answer, feedback, onAnswer, disabled }) {
  const answered = chosen !== null || feedback === "timeout" || disabled;
  
  const isTimeout = feedback === "timeout";
  
  let bg     = "rgba(255,255,255,0.08)";
  let border = "1px solid rgba(255,255,255,0.12)";
  let color  = "#fff";
  let boxShadow = "none";

  if (answered && !isTimeout) {
    if (choice === answer)       { bg = "rgba(46,213,115,0.15)";  border = "2px solid #2ED573"; color = "#2ED573"; boxShadow = "0 0 24px rgba(46,213,115,0.4)"; }
    else if (choice === chosen)  { bg = "rgba(255,71,87,0.15)";   border = "2px solid #FF4757"; color = "#FF6B81"; boxShadow = "0 0 24px rgba(255,71,87,0.4)"; }
  }

  const handleAnswer = () => {
    if (!answered) {
      resumeAudioContext();
      onAnswer(choice);
    }
  };

  return (
    <button
      onClick={handleAnswer}
      disabled={answered}
      style={{
        flex: 1,
        background:   bg,
        border,
        borderRadius: 16,
        width: "100%",
        minHeight: 94,
        padding:      "16px 14px",
        height: "100%",
        cursor:       answered ? "default" : "pointer",
        color,
        fontSize:     "clamp(0.9rem, 2.2vw, 1.05rem)",
        fontWeight:   600,
        transition:   "all 0.2s ease",
        textAlign:    "center",
        backdropFilter: "blur(12px)",
        boxShadow: boxShadow,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        boxSizing: "border-box",
      }}
      onMouseEnter={(e) => {
        if (!answered) {
          e.currentTarget.style.background = "rgba(255,255,255,0.14)";
          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)";
          e.currentTarget.style.transform  = "scale(1.02)";
        }
      }}
      onMouseLeave={(e) => {
        if (!answered) {
          e.currentTarget.style.background = bg;
          e.currentTarget.style.border = border;
          e.currentTarget.style.transform  = "scale(1)";
        }
      }}
    >
      <span style={{ display: "block", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>
        {LABELS[index]}
      </span>
      <span style={{ lineHeight: 1.1 }}>{choice}</span>
    </button>
  );
}
