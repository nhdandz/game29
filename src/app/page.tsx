'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadGameState } from '@/lib/gameStorage';
import type { GameState } from '@/types/game';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    // Load game state
    const state = loadGameState();
    setGameState(state);

    // Show splash for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-red-600 via-yellow-500 to-red-700 flex items-center justify-center animate-fade-in">
        <div className="text-center animate-pulse">
          <div className="text-6xl md:text-8xl mb-6 animate-bounce">🇻🇳</div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4 px-4">
            HÀNH TRÌNH ĐỘC LẬP
          </h1>
          <p className="text-lg md:text-xl text-white/90 px-4">Khám phá lịch sử Việt Nam 1930-1945</p>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  const hasProgress = gameState.completedMilestones.length > 0;
  const isCompleted = gameState.completedMilestones.length === 5;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-red-600 via-yellow-500 to-red-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 space-y-6 animate-fade-in">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🇻🇳</div>
          <h1 className="text-3xl font-bold text-red-700">
            HÀNH TRÌNH ĐỘC LẬP
          </h1>
          <p className="text-gray-600">
            Du hành qua lịch sử Việt Nam 1930-1945
          </p>
        </div>

        {/* Progress Summary */}
        {hasProgress && (
          <div className="bg-gradient-to-r from-yellow-100 to-red-100 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">Tiến độ:</span>
              <span className="font-bold text-red-700">
                {gameState.completedMilestones.length}/5 màn
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">Tổng điểm:</span>
              <span className="font-bold text-yellow-700">
                {gameState.totalScore}/570
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(gameState.completedMilestones.length / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Menu Buttons */}
        <div className="space-y-3">
          <Link href="/timeline">
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
              <span className="text-2xl">🎮</span>
              <span className="text-lg">
                {gameState.isFirstTime ? 'Bắt đầu chơi' : hasProgress ? 'Tiếp tục' : 'Chơi mới'}
              </span>
            </button>
          </Link>

          {!isCompleted && hasProgress && (
            <Link href="/timeline">
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
                <span className="text-xl">📍</span>
                <span>Xem bản đồ</span>
              </button>
            </Link>
          )}

          <Link href="/achievements">
            <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
              <span className="text-xl">🏆</span>
              <span>Thành tích</span>
              {gameState.achievements.length > 0 && (
                <span className="bg-white text-yellow-600 text-xs font-bold px-2 py-1 rounded-full">
                  {gameState.achievements.length}
                </span>
              )}
            </button>
          </Link>

          <Link href="/history">
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
              <span className="text-xl">📚</span>
              <span>Lịch sử</span>
            </button>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          {isCompleted ? (
            <p className="text-green-600 font-semibold">
              🎉 Bạn đã hoàn thành hành trình!
            </p>
          ) : gameState.isFirstTime ? (
            <p>Bắt đầu hành trình khám phá lịch sử Việt Nam</p>
          ) : (
            <p>Chơi lần cuối: {new Date(gameState.lastPlayed).toLocaleDateString('vi-VN')}</p>
          )}
        </div>
      </div>
    </div>
  );
}
