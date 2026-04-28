import COLORS from "../data/colors";
import { resumeAudioContext } from "../utils/sounds";

export default function HomeScreen({ onStart }) {
  const handleStart = () => {
    resumeAudioContext();
    onStart();
  };

  return (
    <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
      <div style={{ fontSize: 64, marginBottom: 8 }}>🎨</div>
      <h1
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 900,
          color: "#fff",
          margin: 0,
          lineHeight: 1.1,
          textShadow: "0 0 40px rgba(165,94,234,0.8)",
          letterSpacing: "-1px",
        }}
      >
        Piliin Mo Ako!
      </h1>
      <p
        style={{
          color: "rgba(255,255,255,0.6)",
          marginTop: 12,
          fontSize: "1.1rem",
          marginBottom: 36,
        }}
      >
        Choose a Color and Answer the Question 🧠
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        {COLORS.map((c) => (
          <div
            key={c.name}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: c.bg,
              boxShadow: `0 0 18px ${c.glow}`,
            }}
          />
        ))}
      </div>

      <button
        onClick={handleStart}
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
          letterSpacing: 1,
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
        Start!
      </button>
    </div>
  );
}