'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadGameState, saveGameState } from '@/lib/gameStorage';
import { MILESTONES, isMilestoneUnlocked } from '@/data/milestones';
import type { GameState, Milestone } from '@/types/game';

export default function TimelinePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const state = loadGameState();
    setGameState(state);
  }, []);

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  const handleNodeClick = (milestone: Milestone) => {
    if (!isMilestoneUnlocked(milestone.id, gameState.completedMilestones)) {
      return;
    }

    // Navigate to the game for this milestone
    router.push(`/game/${milestone.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-yellow-500 to-red-700 p-4 pb-20">
      {/* Header */}
      <div className="max-w-2xl mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-lg font-medium transition-colors">
              ← Trang chủ
            </button>
          </Link>
          <div className="text-white text-right">
            <div className="text-sm opacity-90">Tiến độ</div>
            <div className="text-xl font-bold">
              {gameState.completedMilestones.length}/5 màn
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 backdrop-blur rounded-full h-3 overflow-hidden mb-8">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-1000 ease-out"
            style={{ width: `${(gameState.completedMilestones.length / 5) * 100}%` }}
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-lg">
          HÀNH TRÌNH ĐỘC LẬP
        </h1>
        <p className="text-white/90 text-center mb-8">
          Khám phá 5 mốc lịch sử quan trọng của dân tộc Việt Nam
        </p>
      </div>

      {/* Timeline Nodes */}
      <div className="max-w-2xl mx-auto space-y-8 relative">
        {/* Vertical connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/30 transform -translate-x-1/2 hidden md:block" />

        {MILESTONES.map((milestone, index) => {
          const isCompleted = gameState.completedMilestones.includes(milestone.id);
          const isUnlocked = isMilestoneUnlocked(milestone.id, gameState.completedMilestones);
          const isCurrent = !isCompleted && isUnlocked;
          const score = gameState.scores[milestone.id] || 0;

          return (
            <div
              key={milestone.id}
              className={`relative animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Node Card */}
              <div
                onClick={() => handleNodeClick(milestone)}
                className={`
                  relative rounded-2xl shadow-2xl p-6 transition-all duration-300 overflow-hidden
                  ${isUnlocked ? 'cursor-pointer hover:scale-105 hover:shadow-3xl' : 'opacity-60 cursor-not-allowed'}
                  ${isCurrent ? 'ring-4 ring-yellow-400 animate-pulse-glow' : ''}
                  ${isCompleted && !milestone.backgroundImage ? 'bg-gradient-to-br from-green-100 to-green-200' : ''}
                `}
                style={{
                  backgroundImage: milestone.backgroundImage
                    ? `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${milestone.backgroundImage})`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: milestone.backgroundImage ? undefined : (isCompleted ? undefined : 'white')
                }}
              >
                {!milestone.backgroundImage && !isCompleted && (
                  <div className="absolute inset-0 bg-white" />
                )}
                <div className="flex items-start gap-4 relative z-10">
                  {/* Icon/Status */}
                  <div className="flex-shrink-0">
                    <div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center text-3xl
                        ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-yellow-400' : 'bg-gray-300'}
                        transition-all duration-300
                      `}
                    >
                      {isCompleted ? '✓' : isUnlocked ? milestone.icon : '🔒'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">
                          {milestone.day && `${milestone.day}/`}
                          {milestone.month && `${milestone.month}/`}
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {milestone.title}
                        </h3>
                      </div>
                      {isCompleted && (
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Điểm</div>
                          <div className="text-lg font-bold text-green-600">
                            {score}/{milestone.maxScore}
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-3">
                      {milestone.description}
                    </p>

                    {/* Game Type Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                        {milestone.gameType === 'quiz' && '📝 Trắc nghiệm'}
                        {milestone.gameType === 'image-match' && '🖼️ Ghép hình'}
                        {milestone.gameType === 'timeline-sort' && '📅 Sắp xếp'}
                        {milestone.gameType === 'memory' && '🃏 Lật bài'}
                        {milestone.gameType === 'fill-blank' && '✍️ Điền chỗ trống'}
                      </span>

                      {milestone.timeLimit && (
                        <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-medium">
                          ⏱️ {milestone.timeLimit}s
                        </span>
                      )}

                      {isCurrent && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium animate-pulse">
                          👉 Chơi ngay
                        </span>
                      )}

                      {!isUnlocked && (
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
                          🔒 Chưa mở khóa
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector dot for mobile */}
              <div className="absolute left-1/2 -bottom-4 w-3 h-3 bg-white/50 rounded-full transform -translate-x-1/2 md:hidden" />
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {gameState.completedMilestones.length === 5 && (
        <div className="max-w-2xl mx-auto mt-12 bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Chúc mừng!
          </h2>
          <p className="text-gray-600 mb-4">
            Bạn đã hoàn thành hành trình khám phá lịch sử Việt Nam!
          </p>
          <div className="text-4xl font-bold text-yellow-600 mb-6">
            {gameState.totalScore}/550 điểm
          </div>
          <Link href="/victory">
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all">
              Xem kết quả
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
