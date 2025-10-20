'use client';

import { GameState, MilestoneId } from '@/types/game';

const STORAGE_KEY = 'hanh-trinh-doc-lap-game-state';

// Default initial game state
export const DEFAULT_GAME_STATE: GameState = {
  currentMilestoneId: '1930',
  completedMilestones: [],
  scores: {},
  totalScore: 0,
  totalPlayTime: 0,
  achievements: [],
  lastPlayed: new Date().toISOString(),
  isFirstTime: true
};

// Load game state from localStorage
export function loadGameState(): GameState {
  if (typeof window === 'undefined') {
    return DEFAULT_GAME_STATE;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return DEFAULT_GAME_STATE;
    }

    const parsed = JSON.parse(saved) as GameState;
    return {
      ...DEFAULT_GAME_STATE,
      ...parsed,
      isFirstTime: false
    };
  } catch (error) {
    console.error('Error loading game state:', error);
    return DEFAULT_GAME_STATE;
  }
}

// Save game state to localStorage
export function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    state.lastPlayed = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
}

// Complete a milestone and update scores
export function completeMilestone(
  currentState: GameState,
  milestoneId: MilestoneId,
  score: number,
  playTime: number
): GameState {
  const newState: GameState = {
    ...currentState,
    scores: {
      ...currentState.scores,
      [milestoneId]: Math.max(currentState.scores[milestoneId] || 0, score)
    },
    totalPlayTime: currentState.totalPlayTime + playTime
  };

  // Add to completed milestones if not already there
  if (!newState.completedMilestones.includes(milestoneId)) {
    newState.completedMilestones = [...newState.completedMilestones, milestoneId];
  }

  // Calculate total score
  newState.totalScore = Object.values(newState.scores).reduce((sum, s) => sum + (s || 0), 0);

  // Update current milestone to next one
  const milestoneOrder: MilestoneId[] = ['1930', '1940', '1941', '1945-8', '1945-9'];
  const currentIndex = milestoneOrder.indexOf(milestoneId);
  if (currentIndex < milestoneOrder.length - 1) {
    newState.currentMilestoneId = milestoneOrder[currentIndex + 1];
  }

  // Check for achievements
  newState.achievements = checkAchievements(newState);

  saveGameState(newState);
  return newState;
}

// Reset game state
export function resetGameState(): GameState {
  const newState = { ...DEFAULT_GAME_STATE, isFirstTime: false };
  saveGameState(newState);
  return newState;
}

// Check and award achievements
function checkAchievements(state: GameState): string[] {
  const achievements: string[] = [...state.achievements];

  // First completion
  if (state.completedMilestones.length === 1 && !achievements.includes('first-complete')) {
    achievements.push('first-complete');
  }

  // Complete all milestones
  if (state.completedMilestones.length === 5 && !achievements.includes('all-complete')) {
    achievements.push('all-complete');
  }

  // Perfect score (550/550)
  if (state.totalScore === 550 && !achievements.includes('perfect-score')) {
    achievements.push('perfect-score');
  }

  // Speed runner (complete all in under 30 minutes)
  if (
    state.completedMilestones.length === 5 &&
    state.totalPlayTime < 1800 &&
    !achievements.includes('speed-runner')
  ) {
    achievements.push('speed-runner');
  }

  return achievements;
}

// Get achievement info
export function getAchievementInfo(achievementId: string): { name: string; description: string; icon: string } {
  const achievements: Record<string, { name: string; description: string; icon: string }> = {
    'first-complete': {
      name: 'Bước đầu tiên',
      description: 'Hoàn thành màn chơi đầu tiên',
      icon: '🌟'
    },
    'all-complete': {
      name: 'Hoàn thành hành trình',
      description: 'Hoàn thành tất cả 5 mốc lịch sử',
      icon: '🏆'
    },
    'perfect-score': {
      name: 'Điểm tuyệt đối',
      description: 'Đạt điểm tối đa 550/550',
      icon: '💯'
    },
    'speed-runner': {
      name: 'Tốc độ ánh sáng',
      description: 'Hoàn thành game trong dưới 30 phút',
      icon: '⚡'
    }
  };

  return achievements[achievementId] || { name: 'Unknown', description: '', icon: '❓' };
}
