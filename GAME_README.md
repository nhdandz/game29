# 🇻🇳 HÀNH TRÌNH ĐỘC LẬP - Game Giáo Dục Lịch Sử Việt Nam

Game mobile web giáo dục về lịch sử ngày Quốc Khánh 2/9, người chơi "du hành ngược thời gian" qua 5 mốc lịch sử quan trọng từ 1930 đến 1945.

## 🎮 Tính năng

### Core Gameplay
- **5 màn chơi** tương ứng với 5 mốc lịch sử quan trọng
- **5 loại mini-game** khác nhau: Quiz, Ghép hình, Sắp xếp timeline, Memory match, Điền chỗ trống
- **Progressive unlock**: Phải hoàn thành màn trước để mở khóa màn sau
- **Điểm số & thành tích**: Tổng điểm tối đa 550, có 4 huy hiệu để mở khóa
- **Auto-save**: Tiến độ tự động lưu vào localStorage

### Các màn chơi

1. **1930 - Thành lập Đảng** (Quiz - 100 điểm)
   - 5 câu hỏi trắc nghiệm về Đảng Cộng sản Việt Nam
   - Giới hạn thời gian: 15s/câu

2. **1940 - Mặt trận Việt Minh** (Ghép hình - 80 điểm)
   - Ghép 4 cặp hình ảnh với mô tả
   - Không giới hạn thời gian

3. **1941 - Bác Hồ về nước** (Sắp xếp timeline - 100 điểm)
   - Sắp xếp 5 sự kiện theo đúng thứ tự
   - Drag & drop interface

4. **Tháng 8/1945 - Tổng khởi nghĩa** (Memory match - 120 điểm)
   - Lật bài tìm 6 cặp giống nhau
   - Điểm phạt theo số lượt chơi

5. **Ngày 2/9/1945 - Tuyên ngôn Độc lập** (Điền chỗ trống - 150 điểm)
   - Hoàn thành câu văn từ Tuyên ngôn Độc lập
   - Word bank để chọn từ

## 🏆 Hệ thống thành tích

- **Bước đầu tiên**: Hoàn thành màn chơi đầu tiên
- **Hoàn thành hành trình**: Hoàn thành tất cả 5 mốc lịch sử
- **Điểm tuyệt đối**: Đạt điểm tối đa 550/550
- **Tốc độ ánh sáng**: Hoàn thành game trong dưới 30 phút

## 🛠️ Công nghệ

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: localStorage
- **Animations**: CSS animations + Tailwind transitions

## 📁 Cấu trúc Project

```
src/
├── app/
│   ├── page.tsx                    # Home screen với splash
│   ├── timeline/page.tsx           # Timeline map với 5 nodes
│   ├── game/[id]/page.tsx         # Dynamic game page
│   ├── victory/page.tsx           # Victory screen
│   ├── achievements/page.tsx      # Trang thành tích
│   ├── history/page.tsx           # Trang lịch sử chi tiết
│   └── globals.css                # Global styles + animations
├── components/
│   └── games/
│       ├── QuizGame.tsx           # Quiz component
│       ├── ImageMatchGame.tsx     # Image matching component
│       ├── TimelineSortGame.tsx   # Timeline sorting component
│       ├── MemoryMatchGame.tsx    # Memory match component
│       └── FillBlankGame.tsx      # Fill blanks component
├── types/
│   └── game.ts                    # TypeScript interfaces
├── data/
│   └── milestones.ts              # Game data (5 milestones)
└── lib/
    └── gameStorage.ts             # localStorage service
```

## 🚀 Chạy dự án

1. **Cài đặt dependencies**:
```bash
npm install
```

2. **Chạy dev server**:
```bash
npm run dev
```

3. **Mở trình duyệt**:
```
http://localhost:3001
```

4. **Build production**:
```bash
npm run build
npm start
```

## 🎯 User Flow

1. **Splash Screen** (2s) → Hiển thị logo và tiêu đề
2. **Home Screen** → Menu với các nút:
   - Bắt đầu chơi / Tiếp tục
   - Xem bản đồ
   - Thành tích
   - Lịch sử
3. **Timeline Map** → Hiển thị 5 nodes theo chiều dọc
   - Node đã hoàn thành: màu xanh ✓
   - Node hiện tại: sáng + có thể click
   - Node chưa mở: màu xám 🔒
4. **Mini-game** → Chơi game tương ứng với mốc lịch sử
5. **Info Popup** → Hiển thị điểm số + kiến thức lịch sử
6. **Victory Screen** → Hiển thị tổng kết khi hoàn thành tất cả

## 📱 Responsive Design

- Mobile-first approach
- Tối ưu cho màn hình điện thoại (320px - 768px)
- Hỗ trợ tablet và desktop
- Touch-friendly interface

## 🎨 Design System

### Colors
- **Primary**: Red (#DC2626) - Đỏ cờ Việt Nam
- **Secondary**: Yellow (#EAB308) - Vàng sao
- **Success**: Green (#16A34A)
- **Info**: Blue (#2563EB)

### Typography
- Font: System fonts (Arial, Helvetica, sans-serif)
- Tiếng Việt hỗ trợ đầy đủ

### Animations
- Fade in: 0.5s
- Slide up: 0.5s
- Pulse glow: 2s infinite
- Bounce effects cho icons

## 💾 Data Storage

Game sử dụng localStorage để lưu:
- Màn chơi hiện tại
- Danh sách màn đã hoàn thành
- Điểm số từng màn
- Tổng điểm
- Tổng thời gian chơi
- Danh sách huy hiệu
- Thời gian chơi lần cuối

## 🔧 Customization

Để thay đổi nội dung game, chỉnh sửa file:
```
src/data/milestones.ts
```

Có thể:
- Thay đổi câu hỏi quiz
- Thêm/sửa nội dung lịch sử
- Điều chỉnh điểm số
- Thay đổi thời gian giới hạn

## 📝 TODO / Cải tiến

- [ ] Thêm âm thanh/nhạc nền
- [ ] Thêm hình ảnh lịch sử thực tế
- [ ] Tích hợp share social media
- [ ] Thêm leaderboard (yêu cầu backend)
- [ ] Hỗ trợ nhiều ngôn ngữ
- [ ] Thêm chế độ practice (luyện tập)

## 📄 License

Dự án giáo dục - Sử dụng tự do cho mục đích học tập

## 🙏 Credits

Game được tạo ra nhằm mục đích giáo dục, giúp học sinh và người dân hiểu rõ hơn về lịch sử đấu tranh giành độc lập của dân tộc Việt Nam.

---

**Chúc bạn có trải nghiệm học tập thú vị!** 🎮🇻🇳
