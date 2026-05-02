import COLORS from "../data/colors";
import { resumeAudioContext } from "../utils/sounds";

export default function HomeScreen({ onStart }) {
  const handleStart = () => {
    resumeAudioContext();
    onStart();
  };

  return (
    <div style={{ textAlign: "center", animation: "fadeIn 0.6s ease" }}>
      <div style={{ fontSize: 72, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>🎨</div>
      <h1
        style={{
          fontSize: "clamp(2.5rem, 7vw, 4rem)",
          fontWeight: 900,
          color: "#fff",
          margin: 0,
          lineHeight: 1.1,
          textShadow: "0 0 60px rgba(165,94,234,0.6), 0 4px 20px rgba(0,0,0,0.3)",
          letterSpacing: "-2px",
          background: "linear-gradient(135deg, #fff 0%, #A55EEA 50%, #1E90FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Piliin Mo Ako!
      </h1>
      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          marginTop: 16,
          fontSize: "1.15rem",
          marginBottom: 40,
          fontWeight: 500,
        }}
      >
        Choose a Color and Answer the Question 🧠
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        {COLORS.map((c, i) => (
          <div
            key={c.name}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: c.bg,
              boxShadow: `0 8px 24px ${c.glow}`,
              animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      <button
        onClick={handleStart}
        style={{
          background: "linear-gradient(135deg, #A55EEA, #6C5CE7)",
          color: "#fff",
          border: "none",
          borderRadius: 50,
          padding: "18px 56px",
          fontSize: "1.3rem",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(165,94,234,0.5), inset 0 2px 0 rgba(255,255,255,0.2)",
          transition: "all 0.3s ease",
          letterSpacing: 1,
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05) translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 16px 48px rgba(165,94,234,0.6), inset 0 2px 0 rgba(255,255,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(165,94,234,0.5), inset 0 2px 0 rgba(255,255,255,0.2)";
        }}
      >
        Start! 🚀
      </button>
    </div>
  );
}
