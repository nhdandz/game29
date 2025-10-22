'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadGameState, getAchievementInfo } from '@/lib/gameStorage';
import type { GameState } from '@/types/game';

const ALL_ACHIEVEMENTS = [
  'first-complete',
  'all-complete',
  'perfect-score',
  'speed-runner'
];

export default function AchievementsPage() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const state = loadGameState();
    setGameState(state);
  }, []);

  if (!gameState) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-red-600 via-yellow-500 to-red-700 flex flex-col">
      <div className="flex-1 overflow-y-auto py-4 md:py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-lg font-medium transition-colors">
              ← Trang chủ
            </button>
          </Link>
        </div>

        {/* Title */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Thành tích</h1>
          <p className="text-gray-600">
            Bạn đã mở khóa {gameState.achievements.length}/{ALL_ACHIEVEMENTS.length} huy hiệu
          </p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(gameState.achievements.length / ALL_ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm text-gray-600 mb-1">Tổng điểm</div>
            <div className="text-2xl font-bold text-gray-800">{gameState.totalScore}/550</div>
          </div>
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-sm text-gray-600 mb-1">Hoàn thành</div>
            <div className="text-2xl font-bold text-gray-800">{gameState.completedMilestones.length}/5</div>
          </div>
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-600 mb-1">Thời gian</div>
            <div className="text-2xl font-bold text-gray-800">
              {Math.floor(gameState.totalPlayTime / 60)}m
            </div>
          </div>
        </div>

        {/* Achievements List */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tất cả huy hiệu</h2>
          <div className="space-y-4">
            {ALL_ACHIEVEMENTS.map((achievementId) => {
              const achievement = getAchievementInfo(achievementId);
              const isUnlocked = gameState.achievements.includes(achievementId);

              return (
                <div
                  key={achievementId}
                  className={`
                    rounded-xl p-6 transition-all
                    ${isUnlocked
                      ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 shadow-lg'
                      : 'bg-gray-100 border-2 border-gray-300 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-5xl ${!isUnlocked && 'grayscale opacity-50'}`}>
                      {isUnlocked ? achievement.icon : '🔒'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {achievement.name}
                        </h3>
                        {isUnlocked && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            ✓ Đã mở khóa
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">
                        {achievement.description}
                      </p>
                      {!isUnlocked && (
                        <p className="text-sm text-gray-500 mt-2 italic">
                          Hoàn thành điều kiện để mở khóa huy hiệu này
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Message */}
        {gameState.achievements.length < ALL_ACHIEVEMENTS.length && (
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-700">
              💪 Tiếp tục chơi để mở khóa thêm {ALL_ACHIEVEMENTS.length - gameState.achievements.length} huy hiệu nữa!
            </p>
          </div>
        )}

        {gameState.achievements.length === ALL_ACHIEVEMENTS.length && (
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl shadow-lg p-6 text-center border-2 border-green-500">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-xl font-bold text-green-800">
              Chúc mừng! Bạn đã mở khóa tất cả huy hiệu!
            </p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
