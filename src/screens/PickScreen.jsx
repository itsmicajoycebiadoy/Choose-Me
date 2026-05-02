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
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.9rem",
          marginBottom: 8,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {usedColors.length} / {COLORS.length} na sagot
      </p>
      <h2
        style={{
          color: "#fff",
          fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
          fontWeight: 800,
          margin: "0 0 36px",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        Choose a Color!
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 20,
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
                background: used ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: used
                  ? "2px solid rgba(255,255,255,0.08)"
                  : `2px solid ${color.light}66`,
                borderRadius: 24,
                padding: "36px 20px",
                cursor: used ? "not-allowed" : "pointer",
                opacity: used ? 0.25 : 1,
                transition: "all 0.2s ease",
                boxShadow: used ? "none" : `0 12px 40px ${color.glow}44`,
                transform: isPulsing ? "scale(1.12)" : "scale(1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
              onMouseEnter={(e) => {
                if (!used) {
                  e.currentTarget.style.transform = "scale(1.05) translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 24px 48px ${color.glow}66`;
                  e.currentTarget.style.border = `2px solid ${color.light}`;
                }
              }}
              onMouseLeave={(e) => {
                if (!used) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = `0 12px 40px ${color.glow}44`;
                  e.currentTarget.style.border = `2px solid ${color.light}66`;
                }
              }}
            >
              <span style={{ fontSize: 52, filter: used ? "grayscale(100%)" : "none" }}>{used ? "✅" : color.emoji}</span>
              <span style={{ color: used ? "rgba(255,255,255,0.4)" : "#fff", fontWeight: 700, fontSize: "1.25rem" }}>
                {color.name}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 36, color: "rgba(255,255,255,0.5)", fontSize: "1rem", fontWeight: 500 }}>
        Score:{" "}
        <span style={{ color: "#2ED573", fontWeight: 700, fontSize: "1.3rem", textShadow: "0 0 20px rgba(46,213,115,0.5)" }}>{score}</span> /{" "}
        {totalAnswered}
      </div>
    </div>
  );
}
