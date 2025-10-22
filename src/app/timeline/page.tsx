'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadGameState, saveGameState, clearGameState } from '@/lib/gameStorage';
import { MILESTONES, isMilestoneUnlocked } from '@/data/milestones';
import type { GameState, Milestone } from '@/types/game';
import CharacterDisplay from '@/components/CharacterDisplay';

export default function TimelinePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const state = loadGameState();
    setGameState(state);

    // Find the first uncompleted milestone
    const firstUncompleted = MILESTONES.findIndex(m => !state.completedMilestones.includes(m.id));
    if (firstUncompleted !== -1) {
      setCurrentIndex(firstUncompleted);
    }
  }, []);

  if (!gameState) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  const currentMilestone = MILESTONES[currentIndex];
  const isCompleted = gameState.completedMilestones.includes(currentMilestone.id);
  const isUnlocked = isMilestoneUnlocked(currentMilestone.id, gameState.completedMilestones);
  const isCurrent = !isCompleted && isUnlocked;
  const score = gameState.scores[currentMilestone.id] || 0;

  const handleNodeClick = (milestone: Milestone) => {
    if (!isMilestoneUnlocked(milestone.id, gameState.completedMilestones)) {
      return;
    }
    router.push(`/game/${milestone.id}`);
  };

  const handleResetGame = () => {
    if (confirm('Bạn có chắc chắn muốn chơi lại từ đầu? Mọi tiến độ sẽ bị xóa.')) {
      clearGameState();
      router.push('/');
      window.location.reload();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < MILESTONES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`
          fixed left-2 top-1/2 -translate-y-1/2 z-50
          w-12 h-12 md:w-14 md:h-14 rounded-full
          bg-white/80 hover:bg-white shadow-lg
          flex items-center justify-center
          transition-all duration-300
          ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}
        `}
      >
        <span className="text-2xl text-gray-800">←</span>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === MILESTONES.length - 1}
        className={`
          fixed right-2 top-1/2 -translate-y-1/2 z-50
          w-12 h-12 md:w-14 md:h-14 rounded-full
          bg-white/80 hover:bg-white shadow-lg
          flex items-center justify-center
          transition-all duration-300
          ${currentIndex === MILESTONES.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}
        `}
      >
        <span className="text-2xl text-gray-800">→</span>
      </button>

      {/* Main Content */}
      <div
        className="h-screen w-full overflow-hidden relative flex flex-col"
        style={{
          backgroundImage: currentMilestone.backgroundImage
            ? `linear-gradient(rgba(220, 38, 38, 0.3), rgba(239, 68, 68, 0.4)), url(${currentMilestone.backgroundImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: currentMilestone.backgroundImage ? undefined : undefined
        }}
      >
        {!currentMilestone.backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-yellow-500 to-red-700" />
        )}

        {/* Header */}
        <div className="relative z-10 px-4 py-4 md:py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex gap-2">
              <Link href="/">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors">
                  ← Trang chủ
                </button>
              </Link>
              <button
                onClick={handleResetGame}
                className="bg-red-500/80 hover:bg-red-600 backdrop-blur text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors"
                title="Chơi lại từ đầu"
              >
                🔄
              </button>
            </div>

            {/* Progress indicator */}
            <div className="text-white text-right">
              <div className="text-xs md:text-sm opacity-90">Tiến độ</div>
              <div className="text-base md:text-xl font-bold">
                {gameState.completedMilestones.length}/5 màn
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-6xl mx-auto mt-3 bg-white/20 backdrop-blur rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-1000 ease-out"
              style={{ width: `${(gameState.completedMilestones.length / 5) * 100}%` }}
            />
          </div>

          {/* Page Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {MILESTONES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentIndex ? 'w-8 bg-white' : 'bg-white/50'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 relative z-10">
          <div className="max-w-4xl mx-auto h-full flex items-center justify-center">
            <div
              onClick={() => handleNodeClick(currentMilestone)}
              className={`
                w-full bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-10 transition-all duration-300
                ${isUnlocked ? 'cursor-pointer hover:scale-105' : 'opacity-60 cursor-not-allowed'}
                ${isCurrent ? 'ring-4 ring-yellow-400 animate-pulse-glow' : ''}
              `}
            >
              {/* Top Section */}
              <div className="flex items-center gap-4 md:gap-6 mb-6">
                <div
                  className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-4xl md:text-5xl
                    ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-yellow-400' : 'bg-gray-300'}
                    transition-all duration-300 flex-shrink-0
                  `}
                >
                  {isCompleted ? '✓' : isUnlocked ? currentMilestone.icon : '🔒'}
                </div>

                <div className="flex-1">
                  <div className="text-sm md:text-base font-medium text-gray-500 mb-1">
                    {currentMilestone.day && `${currentMilestone.day}/`}
                    {currentMilestone.month && `${currentMilestone.month}/`}
                    {currentMilestone.year}
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                    {currentMilestone.title}
                  </h2>
                </div>

                {isCompleted && (
                  <div className="text-right">
                    <div className="text-xs md:text-sm text-gray-500">Điểm</div>
                    <div className="text-xl md:text-3xl font-bold text-green-600">
                      {score}/{currentMilestone.maxScore}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                {currentMilestone.description}
              </p>

              {/* Character Display */}
              <div className="mb-6">
                <CharacterDisplay
                  characterProgress={gameState.characterProgress}
                  compact={true}
                />
              </div>

              {/* Game Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-3 text-lg md:text-xl">📚 Thông tin lịch sử</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {currentMilestone.infoText}
                </p>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-6">
                <span className="bg-blue-100 text-blue-700 text-xs md:text-sm px-3 py-1.5 rounded-full font-medium">
                  {currentMilestone.gameType === 'quiz' && '📝 Trắc nghiệm'}
                  {currentMilestone.gameType === 'image-match' && '🖼️ Ghép hình'}
                  {currentMilestone.gameType === 'timeline-sort' && '📅 Sắp xếp'}
                  {currentMilestone.gameType === 'memory' && '🃏 Lật bài'}
                  {currentMilestone.gameType === 'fill-blank' && '✍️ Điền chỗ trống'}
                  {currentMilestone.gameType === 'wheel-fortune' && '🎯 Chiếc nón kỳ diệu'}
                </span>

                {currentMilestone.timeLimit && (
                  <span className="bg-orange-100 text-orange-700 text-xs md:text-sm px-3 py-1.5 rounded-full font-medium">
                    ⏱️ {currentMilestone.timeLimit}s
                  </span>
                )}

                <span className="bg-yellow-100 text-yellow-700 text-xs md:text-sm px-3 py-1.5 rounded-full font-medium">
                  ⭐ {currentMilestone.maxScore} điểm
                </span>

                {!isUnlocked && (
                  <span className="bg-gray-100 text-gray-500 text-xs md:text-sm px-3 py-1.5 rounded-full font-medium">
                    🔒 Chưa mở khóa
                  </span>
                )}
              </div>

              {/* Action Button */}
              {isUnlocked && (
                <button
                  onClick={() => handleNodeClick(currentMilestone)}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all
                    ${isCompleted
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                      : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white animate-pulse'
                    }
                  `}
                >
                  {isCompleted ? '🔄 Chơi lại màn này' : '🎮 Chơi ngay'}
                </button>
              )}

              {/* Victory Message */}
              {gameState.completedMilestones.length === 5 && (
                <div className="mt-6 bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-500 rounded-xl p-4 md:p-6 text-center">
                  <div className="text-4xl md:text-5xl mb-3">🎉</div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Chúc mừng!</h3>
                  <p className="text-gray-700 mb-2">Bạn đã hoàn thành hành trình!</p>
                  <p className="text-2xl font-bold text-yellow-600 mb-4">{gameState.totalScore}/570 điểm</p>
                  <Link href="/victory">
                    <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                      Xem kết quả →
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
