import { useState } from "react";
import COLORS from "../data/colors";
import { resumeAudioContext } from "../utils/sounds";

export default function PickScreen({ usedColors, score, totalAnswered, onPick }) {
  const [pulsing, setPulsing] = useState(null);

  const handleClick = (color) => {
    resumeAudioContext();
    setPulsing(color.name);
    setTimeout(() => {
      setPulsing(null);
      onPick(color);
    }, 380);
  };

  return (
    <div
      style={{
        textAlign: "center",
        animation: "fadeIn 0.5s ease",
        width: "100%",
        maxWidth: 800,
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.9rem",
          marginBottom: 4,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        {usedColors.length} / {COLORS.length} na sagot
      </p>
      <h2
        style={{
          color: "#fff",
          fontSize: "clamp(1.4rem, 4vw, 2rem)",
          fontWeight: 800,
          margin: "0 0 32px",
        }}
      >
        Choose a Color!
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 24,
        }}
      >
        {COLORS.map((color) => {
          const used = usedColors.includes(color.name);
          const isPulsing = pulsing === color.name;

          return (
            <button
              key={color.name}
              disabled={used}
              onClick={() => !used && handleClick(color)}
              style={{
                background: used ? "rgba(255,255,255,0.05)" : color.bg,
                border: used
                  ? "2px solid rgba(255,255,255,0.1)"
                  : `3px solid ${color.light}`,
                borderRadius: 24,
                padding: "32px 16px",
                cursor: used ? "not-allowed" : "pointer",
                opacity: used ? 0.3 : 1,
                transition: "transform 0.15s, box-shadow 0.15s",
                boxShadow: used ? "none" : `0 8px 28px ${color.glow}`,
                transform: isPulsing ? "scale(1.15)" : "scale(1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
              onMouseEnter={(e) => {
                if (!used) {
                  e.currentTarget.style.transform = "scale(1.08) translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 20px 40px ${color.glow}`;
                }
              }}
              onMouseLeave={(e) => {
                if (!used) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = `0 8px 28px ${color.glow}`;
                }
              }}
            >
              <span style={{ fontSize: 48 }}>{used ? "✅" : color.emoji}</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem" }}>
                {color.name}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 32, color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
        Score:{" "}
        <span style={{ color: "#2ED573", fontWeight: 700, fontSize: "1.2rem" }}>{score}</span> /{" "}
        {totalAnswered}
      </div>
    </div>
  );
}