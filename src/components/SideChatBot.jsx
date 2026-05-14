import { useEffect, useMemo, useRef, useState } from "react";

function formatTime(d) {
  try {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

// Simple local "AI" placeholder: no external API.
function buildBotAnswer(userText) {
  const text = String(userText || "").trim().toLowerCase();
  if (!text) return "Type a question to ask.";

  const rules = [
    {
      match: /(how|paano|guide|instructions|help)/,
      answer:
        "Piliin Mo Ako: Pick a color, then answer the question. Click your choice to answer. If time runs out, you’ll see the result and can proceed to the next color.",
    },
    {
      match: /(timer|time|seconds|expire|timeout)/,
      answer:
        "The timer limits your answer. If it reaches 0, you’ll get a timeout result and move to the next phase.",
    },
    {
      match: /(50|50\/50|fifty|power up|power-up|remove)/,
      answer:
        "Power-up (50/50) will hide 2 wrong choices (keeping the correct one + one wrong). Use it once per question.",
    },
    {
      match: /(score|points|streak|combo|best)/,
      answer:
        "Correct answers add to your score. Streak/combos can give extra bonus points—so try to answer correctly multiple times in a row.",
    },
    {
      match: /(rules|game|play|how to play)/,
      answer:
        "How to play: Choose a color → answer the question → see result → continue until the game ends. Use power-ups if available.",
    },
    {
      match: /(hello|hi|hey|kumusta|yo)/,
      answer: "Hi! Ask me anything about how to play.",
    },
  ];

  const hit = rules.find((r) => r.match.test(text));
  if (hit) return hit.answer;

  return "I’m a local helper bot for this app. Try asking about: rules, timer, score/streak, or the 50/50 power-up.";
}

export default function SideChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => []);

  useEffect(() => {
    // Add a greeting only after first open (chatgpt-like: user drives the conversation).
    if (!open) return;

    setMessages((prev) => {
      if (prev.length > 0) return prev;
      const now = new Date();
      return [
        {
          id: crypto?.randomUUID ? crypto.randomUUID() : String(now.getTime()),
          role: "bot",
          text: "Hi! Ask me anything about the game (rules, timer, score, 50/50 power-up).",
          time: formatTime(now),
        },
      ];
    });
  }, [open]);

  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [messages, open]);

  const quickSuggestions = useMemo(
    () => [
      "How do I play?",
      "What does the timer do?",
      "What is 50/50 power-up?",
      "How is the score calculated?",
    ],
    []
  );

  const hasMessages = messages.length > 0;

  const send = (text) => {
    const trimmed = String(text || "").trim();
    if (!trimmed) return;

    const now = new Date();
    const userMsg = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(now.getTime()),
      role: "user",
      text: trimmed,
      time: formatTime(now),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate "thinking"
    const t = setTimeout(() => {
      const botMsg = {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(now.getTime() + 1),
        role: "bot",
        text: buildBotAnswer(trimmed),
        time: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 450);

    return () => clearTimeout(t);
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 5,
        pointerEvents: "auto",
      }}
    >
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.16)",
            background:
              "radial-gradient(circle at 30% 30%, rgba(165,94,234,0.35), rgba(30,144,255,0.18))",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
          aria-label="Open chat"
          title="Ask the bot"
        >
          🤖
        </button>
      )}

      {open && (
        <div
          style={{
            position: "relative",
            marginRight: -4,
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(15,12,41,0.55)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            overflow: "hidden",
            width: 320,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, rgba(165,94,234,0.25), rgba(30,144,255,0.18))",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 900, lineHeight: 1.1 }}>
                  Help Bot
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 2 }}>
                  Ask about the game
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                color: "rgba(255,255,255,0.75)",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
              }}
              aria-label="Close chat"
              title="Close"
            >
              ×
            </button>
          </div>

          <div
            ref={scrollerRef}
            style={{
              maxHeight: 360,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {!hasMessages && (
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 13,
                  lineHeight: 1.5,
                  padding: 10,
                  textAlign: "center",
                }}
              >
                Type a question and press <b>Send</b>.
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "90%",
                    padding: "10px 12px",
                    borderRadius: 16,
                    background:
                      m.role === "user"
                        ? "rgba(165,94,234,0.28)"
                        : "rgba(255,255,255,0.06)",
                    border:
                      m.role === "user"
                        ? "1px solid rgba(165,94,234,0.35)"
                        : "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.92)",
                    fontWeight: 600,
                    fontSize: 13,
                    lineHeight: 1.35,
                  }}
                >
                  {m.text}
                  {m.time && (
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 4 }}>
                      {m.time}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
              {quickSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    borderRadius: 999,
                    padding: "8px 10px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.85)",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send(input);
                }}
                placeholder="Ask a question..."
                style={{
                  flex: 1,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  padding: "10px 12px",
                  outline: "none",
                  fontWeight: 600,
                }}
              />
              <button
                onClick={() => send(input)}
                style={{
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "linear-gradient(135deg, rgba(165,94,234,0.7), rgba(30,144,255,0.55))",
                  color: "#fff",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontWeight: 900,
                }}
              >
                Send
              </button>
            </div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, marginTop: 8 }}>
              Local demo bot (no internet / no API).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

