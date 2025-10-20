'use client';

import { useState } from 'react';
import type { FillBlank } from '@/types/game';

interface FillBlankGameProps {
  fillBlanks: FillBlank;
  onComplete: (score: number, playTime: number) => void;
}

export default function FillBlankGame({ fillBlanks, onComplete }: FillBlankGameProps) {
  const [startTime] = useState(Date.now());
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>(
    new Array(fillBlanks.blanks.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);

  const handleWordClick = (word: string, blankIndex: number) => {
    const newSelected = [...selectedWords];

    // If word is already selected elsewhere, remove it
    const existingIndex = newSelected.indexOf(word);
    if (existingIndex !== -1) {
      newSelected[existingIndex] = null;
    }

    newSelected[blankIndex] = word;
    setSelectedWords(newSelected);
  };

  const handleBlankClick = (blankIndex: number) => {
    if (!showResult) {
      const newSelected = [...selectedWords];
      newSelected[blankIndex] = null;
      setSelectedWords(newSelected);
    }
  };

  const handleCheck = () => {
    setShowResult(true);

    let correctCount = 0;
    selectedWords.forEach((word, index) => {
      if (word === fillBlanks.blanks[index]) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / fillBlanks.blanks.length) * 150);
    const playTime = Math.floor((Date.now() - startTime) / 1000);

    setTimeout(() => {
      onComplete(score, playTime);
    }, 2000);
  };

  const isWordUsed = (word: string) => {
    return selectedWords.includes(word);
  };

  const isBlankCorrect = (index: number) => {
    return showResult && selectedWords[index] === fillBlanks.blanks[index];
  };

  const isBlankWrong = (index: number) => {
    return showResult && selectedWords[index] !== fillBlanks.blanks[index];
  };

  const allFilled = selectedWords.every(w => w !== null);
  const correctCount = selectedWords.filter((w, i) => w === fillBlanks.blanks[i]).length;

  // Split text by [blank] markers
  const parts = fillBlanks.text.split(/\[blank\d+\]/);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Progress */}
      <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-900">
            Đã điền: {selectedWords.filter(w => w !== null).length}/{fillBlanks.blanks.length}
          </div>
          {showResult && (
            <div className="text-lg font-bold text-yellow-600">
              {Math.round((correctCount / fillBlanks.blanks.length) * 150)}/150 điểm
            </div>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(selectedWords.filter(w => w !== null).length / fillBlanks.blanks.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Text with Blanks */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Hoàn thành câu văn
        </h2>

        <div className="text-lg leading-relaxed mb-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          {parts.map((part, index) => (
            <span key={index} className='text-gray-800'>
              {part}
              {index < fillBlanks.blanks.length && (
                <button
                  onClick={() => handleBlankClick(index)}
                  disabled={showResult}
                  className={` 
                    inline-block mx-1 px-4 py-1 rounded-lg font-bold border-2 transition-all min-w-[120px]
                    ${selectedWords[index] ? '' : 'border-dashed'}
                    ${isBlankCorrect(index) ? 'bg-green-100 border-green-500 text-green-700' : ''}
                    ${isBlankWrong(index) ? 'bg-red-100 border-red-500 text-red-700' : ''}
                    ${!showResult && selectedWords[index] ? 'bg-blue-100 border-blue-500 text-blue-700' : ''}
                    ${!showResult && !selectedWords[index] ? 'bg-gray-100 border-gray-400 text-gray-400 cursor-pointer hover:border-gray-500' : ''}
                    ${showResult ? 'cursor-default' : ''}
                  `}
                >
                  {selectedWords[index] || `[___${index + 1}___]`}
                  {isBlankCorrect(index) && ' ✓'}
                  {isBlankWrong(index) && ' ✗'}
                </button>
              )}
            </span>
          ))}
        </div>

        {/* Show correct answers if wrong */}
        {showResult && correctCount < fillBlanks.blanks.length && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <div className="font-semibold text-blue-900 mb-2">Đáp án đúng:</div>
            <div className="text-blue-800">
              {fillBlanks.blanks.map((word, index) => (
                <span key={index} className="inline-block bg-blue-200 px-3 py-1 rounded-lg mr-2 mb-2 font-medium">
                  {index + 1}. {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Word Bank */}
        {!showResult && (
          <>
            <h3 className="font-semibold text-gray-700 mb-3 text-center">
              Ngân hàng từ (Chọn từ để điền vào chỗ trống)
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {fillBlanks.wordBank.map((word, index) => {
                const used = isWordUsed(word);
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const firstEmptyIndex = selectedWords.findIndex(w => w === null);
                      if (firstEmptyIndex !== -1) {
                        handleWordClick(word, firstEmptyIndex);
                      }
                    }}
                    disabled={used}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${used ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white cursor-pointer hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105'}
                    `}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Check Button */}
        {!showResult && (
          <button
            onClick={handleCheck}
            disabled={!allFilled}
            className={`
              mt-6 w-full font-bold py-4 rounded-xl shadow-lg transition-all
              ${allFilled
                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transform hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {allFilled ? 'Kiểm tra đáp án' : 'Hãy điền đầy đủ các chỗ trống'}
          </button>
        )}

        {showResult && (
          <div className="mt-6 text-center">
            {correctCount === fillBlanks.blanks.length ? (
              <div className="text-green-600 font-bold text-xl">
                🎉 Hoàn hảo! Tất cả đều đúng!
              </div>
            ) : (
              <div className="text-orange-600 font-bold text-xl">
                Bạn đã đúng {correctCount}/{fillBlanks.blanks.length} chỗ trống
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
