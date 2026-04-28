import { useState, useCallback } from "react";
import questions from "./data/questions";
import COLORS from "./data/colors";
import { playSound } from "./utils/sounds";
import { useTimer } from "./hooks/useTimer";
import Confetti from "./components/Confetti";

import HomeScreen from "./screens/HomeScreen";
import PickScreen from "./screens/PickScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ResultScreen from "./screens/ResultScreen";
import EndScreen from "./screens/EndScreen";

export default function App() {
  const [phase, setPhase] = useState("home");
  const [usedColors, setUsedColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [usedQIds, setUsedQIds] = useState([]);

  // 🎯 RANDOM QUESTION
  const getRandomQuestion = useCallback((usedIds) => {
    const available = questions.filter((q) => !usedIds.includes(q.id));
    const pool = available.length > 0 ? available : questions;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  // ⏰ TIMER EXPIRE
  const handleExpire = useCallback(() => {
    if (chosen !== null || feedback !== null) return;

    setFeedback("timeout");
    playSound("timeout");

    // ❌ DO NOT mark as used
    setTimeout(() => setPhase("result"), 1500);
  }, [chosen, feedback]);

  const {
    timer,
    start: startTimer,
    stop: stopTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    isRunning,
  } = useTimer(5, handleExpire);

  // 🎨 PICK COLOR
  const handleColorPick = (color) => {
    const q = getRandomQuestion(usedQIds);

    setCurrentQ(q);
    setSelectedColor(color);
    setChosen(null);
    setFeedback(null);

    setPhase("question");
    startTimer();
  };

  // ✅ ANSWER (FIXED)
  const handleAnswer = (choice) => {
    if (chosen !== null || feedback !== null) return;

    stopTimer();
    setChosen(choice);

    const isCorrect = choice === currentQ.answer;
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      // ✅ mark used ONLY when correct
      setUsedQIds((prev) => [...prev, currentQ.id]);

      setScore((s) => s + 1);
      setTotalAnswered((t) => t + 1);

      playSound("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      playSound("error");
    }

    setTimeout(() => setPhase("result"), 1800);
  };

  // 🔁 RETRY SAME QUESTION
  const handleRetry = () => {
    setChosen(null);
    setFeedback(null);
    setPhase("question");
    startTimer();
  };

  // ➡️ NEXT COLOR
  const handleNext = () => {
    const newUsed = [...usedColors, selectedColor.name];

    setUsedColors(newUsed);
    setChosen(null);
    setFeedback(null);
    setCurrentQ(null);
    setSelectedColor(null);

    setPhase(newUsed.length >= COLORS.length ? "end" : "pick");
  };

  // 🎨 CHANGE COLOR
  const handleChangeColor = () => {
    stopTimer();
    setChosen(null);
    setFeedback(null);
    setCurrentQ(null);
    setSelectedColor(null);
    setPhase("pick");
  };

  // 🔄 RESET GAME
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

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--bg)" }}>
      
      {showConfetti && <Confetti />}

      {phase === "home" && <HomeScreen onStart={() => setPhase("pick")} />}

      {phase === "pick" && (
        <PickScreen
          usedColors={usedColors}
          score={score}
          totalAnswered={totalAnswered}
          onPick={handleColorPick}
        />
      )}

      {phase === "question" && currentQ && (
        <QuestionScreen
          question={currentQ}
          selectedColor={selectedColor}
          timer={timer}
          chosen={chosen}
          feedback={feedback}
          onAnswer={handleAnswer}
          onPause={pauseTimer}
          onResume={resumeTimer}
          isTimerRunning={isRunning}
        />
      )}

      {phase === "result" && currentQ && (
        <ResultScreen
          question={currentQ}
          feedback={feedback}
          score={score}
          totalAnswered={totalAnswered}
          usedColors={usedColors}
          onNext={handleNext}
          onRetry={handleRetry}
          onChangeColor={handleChangeColor}
        />
      )}

      {phase === "end" && (
        <EndScreen
          score={score}
          totalAnswered={totalAnswered}
          onReset={resetGame}
        />
      )}
    </div>
  );
}