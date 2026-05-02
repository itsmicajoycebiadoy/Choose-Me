# 🎯 Piliin Mo Ako - Color Quiz Game

A fun and interactive Filipino quiz game where players answer general knowledge questions while racing against the clock! Choose the correct color that matches the answer to each trivia question.

## 📱 Features

- **Interactive Quiz Game** - Answer trivia questions about general knowledge
- **Timer Challenge** - Race against a 10-second countdown
- **Multiple Color Rounds** - Play through all available colors
- **Scoring System** - Track your correct answers
- **Sound Effects** - Audio feedback for correct/wrong answers
- **Background Music** - Ambient music during gameplay
- **Confetti Celebration** - Celebrate correct answers with confetti!
- **Tailwind CSS** - Modern, responsive UI styling

## 🛠️ Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Web Audio API** - Sound effects and music

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd piliin-mo-ako
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🎮 How to Play

1. **Start Game** - Click "Start" on the home screen
2. **Pick a Color** - Choose which color you'd like to answer questions for
3. **Answer Questions** - Read the trivia question and select the correct answer
4. **Beat the Timer** - You have 10 seconds to answer each question
5. **Progress** - Move to the next color after each correct answer
6. **Finish** - Complete all colors to see your final score!

## 📁 Project Structure

```
piliin-mo-ako/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ChoiceButton.jsx
│   │   ├── ColorCard.jsx
│   │   ├── Confetti.jsx
│   │   └── TimerCircle.jsx
│   ├── data/          # Game data
│   │   ├── colors.js   # Available colors
│   │   └── questions.js # Quiz questions
│   ├── hooks/         # Custom React hooks
│   │   └── useTimer.js
│   ├── screens/       # Screen components
│   │   ├── EndScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── PickScreen.jsx
│   │   ├── QuestionScreen.jsx
│   │   └── ResultScreen.jsx
│   ├── utils/         # Utility functions
│   │   └── sounds.js  # Audio functions
│   ├── App.jsx        # Main app component
│   ├── index.css     # Global styles
│   └── main.jsx      # Entry point
├── index.html
├── package.json
├── vite.config.js
└── postcss.config.js
```

## 🎵 Sound Effects

- **Correct Answer** - Celebration clap sounds
- **Wrong Answer** - Error buzzer
- **Timer Tick** - Clock ticking
- **Timeout** - Time's up sound
- **Background Music** - Ambient melody (plays during pick, question, and result phases)

## 📝 Available Colors

The game includes 8 colors:
- Pula (Red)
- Dilaw (Yellow)
- Asul (Blue)
- Berde (Green)
- Lila (Purple)
- Orange (Orange)
- Pink (Pink)
- Itim (Black)

## 📝 Quiz Categories

The game includes trivia questions covering:
- Communication research
- Personality types
- Project management
- General knowledge

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with PostCSS. Configuration files:
- `postcss.config.js` - PostCSS configuration
- `src/index.css` - Tailwind imports

### Timer Duration

Default timer is set to 10 seconds. Can be modified in `App.jsx`:
```javascript
const { timer, start: startTimer, ... } = useTimer(10, handleExpire);
```

## 📄 License

This project is for educational purposes.

