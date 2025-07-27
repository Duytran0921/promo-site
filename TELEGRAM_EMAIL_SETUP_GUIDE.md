# Hướng dẫn thiết lập Telegram Bot và Email Notifications

Vì bạn không có WhatsApp Business API, chúng ta sẽ sử dụng **Telegram Bot** (miễn phí) và **Email** (backup) để nhận thông báo khi có form mới.

## 🤖 Thiết lập Telegram Bot (Khuyến nghị - Miễn phí)

### Bước 1: Tạo Telegram Bot

1. **Mở Telegram** và tìm kiếm `@BotFather`
2. **Bắt đầu chat** với BotFather bằng cách gửi `/start`
3. **Tạo bot mới** bằng lệnh `/newbot`
4. **Đặt tên** cho bot của bạn (ví dụ: "PromoGame Notifications")
5. **Đặt username** cho bot (phải kết thúc bằng "bot", ví dụ: "promogame_notifications_bot")
6. **Lưu Bot Token** mà BotFather cung cấp (dạng: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Bước 2: Lấy Chat ID

**Cách 1: Sử dụng @userinfobot**
1. Tìm kiếm `@userinfobot` trên Telegram
2. Gửi `/start` để lấy User ID của bạn
3. Sao chép số ID (ví dụ: `123456789`)

**Cách 2: Sử dụng API**
1. Gửi tin nhắn cho bot của bạn
2. Truy cập: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Tìm `"chat":{"id":123456789}` trong response

### Bước 3: Cấu hình Environment Variables

Thêm vào file `.env.local`:
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

### Bước 4: Test Telegram Bot

1. **Kiểm tra cấu hình:**
   ```bash
   curl http://localhost:3000/api/telegram/
   ```

2. **Test gửi thông báo:**
   ```bash
   curl -X POST http://localhost:3000/api/telegram/ \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "phone": "0123456789",
       "company": "Test Company",
       "email": "test@example.com",
       "requirements": "Test requirement",
       "requirementDetails": "Test details"
     }'
   ```

---

## 📧 Thiết lập Email Notifications (Backup)

### Bước 1: Cấu hình Gmail (Khuyến nghị)

1. **Bật 2-Factor Authentication** cho Gmail:
   - Vào [Google Account Security](https://myaccount.google.com/security)
   - Bật "2-Step Verification"

2. **Tạo App Password:**
   - Vào [App Passwords](https://myaccount.google.com/apppasswords)
   - Chọn "Mail" và "Other (Custom name)"
   - Đặt tên "PromoGame Notifications"
   - Sao chép mật khẩu 16 ký tự được tạo

### Bước 2: Cài đặt Nodemailer

```bash
npm install nodemailer
```

### Bước 3: Cấu hình Environment Variables

Thêm vào file `.env.local`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=recipient@example.com
```

### Bước 4: Test Email

1. **Kiểm tra cấu hình:**
   ```bash
   curl http://localhost:3000/api/email/
   ```

2. **Test gửi email:**
   ```bash
   curl -X POST http://localhost:3000/api/email/ \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "phone": "0123456789",
       "company": "Test Company",
       "email": "test@example.com",
       "requirements": "Test requirement",
       "requirementDetails": "Test details"
     }'
   ```

---

## 🔧 Cấu hình khác (Tùy chọn)

### Sử dụng SMTP Server khác

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

**Yahoo Mail:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

---

## 🚀 Cách hoạt động

1. **Khi user điền form** → Dữ liệu được lưu vào Google Sheets
2. **Telegram notification** được gửi đầu tiên (nhanh, realtime)
3. **Email notification** được gửi sau (backup, có format đẹp)
4. **Nếu một trong hai thất bại** → Không ảnh hưởng đến trải nghiệm user

## 📱 Ưu điểm của Telegram

- ✅ **Miễn phí hoàn toàn**
- ✅ **Realtime notifications**
- ✅ **Không giới hạn tin nhắn**
- ✅ **Dễ setup (5 phút)**
- ✅ **Có thể tạo group để nhiều người nhận thông báo**
- ✅ **Hỗ trợ formatting (bold, italic, etc.)**

## 📧 Ưu điểm của Email

- ✅ **Backup notification**
- ✅ **Format HTML đẹp**
- ✅ **Có thể forward, archive**
- ✅ **Professional**
- ✅ **Có thể gửi cho nhiều người**

## 🔍 Troubleshooting

### Telegram không hoạt động:
- Kiểm tra Bot Token có đúng không
- Kiểm tra Chat ID có đúng không
- Đảm bảo đã gửi `/start` cho bot

### Email không hoạt động:
- Kiểm tra App Password (không phải mật khẩu Gmail thường)
- Đảm bảo đã bật 2FA
- Kiểm tra SMTP settings

### Cả hai đều không hoạt động:
- Kiểm tra file `.env.local` có đúng tên không
- Restart development server
- Kiểm tra console logs

---

**Lưu ý:** Cả Telegram và Email đều chạy song song, nếu một cái lỗi thì cái kia vẫn hoạt động bình thường!