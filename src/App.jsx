import { useState, useCallback } from "react";
import questions from "./data/questions";
import COLORS    from "./data/colors";
import { playSound } from "./utils/sounds";
import { useTimer } from "./hooks/useTimer";
import Confetti from "./components/Confetti";

import HomeScreen     from "./screens/HomeScreen";
import PickScreen     from "./screens/PickScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ResultScreen   from "./screens/ResultScreen";
import EndScreen      from "./screens/EndScreen";

// ─── Global styles ────────────────────────────────────────────────────────────
const globalStyles = `
  * { box-sizing: border-box; }
  button:focus { outline: none; }
  @keyframes fadeIn  { from { opacity: 0; transform: translateY(8px);  } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
`;

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase,         setPhase]         = useState("home");
  const [usedColors,    setUsedColors]    = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentQ,      setCurrentQ]      = useState(null);
  const [chosen,        setChosen]        = useState(null);
  const [feedback,      setFeedback]      = useState(null);
  const [score,         setScore]         = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showConfetti,  setShowConfetti]  = useState(false);
  const [usedQIds,      setUsedQIds]      = useState([]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  const handleExpire = useCallback(() => {
    if (chosen !== null || feedback !== null) return; // already answered
    setFeedback("timeout");
    playSound("timeout");
    setTotalAnswered((t) => t + 1);
    // Stay in question screen briefly then move to result
    setTimeout(() => setPhase("result"), 1800);
  }, [chosen, feedback]);

  const { timer, start: startTimer, stop: stopTimer, pause: pauseTimer, resume: resumeTimer, isRunning } = useTimer(5, handleExpire);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getRandomQuestion = useCallback((usedIds) => {
    const avail = questions.filter((q) => !usedIds.includes(q.id));
    const pool  = avail.length > 0 ? avail : questions;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleColorPick = (color) => {
    const q = getRandomQuestion(usedQIds);
    setCurrentQ(q);
    setUsedQIds((prev) => [...prev, q.id]);
    setSelectedColor(color);
    setChosen(null);
    setFeedback(null);
    setPhase("question");
    startTimer();
  };

  const handleAnswer = (choice) => {
    if (chosen !== null || feedback !== null) return;
    stopTimer();
    setChosen(choice);
    const isCorrect = choice === currentQ.answer;
    setFeedback(isCorrect ? "correct" : "wrong");
    setTotalAnswered((t) => t + 1);
    if (isCorrect) {
      setScore((s) => s + 1);
      playSound("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      playSound("error");
    }
    setTimeout(() => setPhase("result"), 2000);
  };

  const handleNext = () => {
    const newUsed = [...usedColors, selectedColor.name];
    setUsedColors(newUsed);
    setChosen(null);
    setFeedback(null);
    setCurrentQ(null);
    setSelectedColor(null);
    setPhase(newUsed.length >= COLORS.length ? "end" : "pick");
  };

  const resetGame = () => {
    stopTimer();
    setPhase("home");
    setUsedColors([]);
    setSelectedColor(null);
    setCurrentQ(null);
    setChosen(null);
    setFeedback(null);
    setScore(0);
    setTotalAnswered(0);
    setUsedQIds([]);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight:      "100vh",
      background:     "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily:     "'Segoe UI', sans-serif",
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "16px",
      boxSizing:      "border-box",
      position:       "relative",
      overflow:       "hidden",
    }}>
      <style>{globalStyles}</style>

      {/* Ambient circles */}
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(165,94,234,0.12), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,144,255,0.12), transparent 70%)", pointerEvents: "none" }} />

      {showConfetti && <Confetti />}

      {phase === "home"     && <HomeScreen onStart={() => setPhase("pick")} />}
      {phase === "pick"     && <PickScreen usedColors={usedColors} score={score} totalAnswered={totalAnswered} onPick={handleColorPick} />}
      {phase === "question" && currentQ && <QuestionScreen 
          question={currentQ} 
          selectedColor={selectedColor} 
          timer={timer} 
          chosen={chosen} 
          feedback={feedback} 
          onAnswer={handleAnswer}
          onPause={pauseTimer}
          onResume={resumeTimer}
          isTimerRunning={isRunning}
      />}
      {phase === "result"   && currentQ && <ResultScreen question={currentQ} feedback={feedback} score={score} totalAnswered={totalAnswered} usedColors={usedColors} onNext={handleNext} />}
      {phase === "end"      && <EndScreen score={score} totalAnswered={totalAnswered} onReset={resetGame} />}
    </div>
  );
}