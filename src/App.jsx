import { useState, useCallback, useEffect } from "react";
import questions from "./data/questions";
import COLORS from "./data/colors";
import { playSound, toggleBackgroundMusic } from "./utils/sounds";
import { useTimer } from "./hooks/useTimer";
import Confetti from "./components/Confetti";
import AnimatedBackground from "./components/AnimatedBackground";

import HomeScreen from "./screens/HomeScreen";
import PickScreen from "./screens/PickScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ResultScreen from "./screens/ResultScreen";
import EndScreen from "./screens/EndScreen";
import PowerUpBar from "./components/PowerUpBar";
import SideChatBot from "./components/SideChatBot";


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

  // 🎯 Streak / Combo
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  void streak;
  void bestStreak;

  // 🪄 50/50 power-up: once per game, hide 2 wrong choices
  const [fiftyChoices, setFiftyChoices] = useState(null);
  const [usedFifty, setUsedFifty] = useState(false);

  // 🎵 BACKGROUND MUSIC
  useEffect(() => {
    if (phase === "pick" || phase === "question" || phase === "result") {
      toggleBackgroundMusic(true);
    } else {
      toggleBackgroundMusic(false);
    }
  }, [phase]);

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
  } = useTimer(10, handleExpire);


  // 🎨 PICK COLOR
  const handleColorPick = (color) => {
    const q = getRandomQuestion(usedQIds);

    setCurrentQ(q);
    setSelectedColor(color);
    setChosen(null);
    setFeedback(null);

    // reset power-up state for new question
    setFiftyChoices(null);
    setUsedFifty(false);

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

      setTotalAnswered((t) => t + 1);

      // 🎯 streak combo + bonus at streak 3+
      setStreak((prevStreak) => {
        const next = prevStreak + 1;
        setBestStreak((b) => Math.max(b, next));
        const bonus = next >= 3 ? 1 : 0;
        setScore((s) => s + 1 + bonus);
        return next;
      });

      // use current streak in UI state wiring
      playSound("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      playSound("error");
      setStreak(0);
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
    // Change Color after wrong answer.
    // The color buttons must become clickable again, so we clear selectedColor
    // and ensure current question retry state still works.
    stopTimer();
    setChosen(null);
    setFeedback(null);
    setSelectedColor(null);

    // Keep currentQ so the user is effectively retrying the same question.
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
    setStreak(0);
    setBestStreak(0);
    setFiftyChoices(null);
    setUsedFifty(false);
  };

return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", position: "relative" }}>
      <AnimatedBackground />
      
      {showConfetti && <Confetti />}

      <SideChatBot />

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
        <>
          <PowerUpBar
            onUseFifty={() => {
              if (!currentQ || usedFifty) return;

              // Keep the correct answer + pick one wrong to keep (hide others)
              const correct = currentQ.answer;
              const wrongs = currentQ.choices.filter((c) => c !== correct);
              const keepWrong = wrongs[Math.floor(Math.random() * wrongs.length)];

              setFiftyChoices([correct, keepWrong]);
              setUsedFifty(true);
            }}
            canUseFifty={!!currentQ && !usedFifty}
            usedFifty={usedFifty}
          />

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
            fiftyChoices={fiftyChoices}
          />
        </>
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