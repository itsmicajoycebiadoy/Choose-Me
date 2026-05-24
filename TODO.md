# TODO - Responsive + Icon/Color Consistency

## Plan summary
- Replace scattered hard-coded colors/icon emojis with a single source of truth from `src/data/colors.js`.
- Fix responsiveness by adding consistent layout containers and responsive grid behavior for question choices.
- Improve mobile friendliness for the fixed-position SideChatBot.
- Ensure buttons/timer/card sizing scales across mobile/tablet/desktop.

## Steps
1. Define shared UI theme helpers/constants (colors for correct/wrong/timeout, gradients, icon styles).
2. Update `ChoiceButton`, `TimerCircle`, `QuestionScreen`, `PickScreen`, `ResultScreen`, `EndScreen`, `PowerUpBar`, `SideChatBot`, and `ColorCard` to use shared theme values.
3. Fix responsiveness: 
   - Question choices grid should become 1 column on small screens.
   - Ensure containers use padding + min-height to avoid overflow.
   - Constrain fixed elements (chat) for small widths.
4. Add/adjust CSS in `src/index.css` (media queries + reusable classes) if needed.
5. Run build/lint checks.

