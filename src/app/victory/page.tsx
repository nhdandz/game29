'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadGameState, getAchievementInfo, resetGameState } from '@/lib/gameStorage';
import type { GameState } from '@/types/game';

export default function VictoryPage() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const state = loadGameState();
    setGameState(state);

    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handlePlayAgain = () => {
    if (confirm('Bạn có chắc muốn chơi lại từ đầu? Điểm số hiện tại sẽ bị xóa.')) {
      resetGameState();
      window.location.href = '/';
    }
  };

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  const isPerfectScore = gameState.totalScore === 550;
  const isSpeedRunner = gameState.totalPlayTime < 1800;
  const avgScore = Math.round(gameState.totalScore / 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-yellow-500 to-red-700 py-8 px-4 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '⭐', '🏆', '🇻🇳'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Main Victory Card */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
          <div className="text-8xl mb-6 animate-bounce">🏆</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Chúc mừng chiến thắng!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Bạn đã hoàn thành Hành trình Độc lập
          </p>

          {/* Total Score */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 mb-8">
            <div className="text-white text-lg mb-2">Tổng điểm</div>
            <div className="text-6xl font-bold text-white mb-2">
              {gameState.totalScore}
            </div>
            <div className="text-2xl text-white/90">/ 550 điểm</div>
            {isPerfectScore && (
              <div className="mt-4 text-xl font-bold text-white animate-pulse">
                💯 ĐIỂM TUYỆT ĐỐI!
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Điểm trung bình</div>
              <div className="text-3xl font-bold text-blue-600">{avgScore}/110</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Tổng thời gian</div>
              <div className="text-3xl font-bold text-purple-600">
                {Math.floor(gameState.totalPlayTime / 60)}:{(gameState.totalPlayTime % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Hoàn thành</div>
              <div className="text-3xl font-bold text-green-600">5/5</div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📊 Chi tiết điểm số
          </h2>
          <div className="space-y-3">
            {[
              { id: '1930', title: '1930 - Thành lập Đảng', icon: '🏛️', max: 100 },
              { id: '1940', title: '1940 - Mặt trận Việt Minh', icon: '🚩', max: 80 },
              { id: '1941', title: '1941 - Bác Hồ về nước', icon: '🇻🇳', max: 100 },
              { id: '1945-8', title: 'Tháng 8/1945 - Tổng khởi nghĩa', icon: '⚔️', max: 120 },
              { id: '1945-9', title: 'Ngày 2/9/1945 - Tuyên ngôn Độc lập', icon: '📜', max: 150 }
            ].map((milestone) => {
              const score = gameState.scores[milestone.id as keyof typeof gameState.scores] || 0;
              const percentage = Math.round((score / milestone.max) * 100);

              return (
                <div key={milestone.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{milestone.icon}</span>
                      <span className="font-medium text-gray-700">{milestone.title}</span>
                    </div>
                    <span className="font-bold text-gray-800">
                      {score}/{milestone.max}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        percentage === 100 ? 'bg-green-500' : percentage >= 80 ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        {gameState.achievements.length > 0 && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🏅 Huy hiệu đạt được
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {gameState.achievements.map((achievementId) => {
                const achievement = getAchievementInfo(achievementId);
                return (
                  <div key={achievementId} className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-4 flex items-center gap-4">
                    <span className="text-4xl">{achievement.icon}</span>
                    <div>
                      <div className="font-bold text-gray-800">{achievement.name}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/" className="flex-1">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all">
              ← Về trang chủ
            </button>
          </Link>
          <Link href="/history" className="flex-1">
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all">
              📚 Xem lịch sử
            </button>
          </Link>
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            🔄 Chơi lại
          </button>
        </div>
      </div>
    </div>
  );
}
