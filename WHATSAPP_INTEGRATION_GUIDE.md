# Hướng Dẫn Tích Hợp WhatsApp Business API

Hướng dẫn này sẽ giúp bạn thiết lập WhatsApp Business API để nhận thông báo khi có form mới được điền.

## 🚀 Tổng Quan

Khi người dùng điền form `BasicInfoForm`, hệ thống sẽ:
1. Lưu dữ liệu vào Google Sheets
2. Gửi thông báo WhatsApp đến số điện thoại được cấu hình

## 📋 Yêu Cầu

- Tài khoản Facebook Business
- WhatsApp Business Account
- Số điện thoại WhatsApp Business đã được xác minh

## 🔧 Bước 1: Tạo WhatsApp Business App

### 1.1 Truy cập Facebook Developers
1. Đi đến [Facebook Developers](https://developers.facebook.com/)
2. Đăng nhập với tài khoản Facebook Business
3. Nhấp "My Apps" → "Create App"

### 1.2 Tạo App Mới
1. Chọn "Business" làm app type
2. Điền thông tin app:
   - **App Name**: Tên ứng dụng của bạn
   - **App Contact Email**: Email liên hệ
   - **Business Account**: Chọn tài khoản business

### 1.3 Thêm WhatsApp Product
1. Trong dashboard app, tìm "WhatsApp"
2. Nhấp "Set up" để thêm WhatsApp vào app

## 🔧 Bước 2: Cấu Hình WhatsApp Business API

### 2.1 Lấy Access Token
1. Trong WhatsApp → Getting Started
2. Copy **Temporary Access Token** (24h)
3. Để sử dụng lâu dài, tạo **System User Access Token**:
   - Đi đến Business Settings → System Users
   - Tạo System User mới
   - Assign WhatsApp permissions
   - Generate Access Token

### 2.2 Lấy Phone Number ID
1. Trong WhatsApp → Getting Started
2. Copy **Phone Number ID** từ "From" field

### 2.3 Xác Minh Webhook (Tùy chọn)
Nếu muốn nhận webhook từ WhatsApp:
1. Trong WhatsApp → Configuration
2. Thêm Webhook URL: `https://yourdomain.com/api/whatsapp/webhook`
3. Verify Token: Tạo token bí mật

## 🔧 Bước 3: Cấu Hình Biến Môi Trường

Thêm các biến sau vào file `.env.local`:

```env
# WhatsApp Business API Configuration
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_RECIPIENT_PHONE_NUMBER=84987654321
```

### Giải Thích Biến:
- `WHATSAPP_API_URL`: URL API của Facebook Graph (mặc định v18.0)
- `WHATSAPP_PHONE_NUMBER_ID`: ID số điện thoại WhatsApp Business
- `WHATSAPP_ACCESS_TOKEN`: Access token để gọi API
- `WHATSAPP_RECIPIENT_PHONE_NUMBER`: Số điện thoại nhận thông báo (định dạng: 84xxxxxxxxx)

## 🔧 Bước 4: Test Cấu Hình

### 4.1 Kiểm Tra Cấu Hình
```bash
curl http://localhost:5713/api/whatsapp/
```

Kết quả mong đợi:
```json
{
  "success": true,
  "message": "WhatsApp configuration status",
  "config": {
    "hasPhoneNumberId": true,
    "hasAccessToken": true,
    "hasRecipientNumber": true,
    "apiUrl": "https://graph.facebook.com/v18.0"
  }
}
```

### 4.2 Test Gửi Tin Nhắn
```bash
curl -X POST http://localhost:5713/api/whatsapp/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "phone": "0987654321",
    "company": "Công ty ABC",
    "email": "test@example.com",
    "requirements": "Test requirement",
    "requirementDetails": "Test details"
  }'
```

## 📱 Bước 5: Định Dạng Tin Nhắn

Tin nhắn WhatsApp sẽ có định dạng:

```
🔔 THÔNG BÁO FORM MỚI

👤 Họ tên: Nguyễn Văn A
📞 Điện thoại: 0987654321
🏢 Công ty: Công ty ABC
📧 Email: test@example.com
📋 Nhu cầu: Công cụ tạo Minigame
📝 Chi tiết: Cần phát triển hệ thống...
⏰ Thời gian: 27/07/2025, 09:00:00
```

## 🔧 Bước 6: Tùy Chỉnh (Tùy chọn)

### 6.1 Thay Đổi Template Tin Nhắn
Chỉnh sửa file `src/app/api/whatsapp/route.js`:

```javascript
const message = `🔔 *THÔNG BÁO FORM MỚI*\n\n` +
  `👤 *Họ tên:* ${formData.name}\n` +
  // Thêm/sửa các trường khác...
```

### 6.2 Gửi Đến Nhiều Số
Sửa đổi để gửi đến nhiều người nhận:

```javascript
const recipients = [
  process.env.WHATSAPP_RECIPIENT_1,
  process.env.WHATSAPP_RECIPIENT_2
];

for (const recipient of recipients) {
  // Gửi tin nhắn đến từng người
}
```

### 6.3 Thêm Media (Hình ảnh, File)
```javascript
// Gửi kèm hình ảnh
body: JSON.stringify({
  messaging_product: 'whatsapp',
  to: RECIPIENT_PHONE_NUMBER,
  type: 'image',
  image: {
    link: 'https://example.com/image.jpg',
    caption: 'Form submission details'
  }
})
```

## 🚨 Lưu Ý Quan Trọng

### Giới Hạn API
- **Free Tier**: 1000 tin nhắn/tháng
- **Rate Limit**: 80 requests/giây
- **Message Limit**: 4096 ký tự/tin nhắn

### Bảo Mật
- **KHÔNG** commit Access Token vào Git
- Sử dụng System User Token thay vì Temporary Token
- Định kỳ rotate Access Token
- Kiểm tra webhook signature nếu sử dụng

### Compliance
- Tuân thủ WhatsApp Business Policy
- Chỉ gửi tin nhắn có liên quan
- Cung cấp cách opt-out cho người dùng

## 🔍 Troubleshooting

### Lỗi Thường Gặp

**1. "Invalid phone number"**
- Kiểm tra định dạng số điện thoại (84xxxxxxxxx)
- Đảm bảo số điện thoại có WhatsApp

**2. "Access token expired"**
- Tạo System User Access Token mới
- Cập nhật biến môi trường

**3. "Phone number not verified"**
- Xác minh số điện thoại trong Facebook Business
- Hoàn tất Business Verification

**4. "Rate limit exceeded"**
- Giảm tần suất gửi tin nhắn
- Implement queue system

### Debug
Kiểm tra logs trong browser console và server logs để debug:

```javascript
// Trong BasicInfoForm.js
console.log('WhatsApp notification sent successfully');
console.warn('WhatsApp notification failed:', whatsappResult.error);
```

## 📞 Hỗ Trợ

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Facebook Business Help Center](https://www.facebook.com/business/help)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)

---

**Lưu ý**: Hướng dẫn này sử dụng WhatsApp Business API miễn phí. Để sử dụng production, cần đăng ký WhatsApp Business Platform và có thể phát sinh chi phí.