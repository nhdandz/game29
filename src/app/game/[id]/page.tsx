'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getMilestoneById, MILESTONES } from '@/data/milestones';
import { loadGameState, completeMilestone } from '@/lib/gameStorage';
import QuizGame from '@/components/games/QuizGame';
import ImageMatchGame from '@/components/games/ImageMatchGame';
import TimelineSortGame from '@/components/games/TimelineSortGame';
import MemoryMatchGame from '@/components/games/MemoryMatchGame';
import FillBlankGame from '@/components/games/FillBlankGame';
import WheelFortuneGame from '@/components/games/WheelFortuneGame';
import ImageQuizGame from '@/components/games/ImageQuizGame';
import LevelUpModal from '@/components/LevelUpModal';
import type { MilestoneId, GameState, CharacterLevel } from '@/types/game';

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const milestoneId = params.id as MilestoneId;

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState<CharacterLevel | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [finalPlayTime, setFinalPlayTime] = useState(0);

  const milestone = getMilestoneById(milestoneId);

  useEffect(() => {
    const state = loadGameState();
    setGameState(state);
  }, []);

  if (!milestone || !gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  const handleGameComplete = (score: number, playTime: number) => {
    setFinalScore(score);
    setFinalPlayTime(playTime);

    // Update game state
    const oldLevel = gameState.characterProgress.currentLevel;
    const newState = completeMilestone(gameState, milestoneId, score, playTime);
    setGameState(newState);

    // Check if leveled up
    const didLevelUp = newState.characterProgress.currentLevel > oldLevel;
    if (didLevelUp) {
      setNewLevel(newState.characterProgress.currentLevel);
      setShowLevelUp(true);
    } else {
      setShowInfoPopup(true);
    }
  };

  const handleLevelUpClose = () => {
    setShowLevelUp(false);
    // Show info popup after level up animation
    setTimeout(() => {
      setShowInfoPopup(true);
    }, 300);
  };

  const handleContinue = () => {
    router.push('/timeline');
  };

  // Get current milestone index and navigation info
  const currentIndex = MILESTONES.findIndex(m => m.id === milestoneId);
  const prevMilestone = currentIndex > 0 ? MILESTONES[currentIndex - 1] : null;
  const nextMilestone = currentIndex < MILESTONES.length - 1 ? MILESTONES[currentIndex + 1] : null;

  const handlePrevious = () => {
    if (prevMilestone) {
      router.push(`/game/${prevMilestone.id}`);
    }
  };

  const handleNext = () => {
    if (nextMilestone) {
      router.push(`/game/${nextMilestone.id}`);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={!prevMilestone}
        className={`
          fixed left-2 top-1/2 -translate-y-1/2 z-50
          w-12 h-12 md:w-14 md:h-14 rounded-full
          bg-white/80 hover:bg-white shadow-lg
          flex items-center justify-center
          transition-all duration-300
          ${!prevMilestone ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}
        `}
        title={prevMilestone ? `← ${prevMilestone.title}` : 'Không có màn trước'}
      >
        <span className="text-2xl text-gray-800">←</span>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!nextMilestone}
        className={`
          fixed right-2 top-1/2 -translate-y-1/2 z-50
          w-12 h-12 md:w-14 md:h-14 rounded-full
          bg-white/80 hover:bg-white shadow-lg
          flex items-center justify-center
          transition-all duration-300
          ${!nextMilestone ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}
        `}
        title={nextMilestone ? `${nextMilestone.title} →` : 'Không có màn tiếp'}
      >
        <span className="text-2xl text-gray-800">→</span>
      </button>

      {/* Main Content */}
      <div
        className="h-screen w-full overflow-hidden py-2 md:py-4 relative flex flex-col"
        style={{
          backgroundImage: milestone.backgroundImage
            ? `linear-gradient(rgba(220, 38, 38, 0.5), rgba(239, 68, 68, 0.6)), url(${milestone.backgroundImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: milestone.backgroundImage ? undefined : 'rgb(220, 38, 38)'
        }}
      >
      {!milestone.backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-yellow-500 to-red-700" />
      )}
      {/* Header */}
      <div className="max-w-4xl mx-auto px-2 md:px-4 mb-3 md:mb-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/timeline">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-medium transition-colors">
              ← Quay lại
            </button>
          </Link>
          <div className="text-white text-center">
            <div className="text-xl md:text-2xl font-bold">{milestone.icon}</div>
            <div className="text-xs md:text-sm opacity-90">
              {milestone.day && `${milestone.day}/`}
              {milestone.month && `${milestone.month}/`}
              {milestone.year}
            </div>
            <div className="text-sm md:text-lg font-bold">{milestone.title}</div>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </div>

      {/* Game Component */}
      {!showInfoPopup && (
        <>
          {milestone.gameType === 'quiz' && milestone.questions && (
            <QuizGame
              questions={milestone.questions}
              timeLimit={milestone.timeLimit}
              onComplete={handleGameComplete}
            />
          )}
          {milestone.gameType === 'image-match' && milestone.pairs && (
            <ImageMatchGame
              pairs={milestone.pairs}
              onComplete={handleGameComplete}
            />
          )}
          {milestone.gameType === 'timeline-sort' && milestone.timeline && (
            <TimelineSortGame
              timeline={milestone.timeline}
              onComplete={handleGameComplete}
            />
          )}
          {milestone.gameType === 'memory' && milestone.cards && (
            <MemoryMatchGame
              cards={milestone.cards}
              onComplete={handleGameComplete}
            />
          )}
          {milestone.gameType === 'fill-blank' && milestone.fillBlanks && (
            <FillBlankGame
              fillBlanks={milestone.fillBlanks}
              onComplete={handleGameComplete}
            />
          )}
          {milestone.gameType === 'wheel-fortune' && milestone.wheelFortune && (
            <WheelFortuneGame
              puzzle={milestone.wheelFortune}
              onComplete={handleGameComplete}
            />
          )}
          {milestone.gameType === 'image-quiz' && milestone.imageQuiz && (
            <ImageQuizGame
              questions={milestone.imageQuiz}
              onComplete={handleGameComplete}
            />
          )}
        </>
      )}

      {/* Level Up Modal */}
      {showLevelUp && newLevel !== null && (
        <LevelUpModal
          newLevel={newLevel}
          onClose={handleLevelUpClose}
        />
      )}

      {/* Info Popup */}
      {showInfoPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-t-3xl text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold mb-2">Hoàn thành!</h2>
              <div className="text-5xl font-bold mb-2">{finalScore}/{milestone.maxScore}</div>
              <p className="text-green-100">
                {finalScore >= milestone.requiredScore ? 'Xuất sắc!' : 'Cố gắng hơn lần sau!'}
              </p>
            </div>

            {/* Historical Information */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  📚 {milestone.infoTitle}
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {milestone.infoText}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Điểm đạt được</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {finalScore}/{milestone.maxScore}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Thời gian</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor(finalPlayTime / 60)}:{(finalPlayTime % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
              >
                Tiếp tục hành trình →
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
