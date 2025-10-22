# Hướng dẫn thêm ảnh nhân vật

Thư mục này chứa các ảnh nhân vật cho hệ thống tiến hóa nhân vật trong game "Hành Trình Độc Lập".

## 📁 Cấu trúc file cần thêm

Bạn cần thêm **6 ảnh** cho 6 cấp độ nhân vật (từ 0 đến 5):

```
public/characters/
├── level-0.png  (Khởi Đầu Hành Trình)
├── level-1.png  (Người Khởi Đầu - 1930)
├── level-2.png  (Chiến Sĩ Việt Minh - 1940-1941)
├── level-3.png  (Chiến Sĩ Tổng Khởi Nghĩa - 1945/8)
├── level-4.png  (Công Dân Nước Độc Lập - 2/9/1945)
└── level-5.png  (Anh Hùng Dân Tộc - Hoàn thành)
```

## 🎨 Gợi ý thiết kế cho mỗi cấp độ

### Level 0: Khởi Đầu Hành Trình 🌱
- **Màu chủ đạo**: Xám (#9CA3AF)
- **Mô tả**: Silhouette hoặc hình ảnh mờ của một người
- **Concept**: Chưa bắt đầu, bí ẩn
- **Tỷ lệ khuyên dùng**: 1:1 (vuông), ít nhất 512x512px

### Level 1: Người Khởi Đầu (1930) 🏛️
- **Màu chủ đạo**: Đỏ (#EF4444)
- **Mô tả**: Thanh niên yêu nước mặc áo dân thường thời 1930
- **Chi tiết**: Áo dài truyền thống hoặc quần áo đơn giản, nét mặt quyết tâm
- **Background**: Có thể có biểu tượng Đảng Cộng sản hoặc sách vở

### Level 2: Chiến Sĩ Việt Minh (1940-1941) 🚩
- **Màu chủ đạo**: Vàng hổ phách (#F59E0B)
- **Mô tả**: Chiến sĩ mặc áo đen, đội nón lá, cầm cờ đỏ sao vàng
- **Chi tiết**: Trang phục chiến đấu đơn giản, có thể có khăn rằn
- **Background**: Núi rừng Việt Bắc, căn cứ địa

### Level 3: Chiến Sĩ Tổng Khởi Nghĩa (Tháng 8/1945) ⚔️
- **Màu chủ đạo**: Xanh lá (#10B981)
- **Mô tả**: Chiến sĩ mặc áo xanh quân đội, cầm súng trường
- **Chi tiết**: Trang phục quân đội đầy đủ hơn, có thể có huy hiệu sao vàng
- **Background**: Cờ đỏ sao vàng tung bay, khí thế hào hùng

### Level 4: Công Dân Nước Độc Lập (2/9/1945) 🇻🇳
- **Màu chủ đạo**: Xanh dương (#3B82F6)
- **Mô tả**: Người dân trong ngày Độc lập, mặc áo trắng, đứng dưới cờ
- **Chi tiết**: Nét mặt hạnh phúc, rạng rỡ, cầm hoa hoặc cờ nhỏ
- **Background**: Quảng trường Ba Đình, đám đông ăn mừng

### Level 5: Anh Hùng Dân Tộc (Hoàn thành) 🏆
- **Màu chủ đạo**: Tím (#8B5CF6)
- **Mô tả**: Hình ảnh anh hùng được tôn vinh, mặc đồng phục lịch lãm
- **Chi tiết**: Có huy chương, ánh hào quang, tư thế tự hào
- **Background**: Hiệu ứng ánh sáng, pháo hoa, biểu tượng chiến thắng

## 📐 Thông số kỹ thuật

### Kích thước ảnh
- **Tối thiểu**: 512x512px
- **Khuyến nghị**: 1024x1024px hoặc lớn hơn
- **Tỷ lệ**: 1:1 (hình vuông)
- **Format**: PNG (với nền trong suốt) hoặc JPG

### Phong cách nghệ thuật
- **Illustration/Vector art**: Phù hợp nhất, dễ scale
- **Cartoon/Anime**: Sinh động, hấp dẫn
- **Realistic art**: Tạo cảm giác chân thực
- **Pixel art**: Retro, độc đáo

### Nền (Background)
- **Trong suốt (PNG)**: Linh hoạt nhất, khuyên dùng
- **Gradient**: Tạo chiều sâu
- **Solid color**: Đơn giản, gọn gàng

## 🎯 Lưu ý quan trọng

1. **Nếu không có ảnh**: Game vẫn hoạt động bình thường và sẽ hiển thị emoji thay thế
2. **Tên file phải chính xác**: `level-0.png`, `level-1.png`, etc.
3. **Nội dung phải phù hợp**: Liên quan đến lịch sử cách mạng Việt Nam
4. **Tôn trọng lịch sử**: Không sử dụng hình ảnh phản cảm hoặc không phù hợp

## 🖼️ Cách tạo ảnh

### Sử dụng AI Art Generators
- **DALL-E**: https://openai.com/dall-e-2
- **Midjourney**: https://www.midjourney.com
- **Stable Diffusion**: https://stablediffusionweb.com

#### Ví dụ prompt cho Level 1:
```
Vietnamese young revolutionary man in 1930s traditional clothing,
determined expression, holding books, simple background,
illustration style, red color theme, historical, patriotic
```

### Sử dụng công cụ thiết kế
- **Canva**: Dễ sử dụng, có template
- **Figma**: Chuyên nghiệp, linh hoạt
- **Adobe Illustrator**: Vector art chất lượng cao
- **Photoshop**: Chỉnh sửa chi tiết

### Tìm ảnh có sẵn
- **Unsplash/Pexels**: Ảnh miễn phí chất lượng cao
- **Freepik**: Vector illustrations miễn phí
- **Pixabay**: Đa dạng hình ảnh

⚠️ **Lưu ý bản quyền**: Chỉ sử dụng ảnh bạn có quyền hoặc ảnh miễn phí bản quyền

## 🧪 Test ảnh của bạn

Sau khi thêm ảnh:
1. Chạy lại game (refresh browser)
2. Vào Timeline page
3. Kiểm tra xem ảnh nhân vật có hiển thị đúng không
4. Chơi game và xem animation khi level up

## 💡 Tips

- Giữ style nhất quán cho tất cả 6 level
- Sử dụng cùng tỷ lệ và kích thước
- Màu sắc nên tương ứng với theme của mỗi level
- Có thể thêm hiệu ứng ánh sáng/shadow để tăng chiều sâu

---

**Chúc bạn tạo được những nhân vật đẹp cho game! 🎨🇻🇳**
