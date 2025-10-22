'use client';

import { CharacterProgress, CharacterLevel } from '@/types/game';
import { getCharacterStage, CHARACTER_STAGES } from '@/data/characters';
import { useState } from 'react';
import Image from 'next/image';

interface CharacterDisplayProps {
  characterProgress: CharacterProgress;
  showLevelUpAnimation?: boolean;
  compact?: boolean;
}

export default function CharacterDisplay({
  characterProgress,
  showLevelUpAnimation = false,
  compact = false
}: CharacterDisplayProps) {
  const currentStage = getCharacterStage(characterProgress.currentLevel);
  const [showDetails, setShowDetails] = useState(false);

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg">
        <div
          className="relative w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ backgroundColor: currentStage.color + '20', border: `3px solid ${currentStage.color}` }}
        >
          {currentStage.icon}
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500">Cấp độ {currentStage.level}</div>
          <div className="font-bold text-gray-800">{currentStage.title}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${showLevelUpAnimation ? 'animate-pulse' : ''}`}>
      {/* Main Character Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden border-4"
        style={{ borderColor: currentStage.color }}>

        {/* Header with Level */}
        <div className="px-6 py-4 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${currentStage.color}dd, ${currentStage.color})` }}>
          <div className="text-sm font-medium opacity-90">Chiến sĩ Cách mạng</div>
          <div className="text-2xl font-bold flex items-center justify-center gap-2 mt-1">
            <span>{currentStage.icon}</span>
            <span>Cấp {currentStage.level}</span>
          </div>
        </div>

        {/* Character Image */}
        <div className="relative bg-gradient-to-b from-gray-100 to-white p-8">
          <div className="relative w-full aspect-square max-w-[300px] mx-auto">
            {/* Fallback to emoji if image not found */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-9xl animate-bounce"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
              >
                {currentStage.icon}
              </div>
            </div>

            {/* Actual image (will show when added) */}
            <Image
              src={currentStage.imageUrl}
              alt={currentStage.title}
              fill
              className="object-contain z-10"
              onError={(e) => {
                // Hide image if not found, show emoji instead
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Level up effect */}
          {showLevelUpAnimation && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-6xl font-bold text-yellow-400 animate-ping">
                LEVEL UP!
              </div>
            </div>
          )}
        </div>

        {/* Character Info */}
        <div className="px-6 py-4 bg-white border-t-2" style={{ borderColor: currentStage.color + '40' }}>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{currentStage.title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{currentStage.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-600">Tiến độ</span>
            <span className="text-xs font-bold" style={{ color: currentStage.color }}>
              {currentStage.level}/5
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(currentStage.level / 5) * 100}%`,
                background: `linear-gradient(90deg, ${currentStage.color}, ${currentStage.color}cc)`
              }}
            />
          </div>
        </div>

        {/* View All Stages Button */}
        <div className="px-6 py-4 bg-white border-t">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-2 px-4 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: currentStage.color + '15',
              color: currentStage.color,
              border: `2px solid ${currentStage.color}`
            }}
          >
            {showDetails ? '▲ Ẩn chi tiết' : '▼ Xem tất cả cấp độ'}
          </button>
        </div>
      </div>

      {/* All Stages Timeline */}
      {showDetails && (
        <div className="mt-4 bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Hành trình tiến hóa</h4>
          <div className="space-y-3">
            {Object.values(CHARACTER_STAGES).map((stage) => {
              const isUnlocked = characterProgress.unlockedLevels.includes(stage.level);
              const isCurrent = stage.level === currentStage.level;

              return (
                <div
                  key={stage.level}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                    isCurrent
                      ? 'ring-2 scale-105'
                      : isUnlocked
                      ? 'bg-gray-50'
                      : 'bg-gray-100 opacity-50'
                  }`}
                  style={isCurrent ? {
                    ringColor: currentStage.color,
                    backgroundColor: currentStage.color + '10'
                  } : {}}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      isUnlocked ? '' : 'grayscale'
                    }`}
                    style={isUnlocked ? {
                      backgroundColor: stage.color + '20',
                      border: `2px solid ${stage.color}`
                    } : {}}
                  >
                    {isUnlocked ? stage.icon : '🔒'}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={isUnlocked ? { color: stage.color } : {}}>
                      {isUnlocked ? stage.title : '???'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {isUnlocked ? stage.description : 'Chưa mở khóa'}
                    </div>
                  </div>
                  {isCurrent && (
                    <div className="text-xs font-bold px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: currentStage.color }}>
                      Hiện tại
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
