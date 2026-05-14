const questions = [
  {
    id: 1,
    category: "Communication",
    question:
      "According to research, what percentage of meaning in face-to-face communication comes from the actual words spoken?",
    choices: ["50%", "35%", "7%", "20%"],
    answer: "7%",
    explanation:
      "Only 7% of meaning comes from words in face-to-face communication (35% tone, 58% body language).",
    difficulty: "Easy",
  },
  {
    id: 2,
    category: "Personality",
    question:
      "What personality type prefers understanding the \"big picture\" over receiving step-by-step details?",
    choices: ["Introverts", "Sensing people", "Intuitive people", "Judging people"],
    answer: "Intuitive people",
    explanation:
      "Intuitive people like to understand the big picture, while sensing people need step-by-step details.",
    difficulty: "Easy",
  },
  {
    id: 3,
    category: "IT / Projects",
    question: "What is the number one reason IT projects fail?",
    choices: ["Lack of budget", "Poor communication", "Technical errors", "Tight deadlines"],
    answer: "Poor communication",
    explanation:
      "Not technical errors, but communication failure is the #1 reason projects fail.",
    difficulty: "Easy",
  },
  {
    id: 4,
    category: "IT / Projects",
    question: "About how much of a project manager's time is spent communicating?",
    choices: ["30%", "50%", "70%", "90%"],
    answer: "90%",
    explanation: "Project managers spend up to 90% of their time communicating.",
    difficulty: "Medium",
  },
  {
    id: 5,
    category: "Communication",
    question: "What is the largest percentage of communication in a face-to-face interaction?",
    choices: [
      "Words spoken (7%)",
      "Tone of voice (35%)",
      "Body language (58%)",
      "Written notes (10%)",
    ],
    answer: "Body language (58%)",
    explanation:
      "Research shows that more than half of face-to-face communication is conveyed through body language.",
    difficulty: "Medium",
  },

  {
    id: 6,
    category: "Technology",
    question: "Which data structure works on a FIFO principle?",
    choices: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    explanation: "FIFO means First In, First Out—queues follow that order.",
    difficulty: "Easy",
  },
  {
    id: 7,
    category: "Technology",
    question: "In JavaScript, which keyword is used to declare a constant variable?",
    choices: ["var", "let", "const", "define"],
    answer: "const",
    explanation: "const declares variables that cannot be reassigned.",
    difficulty: "Easy",
  },
  {
    id: 8,
    category: "Communication",
    question: "Active listening mainly involves:",
    choices: ["Waiting to respond", "Hearing without feedback", "Reflecting and confirming", "Talking more than listening"],
    answer: "Reflecting and confirming",
    explanation:
      "Active listening includes reflecting back what you heard and confirming understanding.",
    difficulty: "Medium",
  },
  {
    id: 9,
    category: "Projects",
    question: "Which is typically a risk of poor project communication?",
    choices: ["Better scope control", "Fewer misunderstandings", "Wrong expectations", "Clearer requirements"],
    answer: "Wrong expectations",
    explanation:
      "When communication is weak, teams often build the wrong thing because expectations aren’t aligned.",
    difficulty: "Medium",
  },
  {
    id: 10,
    category: "General Knowledge",
    question: "What is the capital of the Philippines?",
    choices: ["Cebu City", "Davao City", "Manila", "Baguio City"],
    answer: "Manila",
    explanation: "Manila is the capital city of the Philippines.",
    difficulty: "Easy",
  },

  {
    id: 11,
    category: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    explanation: "Mars appears reddish due to iron oxide (rust) on its surface.",
    difficulty: "Easy",
  },
  {
    id: 12,
    category: "Science",
    question: "What gas do humans primarily breathe in?",
    choices: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"],
    answer: "Oxygen",
    explanation: "Humans primarily breathe in oxygen for respiration.",
    difficulty: "Easy",
  },
  {
    id: 13,
    category: "Science",
    question: "Water boils at what temperature (at sea level)?",
    choices: ["90°C", "95°C", "100°C", "105°C"],
    answer: "100°C",
    explanation: "At sea level, water boils at 100°C.",
    difficulty: "Easy",
  },
  {
    id: 14,
    category: "Technology",
    question: "Which of these best describes an API?",
    choices: ["A type of database", "A way for software to communicate", "A programming language", "A computer virus"],
    answer: "A way for software to communicate",
    explanation:
      "An API (Application Programming Interface) enables communication between software systems.",
    difficulty: "Easy",
  },
  {
    id: 15,
    category: "Projects",
    question:
      "In project management, the term \"scope\" most closely refers to:",

    choices: ["Budget limits", "The work that must be done", "Team availability", "The project schedule only"],
    answer: "The work that must be done",
    explanation:
      "Scope is the definition of what is included (and excluded) in the project work.",
    difficulty: "Medium",
  },

  {
    id: 16,
    category: "Communication",
    question: "A good meeting agenda usually helps by:",
    choices: ["Increasing confusion", "Keeping discussions focused", "Removing decision making", "Avoiding time limits"],
    answer: "Keeping discussions focused",
    explanation: "Agendas structure the meeting and keep it aligned with goals.",
    difficulty: "Medium",
  },
  {
    id: 17,
    category: "Technology",
    question: "Which of the following is a typical HTTP method used to fetch data?",
    choices: ["POST", "GET", "DELETE", "PUT"],
    answer: "GET",
    explanation: "GET is commonly used to retrieve/read data.",
    difficulty: "Easy",
  },
  {
    id: 18,
    category: "General Knowledge",
    question: "How many continents are there on Earth (commonly taught)?",
    choices: ["5", "6", "7", "8"],
    answer: "7",
    explanation: "A common model divides Earth into 7 continents.",
    difficulty: "Easy",
  },
  {
    id: 19,
    category: "General Knowledge",
    question: "Which instrument is used to measure temperature?",
    choices: ["Barometer", "Thermometer", "Speedometer", "Hygrometer"],
    answer: "Thermometer",
    explanation: "A thermometer measures temperature.",
    difficulty: "Easy",
  },
  {
    id: 20,
    category: "Projects",
    question: "A simple way to reduce bugs in software is:",
    choices: ["Skip testing", "Write tests", "Avoid code reviews", "Increase complexity"],
    answer: "Write tests",
    explanation:
      "Testing (including unit tests) helps catch issues earlier and improve reliability.",
    difficulty: "Medium",
  },
];

export default questions;

