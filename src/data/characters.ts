import { CharacterStage, CharacterLevel } from '@/types/game';

// Character evolution stages based on historical milestones
export const CHARACTER_STAGES: Record<CharacterLevel, CharacterStage> = {
  0: {
    level: 0,
    title: 'Khởi Đầu Hành Trình',
    description: 'Bắt đầu hành trình khám phá lịch sử cách mạng Việt Nam',
    icon: '🌱',
    imageUrl: '/characters/level-0.png',
    milestone: 'start',
    color: '#9CA3AF' // gray
  },
  1: {
    level: 1,
    title: 'Người Khởi Đầu',
    description: 'Thanh niên yêu nước, chứng kiến sự ra đời của Đảng (1930)',
    icon: '🏛️',
    imageUrl: '/characters/level-1.png',
    milestone: '1930',
    color: '#EF4444' // red
  },
  2: {
    level: 2,
    title: 'Chiến Sĩ Việt Minh',
    description: 'Gia nhập Mặt trận Việt Minh, sẵn sàng chiến đấu (1940-1941)',
    icon: '🚩',
    imageUrl: '/characters/level-2.png',
    milestone: '1941',
    color: '#F59E0B' // amber
  },
  3: {
    level: 3,
    title: 'Chiến Sĩ Tổng Khởi Nghĩa',
    description: 'Tham gia Cách mạng Tháng Tám, giành chính quyền (1945)',
    icon: '⚔️',
    imageUrl: '/characters/level-3.png',
    milestone: '1945-8',
    color: '#10B981' // green
  },
  4: {
    level: 4,
    title: 'Công Dân Nước Độc Lập',
    description: 'Chứng kiến Tuyên ngôn Độc lập, Việt Nam tự do (2/9/1945)',
    icon: '🇻🇳',
    imageUrl: '/characters/level-4.png',
    milestone: '1945-9',
    color: '#3B82F6' // blue
  },
  5: {
    level: 5,
    title: 'Chiến Sĩ Điện Biên',
    description: 'Tham gia chiến thắng lịch sử Điện Biên Phủ (1954)',
    icon: '🏔️',
    imageUrl: '/characters/level-5.png',
    milestone: '1954',
    color: '#F97316' // orange
  },
  6: {
    level: 6,
    title: 'Anh Hùng Dân Tộc',
    description: 'Hoàn thành hành trình lịch sử, trở thành anh hùng',
    icon: '🏆',
    imageUrl: '/characters/level-6.png',
    milestone: 'complete',
    color: '#8B5CF6' // purple
  }
};

// Get character stage by level
export function getCharacterStage(level: CharacterLevel): CharacterStage {
  return CHARACTER_STAGES[level];
}

// Get next character level based on completed milestones
export function getCharacterLevelFromMilestones(completedCount: number): CharacterLevel {
  // 0 milestones = level 0
  // 1 milestone = level 1
  // 2 milestones = level 2
  // 3 milestones = level 3
  // 4 milestones = level 4
  // 5 milestones = level 5
  // 6 milestones = level 6 (complete)
  return Math.min(completedCount, 6) as CharacterLevel;
}

// Check if can level up
export function canLevelUp(currentLevel: CharacterLevel, completedMilestones: number): boolean {
  const expectedLevel = getCharacterLevelFromMilestones(completedMilestones);
  return expectedLevel > currentLevel;
}
