'use client';

import { useState } from 'react';
import type { ImageQuizQuestion } from '@/types/game';
import Image from 'next/image';

interface ImageQuizGameProps {
  questions: ImageQuizQuestion[];
  onComplete: (score: number, playTime: number) => void;
}

export default function ImageQuizGame({ questions, onComplete }: ImageQuizGameProps) {
  const [startTime] = useState(Date.now());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const maxScore = 100;
  const pointsPerQuestion = maxScore / questions.length;

  const handleAnswerClick = (answerIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + pointsPerQuestion);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const playTime = Math.floor((Date.now() - startTime) / 1000);
      onComplete(Math.round(score + pointsPerQuestion * (currentQuestion.correctAnswer === selectedAnswer ? 1 : 0)), playTime);
    }
  };

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = ((currentQuestionIndex + (showExplanation ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="max-w-6xl mx-auto px-2 md:px-4 w-full h-full flex flex-col py-2">
        {/* Progress Bar */}
        <div className="bg-white/90 backdrop-blur rounded-lg p-2 shadow-lg mb-2">
          <div className="flex justify-between items-center mb-1">
            <div className="text-xs md:text-sm text-gray-900">
              Câu {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className="text-sm md:text-base font-bold text-yellow-600">
              {Math.round(score + (showExplanation && isCorrect ? pointsPerQuestion : 0))}/{maxScore}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="bg-white/95 backdrop-blur rounded-xl p-3 md:p-4 shadow-xl flex-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 h-full">
            {/* Left Column: Image */}
            <div className="flex flex-col justify-center">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md border-2 border-gray-200">
                <Image
                  src={currentQuestion.imageUrl}
                  alt="Hình ảnh lịch sử"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Question & Answers */}
            <div className="flex flex-col justify-between overflow-y-auto">
              <div>
                <h2 className="text-sm md:text-base font-bold text-gray-800 mb-2 md:mb-3">
                  {currentQuestion.question}
                </h2>

                {/* Answer Options */}
                <div className="space-y-1.5 md:space-y-2">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrectAnswer = index === currentQuestion.correctAnswer;
                    const showAsCorrect = showExplanation && isCorrectAnswer;
                    const showAsWrong = showExplanation && isSelected && !isCorrect;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={showExplanation}
                        className={`
                          w-full p-2 rounded-lg font-medium transition-all text-left text-xs md:text-sm
                          ${showAsCorrect ? 'bg-green-100 border-2 border-green-500' : ''}
                          ${showAsWrong ? 'bg-red-100 border-2 border-red-500' : ''}
                          ${!showExplanation && isSelected ? 'bg-blue-100 border-2 border-blue-500' : ''}
                          ${!showExplanation && !isSelected ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' : ''}
                          ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-gray-700 text-xs">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 text-gray-900">{option}</span>
                          {showAsCorrect && <span className="text-green-600 text-base">✓</span>}
                          {showAsWrong && <span className="text-red-600 text-base">✗</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && currentQuestion.explanation && (
                  <div className={`mt-2 p-2 rounded-lg text-xs ${isCorrect ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
                    <div className="flex items-start gap-1.5">
                      <span className="text-base flex-shrink-0">
                        {isCorrect ? '🎉' : '📚'}
                      </span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xs mb-0.5">
                          {isCorrect ? 'Chính xác!' : 'Chưa đúng!'}
                        </h3>
                        <p className="text-gray-700 leading-snug text-xs">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!showExplanation && (
                  <div className="mt-2 text-center text-xs text-gray-500">
                    💡 Quan sát kỹ hình ảnh
                  </div>
                )}
              </div>

              {/* Next Button */}
              {showExplanation && (
                <div className="mt-2 text-center">
                  <button
                    onClick={handleNext}
                    className="px-5 py-1.5 md:px-6 md:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-xs md:text-sm"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo →' : 'Hoàn thành 🎯'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
