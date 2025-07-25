# 📊 Google Sheets API Integration Guide

Hướng dẫn tích hợp Google Sheets API vào dự án Next.js để quản lý dữ liệu form, content website và analytics.

## 🚀 Tính năng chính

- ✅ Gửi dữ liệu form trực tiếp lên Google Sheets
- ✅ Lấy và hiển thị dữ liệu từ Google Sheets
- ✅ Quản lý content website thông qua Google Sheets
- ✅ Real-time sync giữa website và spreadsheet
- ✅ Authentication bảo mật với Service Account
- ✅ Error handling và validation hoàn chỉnh
- ✅ React hooks để tái sử dụng dễ dàng

## 📁 Cấu trúc files

```
src/
├── services/
│   └── googleSheets.js          # Service chính để tương tác với Google Sheets API
├── app/
│   ├── api/
│   │   └── sheets/
│   │       └── route.js         # API routes (POST, GET, PUT)
│   └── google-sheets-demo/
│       └── page.js              # Trang demo
├── components/
│   └── GoogleSheetsForm.jsx     # Component form demo
├── hooks/
│   └── useGoogleSheets.js       # Custom React hooks
└── .env.local.example           # File cấu hình mẫu
```

## 🔧 Thiết lập ban đầu

### 1. Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Enable Google Sheets API:
   - Vào **APIs & Services** > **Library**
   - Tìm "Google Sheets API" và enable

### 2. Tạo Service Account

1. Vào **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Điền thông tin service account
4. Tạo và download file JSON credentials

### 3. Cấu hình biến môi trường

1. Copy file `.env.local.example` thành `.env.local`
2. Mở file JSON credentials và extract các thông tin:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
GOOGLE_SHEET_NAME="Form Submissions"
```

### 4. Tạo và chia sẻ Google Spreadsheet

1. Tạo Google Spreadsheet mới
2. Copy Spreadsheet ID từ URL
3. **Quan trọng**: Chia sẻ spreadsheet với service account email (từ bước 2)
4. Cấp quyền **Editor** cho service account

## 📝 Cách sử dụng

### 1. Sử dụng API Routes

```javascript
// Gửi dữ liệu
const response = await fetch('/api/sheets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello World'
  })
});

// Lấy dữ liệu
const response = await fetch('/api/sheets');
const result = await response.json();

// Thiết lập headers
const response = await fetch('/api/sheets', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    headers: ['name', 'email', 'message', 'timestamp']
  })
});
```

### 2. Sử dụng React Hooks

```jsx
import { useGoogleSheets, useFormSubmission } from '../hooks/useGoogleSheets';

function MyForm() {
  const { submit, isSubmitting } = useFormSubmission();
  
  const handleSubmit = async (formData) => {
    try {
      await submit(formData);
      // Success handling
    } catch (error) {
      // Error handling
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Đang gửi...' : 'Gửi'}
      </button>
    </form>
  );
}
```

### 3. Sử dụng Service trực tiếp

```javascript
import googleSheetsService from '../services/googleSheets';

// Khởi tạo
await googleSheetsService.initialize('spreadsheet-id', 'Sheet1');

// Thêm dữ liệu
await googleSheetsService.addRow({
  name: 'John Doe',
  email: 'john@example.com'
});

// Lấy dữ liệu
const data = await googleSheetsService.getAllRows();
```

## 🎮 Ứng dụng cho Game

### 1. Lưu điểm số và thống kê

```javascript
// Lưu kết quả game
const gameResult = {
  playerId: 'player123',
  playerName: 'John Doe',
  score: 1500,
  level: 5,
  gameMode: 'match2',
  duration: 120, // seconds
  moves: 45
};

await fetch('/api/sheets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(gameResult)
});
```

### 2. Quản lý cấu hình game

```javascript
// Lấy cấu hình game từ Google Sheets
const gameConfig = await fetch('/api/sheets?sheet=GameConfig');
const config = await gameConfig.json();

// Sử dụng config trong game
const { difficulty, timeLimit, bonusPoints } = config.data[0];
```

### 3. Leaderboard động

```javascript
// Component Leaderboard
function Leaderboard() {
  const { data: scores, fetchData } = useGoogleSheets();
  
  useEffect(() => {
    fetchData({ showToast: false });
  }, []);
  
  const topScores = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
    
  return (
    <div>
      {topScores.map((score, index) => (
        <div key={index}>
          {score.playerName}: {score.score}
        </div>
      ))}
    </div>
  );
}
```

## 📊 Quản lý Content Website

### 1. Blog posts từ Google Sheets

```javascript
// Lấy blog posts
const posts = await fetch('/api/sheets?sheet=BlogPosts');
const blogData = await posts.json();

// Render posts
function BlogList() {
  return (
    <div>
      {blogData.data.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <span>{post.publishDate}</span>
        </article>
      ))}
    </div>
  );
}
```

### 2. FAQ động

```javascript
// Component FAQ
function FAQ() {
  const [faqs, setFaqs] = useState([]);
  
  useEffect(() => {
    fetch('/api/sheets?sheet=FAQ')
      .then(res => res.json())
      .then(data => setFaqs(data.data));
  }, []);
  
  return (
    <div>
      {faqs.map(faq => (
        <details key={faq.id}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
```

## 🔒 Bảo mật

### Best Practices

1. **Không commit credentials**: Luôn sử dụng `.env.local` và thêm vào `.gitignore`
2. **Validate input**: Luôn validate dữ liệu trước khi gửi
3. **Rate limiting**: Implement rate limiting cho API routes
4. **Error handling**: Không expose sensitive information trong error messages

### Ví dụ validation

```javascript
// API route với validation
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.name) {
      return NextResponse.json(
        { error: 'Email và tên là bắt buộc' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }
    
    // Sanitize data
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      message: data.message?.trim() || ''
    };
    
    // Process data...
  } catch (error) {
    // Error handling...
  }
}
```

## 🚀 Deployment

### Vercel

1. Thêm environment variables trong Vercel dashboard
2. Deploy như bình thường
3. Test API endpoints

### Environment Variables cho Production

```bash
# Vercel Environment Variables
NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SHEET_NAME="Production Data"
```

## 🐛 Troubleshooting

### Lỗi thường gặp

1. **"Thiếu thông tin xác thực"**
   - Kiểm tra file `.env.local`
   - Đảm bảo private key được format đúng

2. **"Không tìm thấy spreadsheet"**
   - Kiểm tra Spreadsheet ID
   - Đảm bảo đã chia sẻ với service account

3. **"Permission denied"**
   - Cấp quyền Editor cho service account
   - Kiểm tra Google Sheets API đã được enable

4. **"Headers not found"**
   - Chạy setup headers trước khi gửi dữ liệu
   - Đảm bảo sheet có header row

### Debug mode

```javascript
// Enable debug logging
process.env.NODE_ENV === 'development' && console.log('Debug info:', data);
```

## 📚 Tài liệu tham khảo

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [google-spreadsheet NPM Package](https://www.npmjs.com/package/google-spreadsheet)
- [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/service-accounts)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## 🤝 Đóng góp

Nếu bạn có ý tưởng cải thiện hoặc phát hiện bug, hãy tạo issue hoặc pull request!

---

**Demo**: Truy cập `/google-sheets-demo` để xem demo hoạt động của tích hợp này.