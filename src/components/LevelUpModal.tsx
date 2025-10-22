'use client';

import { CharacterLevel } from '@/types/game';
import { getCharacterStage } from '@/data/characters';
import { useEffect, useState } from 'react';

interface LevelUpModalProps {
  newLevel: CharacterLevel;
  onClose: () => void;
}

export default function LevelUpModal({ newLevel, onClose }: LevelUpModalProps) {
  const [show, setShow] = useState(false);
  const stage = getCharacterStage(newLevel);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setShow(true), 100);

    // Auto close after 4 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        show ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-w-md w-full transition-all duration-500 transform ${
          show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-3xl blur-3xl animate-pulse opacity-60"
          style={{ backgroundColor: stage.color }}
        />

        {/* Main card */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border-4"
          style={{ borderColor: stage.color }}>

          {/* Firework animations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-firework"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'][i % 5],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="relative px-8 py-6 text-center text-white overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${stage.color}dd, ${stage.color})` }}>
            <div className="text-5xl font-black mb-2 animate-bounce">
              LEVEL UP!
            </div>
            <div className="text-lg opacity-90">
              Nhân vật đã tiến hóa!
            </div>

            {/* Decorative stars */}
            <div className="absolute top-4 left-4 text-3xl animate-spin-slow">⭐</div>
            <div className="absolute top-4 right-4 text-3xl animate-spin-slow" style={{ animationDelay: '0.5s' }}>⭐</div>
          </div>

          {/* Character showcase */}
          <div className="relative p-8 bg-gradient-to-b from-gray-50 to-white">
            {/* New level badge */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg animate-pulse"
              style={{ backgroundColor: stage.color }}>
              Cấp {newLevel}
            </div>

            {/* Character icon with glow */}
            <div className="relative mb-6">
              <div
                className="absolute inset-0 blur-2xl opacity-50 animate-pulse"
                style={{ backgroundColor: stage.color }}
              />
              <div className="relative text-8xl text-center animate-bounce-slow filter drop-shadow-2xl">
                {stage.icon}
              </div>
            </div>

            {/* Stage info */}
            <div className="text-center space-y-3">
              <div className="inline-block px-4 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: stage.color }}>
                {stage.milestone === 'start' ? 'Khởi đầu' :
                 stage.milestone === 'complete' ? 'Hoàn thành' :
                 `Mốc ${stage.milestone}`}
              </div>
              <h2 className="text-2xl font-bold" style={{ color: stage.color }}>
                {stage.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed px-4">
                {stage.description}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-2000 ease-out"
                style={{
                  width: `${(newLevel / 5) * 100}%`,
                  background: `linear-gradient(90deg, ${stage.color}, ${stage.color}cc)`
                }}
              />
            </div>
            <div className="text-center mt-2 text-sm font-bold" style={{ color: stage.color }}>
              {newLevel}/5
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t-2" style={{ borderColor: stage.color + '40' }}>
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${stage.color}dd, ${stage.color})`
              }}
            >
              Tiếp tục hành trình →
            </button>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes firework {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-firework {
          animation: firework 2s ease-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
