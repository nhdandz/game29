'use client';

import { useState, useEffect } from 'react';
import type { MemoryCard } from '@/types/game';

interface MemoryMatchGameProps {
  cards: MemoryCard[];
  onComplete: (score: number, playTime: number) => void;
}

export default function MemoryMatchGame({ cards, onComplete }: MemoryMatchGameProps) {
  const [startTime] = useState(Date.now());
  const [shuffledCards, setShuffledCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setShuffledCards([...cards].sort(() => Math.random() - 0.5));
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(shuffledCards[index].pairId)
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlipped;
      const firstCard = shuffledCards[first];
      const secondCard = shuffledCards[second];

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs(prev => [...prev, firstCard.pairId]);
        setFlippedIndices([]);

        // Check if all pairs matched
        const uniquePairs = [...new Set(cards.map(c => c.pairId))];
        if (matchedPairs.length + 1 === uniquePairs.length) {
          const playTime = Math.floor((Date.now() - startTime) / 1000);
          const baseScore = 120;
          const penaltyPerMove = 2;
          const optimalMoves = uniquePairs.length;
          const extraMoves = Math.max(0, moves + 1 - optimalMoves);
          const score = Math.max(baseScore / 2, baseScore - (extraMoves * penaltyPerMove));

          setTimeout(() => {
            onComplete(Math.round(score), playTime);
          }, 800);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (index: number) => {
    return flippedIndices.includes(index) || matchedPairs.includes(shuffledCards[index]?.pairId);
  };

  const isCardMatched = (index: number) => {
    return matchedPairs.includes(shuffledCards[index]?.pairId);
  };

  const totalPairs = [...new Set(cards.map(c => c.pairId))].length;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Stats */}
      <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <div className="text-sm text-gray-900">Đã tìm</div>
            <div className="text-xl font-bold text-green-600">
              {matchedPairs.length}/{totalPairs}
            </div>
          </div>
          <div className="text-center flex-1">
            <div className="text-sm text-gray-900">Số lượt</div>
            <div className="text-xl font-bold text-blue-600">{moves}</div>
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(matchedPairs.length / totalPairs) * 100}%` }}
          />
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Tìm các cặp giống nhau
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {shuffledCards.map((card, index) => {
            const flipped = isCardFlipped(index);
            const matched = isCardMatched(index);

            return (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                disabled={flipped}
                className={`
                  aspect-square rounded-xl font-bold text-xl transition-all duration-300 transform
                  ${flipped ? 'rotate-0' : 'rotate-y-180'}
                  ${matched ? 'bg-green-100 border-4 border-green-500' : 'bg-blue-500 hover:bg-blue-600 border-4 border-blue-600'}
                  ${!flipped ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                `}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {flipped ? (
                    <span className={matched ? 'text-green-700' : 'text-gray-800'}>
                      {card.content}
                    </span>
                  ) : (
                    <span className="text-white text-3xl">?</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          💡 Mẹo: Ghi nhớ vị trí các thẻ để tìm cặp nhanh hơn
        </div>
      </div>
    </div>
  );
}
