'use client';

import { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/types/game';

interface QuizGameProps {
  questions: QuizQuestion[];
  timeLimit: number | null;
  onComplete: (score: number, playTime: number) => void;
}

export default function QuizGame({ questions, timeLimit, onComplete }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit / questions.length : 0);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const pointsPerQuestion = 100 / questions.length;

  useEffect(() => {
    if (!timeLimit) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, timeLimit]);

  const handleTimeout = () => {
    if (showExplanation) return;
    setSelectedAnswer(-1); // Mark as timeout
    setShowExplanation(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + pointsPerQuestion);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const playTime = Math.floor((Date.now() - startTime) / 1000);
      onComplete(Math.round(score + (selectedAnswer === currentQuestion.correctAnswer ? pointsPerQuestion : 0)), playTime);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(timeLimit ? timeLimit / questions.length : 0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-900">
            Câu hỏi {currentQuestionIndex + 1}/{questions.length}
          </div>
          {timeLimit && (
            <div className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
              ⏱️ {timeLeft}s
            </div>
          )}
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showResult = showExplanation;

            let buttonClass = 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200';

            if (showResult) {
              if (isCorrect) {
                buttonClass = 'bg-green-100 border-2 border-green-500';
              } else if (isSelected && !isCorrect) {
                buttonClass = 'bg-red-100 border-2 border-red-500';
              } else {
                buttonClass = 'bg-gray-50 border-2 border-gray-200';
              }
            } else if (isSelected) {
              buttonClass = 'bg-blue-100 border-2 border-blue-500';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`
                  w-full text-left p-4 rounded-xl font-medium transition-all
                  ${buttonClass}
                  ${selectedAnswer === null ? 'cursor-pointer transform hover:scale-102' : 'cursor-not-allowed'}
                  disabled:opacity-100
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-700">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-black">{option}</span>
                  {showResult && isCorrect && <span className="text-2xl">✓</span>}
                  {showResult && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && currentQuestion.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg animate-slide-up">
            <div className="flex gap-2">
              <span className="text-blue-500 text-xl">💡</span>
              <div>
                <div className="font-semibold text-blue-900 mb-1">Giải thích:</div>
                <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="mt-6 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            {isLastQuestion ? 'Hoàn thành' : 'Câu tiếp theo →'}
          </button>
        )}
      </div>

      {/* Score Display */}
      <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg text-center">
        <div className="text-sm text-gray-900 mb-1">Điểm hiện tại</div>
        <div className="text-3xl font-bold text-yellow-600">
          {Math.round(score + (selectedAnswer === currentQuestion.correctAnswer && showExplanation ? pointsPerQuestion : 0))}/100
        </div>
      </div>
    </div>
  );
}
