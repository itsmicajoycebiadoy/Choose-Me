import { resumeAudioContext } from "../utils/sounds";

const LABELS = ["A", "B", "C", "D"];

export default function ChoiceButton({ choice, index, chosen, answer, feedback, onAnswer, disabled }) {
  const answered = chosen !== null || feedback === "timeout" || disabled;
  
  const isTimeout = feedback === "timeout";
  
  let bg     = "rgba(255,255,255,0.07)";
  let border = "1px solid rgba(255,255,255,0.15)";
  let color  = "#fff";

  if (answered && !isTimeout) {
    if (choice === answer)       { bg = "rgba(46,213,115,0.2)";  border = "2px solid #2ED573"; }
    else if (choice === chosen)  { bg = "rgba(255,71,87,0.2)";   border = "2px solid #FF4757"; color = "#FF6B81"; }
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
        background:   bg,
        border,
        borderRadius: 14,
        padding:      "16px",
        cursor:       answered ? "default" : "pointer",
        color,
        fontSize:     "clamp(0.85rem, 2vw, 1rem)",
        fontWeight:   600,
        transition:   "all 0.2s",
        textAlign:    "center",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        if (!answered) {
          e.currentTarget.style.background = "rgba(255,255,255,0.14)";
          e.currentTarget.style.transform  = "scale(1.03)";
        }
      }}
      onMouseLeave={(e) => {
        if (!answered) {
          e.currentTarget.style.background = bg;
          e.currentTarget.style.transform  = "scale(1)";
        }
      }}
    >
      <span style={{ display: "block", fontSize: "1.4rem", marginBottom: 4 }}>
        {LABELS[index]}
      </span>
      {choice}
    </button>
  );
}