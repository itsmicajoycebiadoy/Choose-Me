export default function ColorCard({ color, used, pulsing, onClick }) {
  return (
    <button
      disabled={used}
      onClick={() => !used && onClick(color)}
      style={{
        background:   used ? "rgba(255,255,255,0.05)" : color.bg,
        border:       used ? "2px solid rgba(255,255,255,0.1)" : `2px solid ${color.light}`,
        borderRadius: 20,
        padding:      "24px 12px",
        cursor:       used ? "not-allowed" : "pointer",
        opacity:      used ? 0.3 : 1,
        transition:   "transform 0.15s, box-shadow 0.15s",
        boxShadow:    used ? "none" : `0 8px 24px ${color.glow}`,
        transform:    pulsing ? "scale(1.15)" : "scale(1)",
        display:      "flex",
        flexDirection:"column",
        alignItems:   "center",
        gap:          8,
      }}
      onMouseEnter={(e) => {
        if (!used) {
          e.currentTarget.style.transform = "scale(1.08) translateY(-4px)";
          e.currentTarget.style.boxShadow = `0 16px 36px ${color.glow}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!used) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = `0 8px 24px ${color.glow}`;
        }
      }}
    >
      <span style={{ fontSize: 32 }}>{used ? "✅" : color.emoji}</span>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{color.name}</span>
    </button>
  );
}
