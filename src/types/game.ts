// Game Types for "Hành Trình Độc Lập"

export type MilestoneId = '1930' | '1940' | '1941' | '1945-8' | '1945-9' | '1954';

export type GameType = 'quiz' | 'image-match' | 'timeline-sort' | 'memory' | 'fill-blank' | 'wheel-fortune' | 'image-quiz';

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

// Image Quiz game types (đuổi hình bắt chữ)
export interface ImageQuizQuestion {
  imageUrl: string; // Path to historical image
  question: string; // Question about the image
  options: string[]; // 4 answer options
  correctAnswer: number; // index of correct option (0-3)
  explanation?: string;
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

// Wheel of Fortune game types
export interface WheelFortunePuzzle {
  phrase: string; // The phrase/sentence to guess (Vietnamese)
  category: string; // Category hint (e.g., "Khẩu hiệu", "Sự kiện lịch sử")
  hint?: string; // Optional additional hint
}

// Hint system for Wheel of Fortune
export interface HintOption {
  id: string;
  name: string;
  description: string;
  cost: number; // Cost in points
  icon: string;
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
  wheelFortune?: WheelFortunePuzzle;
  imageQuiz?: ImageQuizQuestion[];

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
  characterProgress: CharacterProgress; // Character evolution tracking
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

// Character Evolution System
export type CharacterLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CharacterStage {
  level: CharacterLevel;
  title: string;
  description: string;
  icon: string;
  imageUrl: string; // Path to character image in public folder
  milestone: MilestoneId | 'start' | 'complete';
  color: string; // Theme color for this stage
}

export interface CharacterProgress {
  currentLevel: CharacterLevel;
  unlockedLevels: CharacterLevel[];
}
