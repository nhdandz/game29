'use client';

import { useState } from 'react';
import type { TimelineEvent } from '@/types/game';

interface TimelineSortGameProps {
  timeline: TimelineEvent[];
  onComplete: (score: number, playTime: number) => void;
}

export default function TimelineSortGame({ timeline, onComplete }: TimelineSortGameProps) {
  const [startTime] = useState(Date.now());
  const [events, setEvents] = useState(() =>
    [...timeline].sort(() => Math.random() - 0.5)
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newEvents = [...events];
    const draggedEvent = newEvents[draggedIndex];
    newEvents.splice(draggedIndex, 1);
    newEvents.splice(index, 0, draggedEvent);

    setEvents(newEvents);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleCheck = () => {
    const correct = events.every((event, index) => event.correctOrder === index);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const playTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeout(() => {
        onComplete(100, playTime);
      }, 1500);
    }
  };

  const handleReset = () => {
    setEvents([...timeline].sort(() => Math.random() - 0.5));
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Instructions */}
      <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Sắp xếp các sự kiện theo đúng thứ tự thời gian
        </h2>
        <p className="text-sm text-gray-900">
          Kéo thả để sắp xếp từ sớm nhất đến muộn nhất
        </p>
      </div>

      {/* Timeline Events */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl space-y-3">
        {events.map((event, index) => {
          const correctPosition = showResult && event.correctOrder === index;
          const wrongPosition = showResult && event.correctOrder !== index;

          return (
            <div
              key={event.id}
              draggable={!showResult}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                p-4 rounded-xl border-2 transition-all cursor-move
                ${draggedIndex === index ? 'opacity-50 scale-95' : ''}
                ${correctPosition ? 'bg-green-100 border-green-500' : ''}
                ${wrongPosition ? 'bg-red-100 border-red-500' : ''}
                ${!showResult ? 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400' : ''}
                ${showResult ? 'cursor-default' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                {!showResult && (
                  <span className="text-gray-400 text-xl cursor-move">☰</span>
                )}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                  {index + 1}
                </div>
                <div className="flex-1 text-gray-800 font-medium">
                  {event.text}
                </div>
                {correctPosition && (
                  <span className="text-green-600 text-2xl">✓</span>
                )}
                {wrongPosition && (
                  <span className="text-red-600 text-2xl">✗</span>
                )}
              </div>
              {wrongPosition && (
                <div className="ml-14 mt-2 text-sm text-gray-900">
                  Vị trí đúng: #{event.correctOrder + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {!showResult ? (
          <button
            onClick={handleCheck}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            Kiểm tra đáp án
          </button>
        ) : !isCorrect ? (
          <>
            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              Thử lại
            </button>
            <button
              onClick={() => onComplete(0, Math.floor((Date.now() - startTime) / 1000))}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              Bỏ qua
            </button>
          </>
        ) : (
          <div className="flex-1 bg-green-100 border-2 border-green-500 text-green-700 font-bold py-4 rounded-xl text-center">
            🎉 Chính xác! Đang chuyển sang màn tiếp theo...
          </div>
        )}
      </div>
    </div>
  );
}
