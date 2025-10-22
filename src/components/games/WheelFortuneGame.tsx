'use client';

import { useState, useEffect } from 'react';
import type { WheelFortunePuzzle, HintOption } from '@/types/game';

interface WheelFortuneGameProps {
  puzzle: WheelFortunePuzzle;
  onComplete: (score: number, playTime: number) => void;
}

// Vietnamese alphabet
const VIETNAMESE_ALPHABET = 'AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY';

// Available hints
const HINTS: HintOption[] = [
  {
    id: 'reveal-letter',
    name: 'Mở 1 chữ cái',
    description: 'Mở ngẫu nhiên 1 chữ cái chưa đoán',
    cost: 10,
    icon: '💡'
  },
  {
    id: 'reveal-vowel',
    name: 'Mở 1 nguyên âm',
    description: 'Mở ngẫu nhiên 1 nguyên âm (A,Ă,Â,E,Ê,I,O,Ô,Ơ,U,Ư,Y)',
    cost: 15,
    icon: '🔤'
  },
  {
    id: 'remove-wrong',
    name: 'Loại bỏ chữ sai',
    description: 'Loại bỏ 50% chữ cái không có trong câu',
    cost: 20,
    icon: '❌'
  },
  {
    id: 'reveal-word',
    name: 'Mở 1 từ',
    description: 'Mở ngẫu nhiên 1 từ hoàn chỉnh',
    cost: 25,
    icon: '⭐'
  }
];

const VOWELS = ['A', 'Ă', 'Â', 'E', 'Ê', 'I', 'O', 'Ô', 'Ơ', 'U', 'Ư', 'Y'];

export default function WheelFortuneGame({ puzzle, onComplete }: WheelFortuneGameProps) {
  const [startTime] = useState(Date.now());
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [currentScore, setCurrentScore] = useState(100);
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showHintMenu, setShowHintMenu] = useState(false);
  const [removedLetters, setRemovedLetters] = useState<Set<string>>(new Set());

  // Normalize phrase (remove diacritics for comparison, keep original for display)
  const normalizeChar = (char: string): string => {
    return char.toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/Đ/g, 'D');
  };

  const phraseUpper = puzzle.phrase.toUpperCase();
  const uniqueLetters = new Set(
    phraseUpper
      .split('')
      .filter(char => /[A-ZĂÂĐÊÔƠƯÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬÉÈẺẼẸẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢÚÙỦŨỤỨỪỬỮỰÝỲỶỸỴ]/i.test(char))
      .map(normalizeChar)
  );

  // Check if puzzle is solved
  const isSolved = Array.from(uniqueLetters).every(letter => guessedLetters.has(letter));

  useEffect(() => {
    if (isSolved) {
      const playTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeout(() => onComplete(Math.max(0, currentScore), playTime), 1000);
    }
  }, [isSolved, currentScore, startTime, onComplete]);

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter) || removedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    // Check if letter is in phrase
    const isCorrect = uniqueLetters.has(letter);

    if (!isCorrect) {
      setWrongGuesses(prev => prev + 1);
      setCurrentScore(prev => Math.max(0, prev - 5));
    }
  };

  const handleHint = (hintId: string) => {
    const hint = HINTS.find(h => h.id === hintId);
    if (!hint || currentScore < hint.cost) return;

    setCurrentScore(prev => prev - hint.cost);
    setUsedHints(prev => [...prev, hintId]);
    setShowHintMenu(false);

    const unguessedLetters = Array.from(uniqueLetters).filter(l => !guessedLetters.has(l));

    switch (hintId) {
      case 'reveal-letter':
        if (unguessedLetters.length > 0) {
          const randomLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
          setGuessedLetters(prev => new Set([...prev, randomLetter]));
        }
        break;

      case 'reveal-vowel':
        const unguessedVowels = unguessedLetters.filter(l => VOWELS.includes(l));
        if (unguessedVowels.length > 0) {
          const randomVowel = unguessedVowels[Math.floor(Math.random() * unguessedVowels.length)];
          setGuessedLetters(prev => new Set([...prev, randomVowel]));
        }
        break;

      case 'remove-wrong':
        const wrongLetters = Array.from(VIETNAMESE_ALPHABET)
          .filter(l => !uniqueLetters.has(l) && !guessedLetters.has(l));
        const toRemove = wrongLetters.slice(0, Math.ceil(wrongLetters.length / 2));
        setRemovedLetters(prev => new Set([...prev, ...toRemove]));
        break;

      case 'reveal-word':
        // Find a word that's not fully revealed
        const words = phraseUpper.split(/\s+/);
        const hiddenWords = words.filter(word => {
          const wordLetters = word.split('').filter(c => /[A-ZĂÂĐÊÔƠƯ]/i.test(c)).map(normalizeChar);
          return wordLetters.some(l => !guessedLetters.has(l));
        });

        if (hiddenWords.length > 0) {
          const randomWord = hiddenWords[Math.floor(Math.random() * hiddenWords.length)];
          const wordLetters = randomWord.split('').filter(c => /[A-ZĂÂĐÊÔƠƯ]/i.test(c)).map(normalizeChar);
          setGuessedLetters(prev => new Set([...prev, ...wordLetters]));
        }
        break;
    }
  };

  const renderPhrase = () => {
    return phraseUpper.split('').map((char, index) => {
      const isLetter = /[A-ZĂÂĐÊÔƠƯÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬÉÈẺẼẸẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢÚÙỦŨỤỨỪỬỮỰÝỲỶỸỴ]/i.test(char);
      const normalizedChar = normalizeChar(char);
      const isRevealed = guessedLetters.has(normalizedChar);

      if (!isLetter) {
        return (
          <span key={index} className="inline-block mx-1 text-2xl md:text-3xl font-bold text-gray-400">
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      }

      return (
        <span
          key={index}
          className={`
            inline-block mx-0.5 md:mx-1 w-8 md:w-12 h-10 md:h-14
            border-b-4 border-blue-500
            text-2xl md:text-3xl font-bold text-center
            transition-all duration-300
            ${isRevealed ? 'text-blue-900 scale-110' : 'text-transparent'}
          `}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-2 md:px-6 py-2 md:py-4 space-y-3 md:space-y-6">
      {/* Score and Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="bg-white/90 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg text-center">
          <div className="text-xs md:text-sm text-gray-600">Điểm hiện tại</div>
          <div className="text-xl md:text-3xl font-bold text-yellow-600">{currentScore}</div>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg text-center">
          <div className="text-xs md:text-sm text-gray-600">Đoán sai</div>
          <div className="text-xl md:text-3xl font-bold text-red-600">{wrongGuesses}</div>
        </div>
        <div className="bg-white/90 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg text-center">
          <div className="text-xs md:text-sm text-gray-600">Tiến độ</div>
          <div className="text-xl md:text-3xl font-bold text-green-600">
            {Math.round((guessedLetters.size / uniqueLetters.size) * 100)}%
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-4 md:p-8 shadow-2xl">
        {/* Category */}
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 md:px-6 py-2 rounded-full font-bold text-sm md:text-base">
            📂 {puzzle.category}
          </div>
          {puzzle.hint && (
            <div className="mt-2 text-xs md:text-sm text-gray-600 italic">
              💡 Gợi ý: {puzzle.hint}
            </div>
          )}
        </div>

        {/* Phrase Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-8 mb-6 min-h-[120px] md:min-h-[150px] flex items-center justify-center">
          <div className="text-center leading-relaxed flex flex-wrap justify-center">
            {renderPhrase()}
          </div>
        </div>

        {/* Hint Button */}
        <div className="mb-4 md:mb-6 text-center">
          <button
            onClick={() => setShowHintMenu(!showHintMenu)}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all text-sm md:text-base"
          >
            💰 Sử dụng gợi ý ({currentScore} điểm)
          </button>
        </div>

        {/* Hint Menu */}
        {showHintMenu && (
          <div className="mb-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 md:p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-base md:text-lg">Chọn gợi ý:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {HINTS.map(hint => (
                <button
                  key={hint.id}
                  onClick={() => handleHint(hint.id)}
                  disabled={currentScore < hint.cost}
                  className={`
                    p-3 md:p-4 rounded-xl text-left transition-all
                    ${currentScore >= hint.cost
                      ? 'bg-white hover:bg-yellow-100 border-2 border-yellow-400 cursor-pointer hover:scale-105'
                      : 'bg-gray-100 border-2 border-gray-300 opacity-50 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl">{hint.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-gray-800 text-sm md:text-base">{hint.name}</div>
                      <div className="text-xs md:text-sm text-gray-600">{hint.description}</div>
                    </div>
                    <div className="bg-yellow-500 text-white font-bold px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                      {hint.cost}đ
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 text-xs md:text-sm text-gray-600 text-center">
              Lưu ý: Sử dụng gợi ý sẽ trừ điểm tương ứng
            </div>
          </div>
        )}

        {/* Keyboard */}
        <div className="space-y-2">
          <div className="text-center text-xs md:text-sm text-gray-600 mb-2">
            Chọn chữ cái:
          </div>
          <div className="flex flex-wrap justify-center gap-1 md:gap-2">
            {Array.from(VIETNAMESE_ALPHABET).map(letter => {
              const isGuessed = guessedLetters.has(letter);
              const isCorrect = uniqueLetters.has(letter);
              const isRemoved = removedLetters.has(letter);

              return (
                <button
                  key={letter}
                  onClick={() => handleLetterGuess(letter)}
                  disabled={isGuessed || isRemoved}
                  className={`
                    w-8 h-8 md:w-12 md:h-12 rounded-lg font-bold text-sm md:text-xl
                    transition-all duration-300 transform
                    ${isGuessed && isCorrect ? 'bg-green-500 text-white scale-110' : ''}
                    ${isGuessed && !isCorrect ? 'bg-red-500 text-white opacity-50' : ''}
                    ${isRemoved ? 'bg-gray-300 text-gray-500 opacity-30 line-through' : ''}
                    ${!isGuessed && !isRemoved ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-110 cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-500">
          <p>🎯 Đoán đúng: giữ nguyên điểm | ❌ Đoán sai: -5 điểm | 💡 Dùng gợi ý: trừ điểm tương ứng</p>
        </div>
      </div>
    </div>
  );
}
