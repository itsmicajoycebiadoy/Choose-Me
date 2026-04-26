import TimerCircle from "../components/TimerCircle";
import ChoiceButton from "../components/ChoiceButton";

export default function QuestionScreen({ question, selectedColor, timer, chosen, feedback, onAnswer, onPause, onResume, isTimerRunning }) {
  // If timeout happened, show message but don't allow answers
  const isTimeout = feedback === "timeout";
  const answered = chosen !== null || isTimeout;
  
  return (
    <div style={{ width: "100%", maxWidth: 680, animation: "slideUp 0.4s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{
          background: selectedColor?.bg, color: "#fff", borderRadius: 50,
          padding: "6px 20px", fontWeight: 700, fontSize: "0.9rem",
          boxShadow: `0 4px 16px ${selectedColor?.glow}`,
        }}>{selectedColor?.emoji} {selectedColor?.name}</span>
      </div>
      <TimerCircle timer={timer} onPause={onPause} onResume={onResume} isRunning={isTimerRunning} />
      <div style={{
        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 20, padding: "24px", marginBottom: 20, backdropFilter: "blur(12px)",
      }}>
        <p style={{ color: "#fff", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 600, margin: 0, lineHeight: 1.5, textAlign: "center" }}>
          {question.question}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {question.choices.map((choice, i) => (
          <ChoiceButton 
            key={i} 
            choice={choice} 
            index={i} 
            chosen={chosen} 
            answer={question.answer} 
            feedback={feedback} 
            onAnswer={onAnswer}
            disabled={answered || isTimeout}
          />
        ))}
      </div>
      {feedback === "timeout" && (
        <div style={{ textAlign: "center", marginTop: 20, color: "#FFA502", fontWeight: 700, fontSize: "1.1rem", animation: "fadeIn 0.3s" }}>
          ⏰ Naubos na ang oras! Moving to next...
        </div>
      )}
    </div>
  );
}