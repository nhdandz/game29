'use client';

import Link from 'next/link';
import { MILESTONES } from '@/data/milestones';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-yellow-500 to-red-700 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-lg font-medium transition-colors">
              ← Trang chủ
            </button>
          </Link>
        </div>

        {/* Title */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Lịch sử Việt Nam 1930-1945
          </h1>
          <p className="text-gray-600">
            Hành trình đấu tranh giành độc lập dân tộc
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/30 transform md:-translate-x-1/2 hidden" />

          {MILESTONES.map((milestone, index) => (
            <div
              key={milestone.id}
              className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Date and Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  {milestone.icon}
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    {milestone.day && `${milestone.day}/`}
                    {milestone.month && `${milestone.month}/`}
                    {milestone.year}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {milestone.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 text-lg">
                {milestone.description}
              </p>

              {/* Detailed Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4">
                <h3 className="font-bold text-blue-900 mb-2">
                  {milestone.infoTitle}
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">
                  {milestone.infoText}
                </p>
              </div>

              {/* Game Type Badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                  🎮 {milestone.gameType === 'quiz' && 'Trắc nghiệm'}
                  {milestone.gameType === 'image-match' && 'Ghép hình'}
                  {milestone.gameType === 'timeline-sort' && 'Sắp xếp timeline'}
                  {milestone.gameType === 'memory' && 'Lật bài'}
                  {milestone.gameType === 'fill-blank' && 'Điền chỗ trống'}
                </span>
                <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium">
                  ⭐ {milestone.maxScore} điểm
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🇻🇳 Ý nghĩa lịch sử
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Từ năm 1930 khi Đảng Cộng sản Việt Nam ra đời đến ngày 2/9/1945 khi nước Việt Nam Dân chủ Cộng hòa được thành lập,
            dân tộc Việt Nam đã trải qua 15 năm đấu tranh gian khổ nhưng vẻ vang. Dưới sự lãnh đạo sáng suốt của Đảng và
            Chủ tịch Hồ Chí Minh, nhân dân ta đã giành được độc lập, tự do - điều thiêng liêng và cao quý nhất.
          </p>
          <div className="mt-6">
            <Link href="/timeline">
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                🎮 Trải nghiệm hành trình
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
