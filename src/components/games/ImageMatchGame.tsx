'use client';

import { useState } from 'react';
import type { ImagePair } from '@/types/game';

interface ImageMatchGameProps {
  pairs: ImagePair[];
  onComplete: (score: number, playTime: number) => void;
}

export default function ImageMatchGame({ pairs, onComplete }: ImageMatchGameProps) {
  const [startTime] = useState(Date.now());
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const maxScore = 80;
  const pointsPerPair = maxScore / pairs.length;

  const images = pairs.map(p => ({ id: p.id, content: p.imageUrl, type: 'image' as const }));
  const texts = pairs.map(p => ({ id: p.id, content: p.text, type: 'text' as const }));

  const shuffledTexts = [...texts].sort(() => Math.random() - 0.5);

  const handleImageClick = (id: string) => {
    if (matches[id]) return;
    setSelectedImage(id);

    if (selectedText) {
      // Check if match
      if (id === selectedText) {
        setMatches(prev => ({ ...prev, [id]: selectedText }));
        setSelectedImage(null);
        setSelectedText(null);

        // Check if all matched
        if (Object.keys(matches).length + 1 === pairs.length) {
          const playTime = Math.floor((Date.now() - startTime) / 1000);
          setTimeout(() => onComplete(maxScore, playTime), 500);
        }
      } else {
        // Wrong match, reset after delay
        setTimeout(() => {
          setSelectedImage(null);
          setSelectedText(null);
        }, 1000);
      }
    }
  };

  const handleTextClick = (id: string) => {
    if (Object.values(matches).includes(id)) return;
    setSelectedText(id);

    if (selectedImage) {
      // Check if match
      if (id === selectedImage) {
        setMatches(prev => ({ ...prev, [selectedImage]: id }));
        setSelectedImage(null);
        setSelectedText(null);

        // Check if all matched
        if (Object.keys(matches).length + 1 === pairs.length) {
          const playTime = Math.floor((Date.now() - startTime) / 1000);
          setTimeout(() => onComplete(maxScore, playTime), 500);
        }
      } else {
        // Wrong match, reset after delay
        setTimeout(() => {
          setSelectedImage(null);
          setSelectedText(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Progress */}
      <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-900">
            Đã ghép: {Object.keys(matches).length}/{pairs.length}
          </div>
          <div className="text-lg font-bold text-yellow-600">
            {Math.round(Object.keys(matches).length * pointsPerPair)}/80 điểm
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(matches).length / pairs.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Game Area */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Nối hình ảnh với mô tả phù hợp
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 mb-3">Hình ảnh</h3>
            {images.map(img => {
              const isMatched = !!matches[img.id];
              const isSelected = selectedImage === img.id;
              const matchedText = matches[img.id];
              return (
                <button
                  key={img.id}
                  onClick={() => handleImageClick(img.id)}
                  disabled={isMatched}
                  className={`
                    w-full p-4 rounded-xl font-medium transition-all text-left
                    ${isMatched ? 'bg-green-100 border-2 border-green-500 opacity-75' : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'}
                    ${isSelected ? 'ring-4 ring-blue-500 scale-105' : ''}
                    ${!isMatched ? 'cursor-pointer transform hover:scale-102' : 'cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl text-black !important">{img.content}</span>
                    {isMatched && <span className="text-green-600 text-xl">✓</span>}
                    {matchedText && (
                      <span className="text-sm text-black flex-1">
                        → {texts.find(t => t.id === matchedText)?.content}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Texts Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Mô tả</h3>
            {shuffledTexts.map(text => {
              const isMatched = Object.values(matches).includes(text.id);
              const isSelected = selectedText === text.id;

              return (
                <button
                  key={text.id}
                  onClick={() => handleTextClick(text.id)}
                  disabled={isMatched}
                  className={`
                    w-full p-4 rounded-xl font-medium transition-all text-left
                    ${isMatched ? 'bg-green-100 border-2 border-green-500 opacity-75' : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'}
                    ${isSelected ? 'ring-4 ring-blue-500 scale-105' : ''}
                    ${!isMatched ? 'cursor-pointer transform hover:scale-102' : 'cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1">{text.content}</span>
                    {isMatched && <span className="text-green-600 text-xl">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          💡 Mẹo: Chọn một hình ảnh, sau đó chọn mô tả phù hợp
        </div>
      </div>
    </div>
  );
}
