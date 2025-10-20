// Game Types for "Hành Trình Độc Lập"

export type MilestoneId = '1930' | '1940' | '1941' | '1945-8' | '1945-9';

export type GameType = 'quiz' | 'image-match' | 'timeline-sort' | 'memory' | 'fill-blank';

// Quiz game types
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
  explanation?: string;
}

// Image Match game types
export interface ImagePair {
  imageUrl: string;
  text: string;
  id: string;
}

// Timeline Sort game types
export interface TimelineEvent {
  id: string;
  text: string;
  correctOrder: number; // 0-based index
}

// Memory Match game types
export interface MemoryCard {
  id: string;
  content: string; // text or emoji
  pairId: string; // cards with same pairId are a match
}

// Fill Blanks game types
export interface FillBlank {
  text: string; // text with [blank] markers
  blanks: string[]; // correct answers for each blank
  wordBank: string[]; // available words to choose from
}

// Main Milestone interface
export interface Milestone {
  id: MilestoneId;
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  gameType: GameType;
  maxScore: number;
  requiredScore: number;
  timeLimit: number | null; // seconds, null = no limit

  // Game content (only one will be populated based on gameType)
  questions?: QuizQuestion[];
  pairs?: ImagePair[];
  timeline?: TimelineEvent[];
  cards?: MemoryCard[];
  fillBlanks?: FillBlank;

  // Historical information
  infoTitle: string;
  infoText: string;
  infoImage?: string;

  // UI
  icon: string;
  backgroundImage?: string;
}

// Game State
export interface GameState {
  currentMilestoneId: MilestoneId;
  completedMilestones: MilestoneId[];
  scores: Partial<Record<MilestoneId, number>>;
  totalScore: number;
  totalPlayTime: number; // seconds
  achievements: string[];
  lastPlayed: string; // ISO date string
  isFirstTime: boolean;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (state: GameState) => boolean;
}

// Game session (current play)
export interface GameSession {
  milestoneId: MilestoneId;
  startTime: number;
  currentScore: number;
  attempts: number;
}
