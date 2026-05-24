import TimerCircle from "../components/TimerCircle";
import ChoiceButton from "../components/ChoiceButton";

export default function QuestionScreen({
  question,
  selectedColor,
  timer,
  chosen,
  feedback,
  onAnswer,
  onPause,
  onResume,
  isTimerRunning,
  fiftyChoices,
}) {
  const isTimeout = feedback === "timeout";
  const answered = chosen !== null || isTimeout;

  return (
    <div style={{ width: "100%", maxWidth: 680, animation: "slideUp 0.4s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <span
            style={{
              background: selectedColor?.bg,
              color: "#fff",
              borderRadius: 50,
              padding: "8px 24px",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: `0 8px 24px ${selectedColor?.glow}66`,
              border: "2px solid rgba(255,255,255,0.15)",
            }}
          >
            {selectedColor?.emoji} {selectedColor?.name}
          </span>

          {question?.category && (
            <span
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.9)",
                borderRadius: 50,
                padding: "8px 18px",
                fontWeight: 800,
                fontSize: "0.95rem",
                border: "1px solid rgba(255,255,255,0.16)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              🧩 {question.category}
            </span>
          )}
        </div>
      </div>
      <TimerCircle
        timer={timer}
        onPause={onPause}
        onResume={onResume}
        isRunning={isTimerRunning}
      />
      <div style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 24,
        padding: "28px",
        marginBottom: 24,
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}>
        <p style={{
          color: "#fff",
          fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
          fontWeight: 600,
          margin: 0,
          lineHeight: 1.6,
          textAlign: "center"
        }}>
          {question.question}
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(160px, 1fr))",
          gridAutoRows: "1fr",
          gap: 14,
          alignItems: "stretch",
          justifyItems: "stretch",
          width: "100%",
          minHeight: 220,
        }}
      >
        {question.choices.map((choice, i) => {
          const hidden = Array.isArray(fiftyChoices) && !fiftyChoices.includes(choice);

          return (
            <div
                key={i}
                style={{
                  display: hidden ? "none" : "flex",
                  height: "100%",
                  alignItems: "stretch",
                }}
              >
              <ChoiceButton
                choice={choice}
                index={i}
                chosen={chosen}
                answer={question.answer}
                feedback={feedback}
                onAnswer={onAnswer}
                disabled={answered}
              />
            </div>
          );
        })}
      </div>
      {isTimeout && (
        <div style={{
          textAlign: "center",
          marginTop: 24,
          color: "#FFA502",
          fontWeight: 700,
          fontSize: "1.15rem",
          animation: "fadeIn 0.3s",
          textShadow: "0 0 20px rgba(255,165,2,0.5)",
        }}>
          Times Up! Moving to next...
        </div>
      )}
    </div>
  );
}
