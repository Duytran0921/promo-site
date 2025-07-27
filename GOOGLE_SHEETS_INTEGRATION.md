# 📊 Hướng Dẫn Tích Hợp Google Sheets API

Tài liệu chi tiết về việc tích hợp Google Sheets API vào dự án Next.js để quản lý dữ liệu form, content website và game analytics.

## 🎯 Tổng Quan

Tích hợp này cho phép bạn:
- 📝 Gửi dữ liệu form trực tiếp lên Google Sheets
- 📊 Lấy và hiển thị dữ liệu từ Google Sheets real-time
- 🎮 Quản lý game data (scores, configs, leaderboards)
- 📰 Quản lý content website động
- 🔒 Bảo mật với Google Service Account
- ⚡ Sử dụng dễ dàng với React hooks
- 🛠️ API endpoints RESTful hoàn chỉnh

## 📁 Cấu Trúc Dự Án

```
src/
├── services/
│   └── googleSheets.js          # 🔧 Service chính - kết nối Google Sheets API
├── app/
│   ├── api/
│   │   └── sheets/
│   │       └── route.js         # 🌐 API endpoints (POST, GET, PUT)
│   └── google-sheets-demo/
│       └── page.js              # 🎮 Trang demo tương tác
├── components/
│   └── GoogleSheetsForm.jsx     # 📝 Component form với UI hoàn chỉnh
├── hooks/
│   └── useGoogleSheets.js       # ⚡ Custom React hooks
└── .env.local.example           # ⚙️ Template cấu hình
```

## 🚀 Hướng Dẫn Thiết Lập

### Bước 1: Tạo Google Cloud Project

1. **Truy cập Google Cloud Console**
   - Đi tới [console.cloud.google.com](https://console.cloud.google.com/)
   - Đăng nhập với tài khoản Google

2. **Tạo Project mới**
   - Click "Select a project" → "New Project"
   - Đặt tên project (ví dụ: "PromoGame Sheets")
   - Click "Create"

3. **Enable Google Sheets API**
   - Vào **APIs & Services** → **Library**
   - Tìm kiếm "Google Sheets API"
   - Click vào và nhấn **Enable**

### Bước 2: Tạo Service Account

1. **Tạo Service Account**
   - Vào **APIs & Services** → **Credentials**
   - Click **+ Create Credentials** → **Service Account**
   - Điền tên service account (ví dụ: "sheets-api-service")
   - Click **Create and Continue**

2. **Cấp quyền (tùy chọn)**
   - Có thể bỏ qua phần này
   - Click **Continue** → **Done**

3. **Tạo Key**
   - Click vào service account vừa tạo
   - Vào tab **Keys** → **Add Key** → **Create new key**
   - Chọn **JSON** → **Create**
   - File JSON sẽ được download tự động

### Bước 3: Cấu Hình Environment Variables

1. **Copy file template**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Mở file JSON credentials và extract thông tin**
   ```json
   {
     "type": "service_account",
     "client_email": "your-service@project.iam.gserviceaccount.com",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   }
   ```

3. **Điền vào .env.local**
   ```bash
   # Service Account Email (từ client_email)
   NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
   
   # Private Key (từ private_key, giữ nguyên format với \n)
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
   
   # Spreadsheet ID (sẽ lấy ở bước 4)
   GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
   
   # Tên sheet (tùy chọn)
   GOOGLE_SHEET_NAME="Form Submissions"
   ```

### Bước 4: Tạo và Chia Sẻ Google Spreadsheet

1. **Tạo Spreadsheet mới**
   - Truy cập [sheets.google.com](https://sheets.google.com)
   - Click "Blank" để tạo spreadsheet mới
   - Đặt tên cho spreadsheet

2. **Lấy Spreadsheet ID**
   - Từ URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Copy phần {SPREADSHEET_ID}

3. **⚠️ QUAN TRỌNG: Chia sẻ với Service Account**
   - Click nút **Share** (góc trên bên phải)
   - Paste **service account email** (từ bước 2)
   - Cấp quyền **Editor**
   - Click **Send**

4. **Cập nhật .env.local**
   ```bash
   GOOGLE_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   ```

## 💻 Hướng Dẫn Sử Dụng

### Bước 5: Test Kết Nối

1. **Khởi động server**
   ```bash
   npm run dev
   ```

2. **Truy cập trang demo**
   - Mở browser và vào: `http://localhost:5713/google-sheets-demo`
   - Click "🔧 Thiết lập Headers" để tạo cấu trúc bảng
   - Điền form và test gửi dữ liệu

### 🔧 API Endpoints

#### 1. Gửi Dữ Liệu (POST)
```javascript
// Gửi dữ liệu form lên Google Sheets
const response = await fetch('/api/sheets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    message: 'Xin chào từ website!',
    category: 'support'
  })
});

const result = await response.json();
if (result.success) {
  console.log('✅ Gửi thành công:', result.data);
} else {
  console.error('❌ Lỗi:', result.error);
}
```

#### 2. Lấy Dữ Liệu (GET)
```javascript
// Lấy tất cả dữ liệu từ Google Sheets
const response = await fetch('/api/sheets');
const result = await response.json();

if (result.success) {
  console.log(`📊 Có ${result.count} bản ghi:`, result.data);
  result.data.forEach(row => {
    console.log(`${row.name} - ${row.email} - ${row.date}`);
  });
}

// Lấy thông tin spreadsheet
const infoResponse = await fetch('/api/sheets?action=info');
const info = await infoResponse.json();
console.log('📋 Thông tin sheet:', info.data);
```

#### 3. Thiết Lập Headers (PUT)
```javascript
// Thiết lập cấu trúc cột cho Google Sheets
const response = await fetch('/api/sheets', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    headers: ['name', 'email', 'phone', 'message', 'category', 'timestamp', 'date', 'time']
  })
});

const result = await response.json();
if (result.success) {
  console.log('✅ Headers đã được thiết lập!');
}
```

### ⚡ Sử Dụng React Hooks

#### Hook Cơ Bản
```jsx
import { useGoogleSheets } from '../hooks/useGoogleSheets';

function ContactForm() {
  const { submitData, isLoading, error } = useGoogleSheets();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitData(formData);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      console.error('Lỗi gửi form:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Họ tên"
        required 
      />
      <input 
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
        required 
      />
      <textarea 
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        placeholder="Tin nhắn"
        required 
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? '⏳ Đang gửi...' : '📤 Gửi'}
      </button>
      {error && <p style={{color: 'red'}}>❌ {error}</p>}
    </form>
  );
}
```

#### Hook Đơn Giản Cho Form
```jsx
import { useFormSubmission } from '../hooks/useGoogleSheets';

function QuickForm() {
  const { submit, isSubmitting, error } = useFormSubmission();
  
  const handleQuickSubmit = async (formData) => {
    await submit(formData, {
      onSuccess: () => alert('✅ Gửi thành công!'),
      onError: (err) => alert(`❌ Lỗi: ${err.message}`)
    });
  };
  
  return (
    <button 
      onClick={() => handleQuickSubmit({ 
        name: 'Test User', 
        action: 'quick_action',
        timestamp: new Date().toISOString()
      })}
      disabled={isSubmitting}
    >
      {isSubmitting ? '⏳ Đang xử lý...' : '🚀 Gửi nhanh'}
    </button>
  );
}
```

#### Hook Quản Lý Dữ Liệu
```jsx
import { useSheetData } from '../hooks/useGoogleSheets';

function DataDisplay() {
  const { data, isLoading, error, refetch, count } = useSheetData(true); // auto-fetch
  
  if (isLoading) return <div>⏳ Đang tải dữ liệu...</div>;
  if (error) return <div>❌ Lỗi: {error}</div>;
  
  return (
    <div>
      <div className="header">
        <h3>📊 Dữ liệu từ Google Sheets ({count} bản ghi)</h3>
        <button onClick={() => refetch()}>🔄 Tải lại</button>
      </div>
      
      <div className="data-list">
        {data.map((item, index) => (
          <div key={index} className="data-item">
            <strong>{item.name}</strong> - {item.email}
            <br />
            <small>{item.date} {item.time}</small>
            <p>{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 🔧 Sử Dụng Service Trực Tiếp

```javascript
import googleSheetsService from '../services/googleSheets';

// Trong API route hoặc server-side code
export async function POST(request) {
  try {
    // Khởi tạo service
    await googleSheetsService.initialize(
      process.env.GOOGLE_SPREADSHEET_ID,
      'User Data'
    );
    
    // Thêm dữ liệu
    const result = await googleSheetsService.addRow({
      userId: 'user123',
      action: 'login',
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for')
    });
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}

// Lấy dữ liệu với filter
const allData = await googleSheetsService.getAllRows();
const recentData = allData.filter(row => {
  const rowDate = new Date(row.timestamp);
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return rowDate > yesterday;
});

// Lấy thông tin sheet
const info = googleSheetsService.getSpreadsheetInfo();
console.log('📋 Sheet info:', {
  title: info.title,
  sheetCount: info.sheetCount,
  currentSheet: info.currentSheet,
  headers: info.headers
});
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

## 🐛 Khắc Phục Sự Cố

### ❌ Lỗi Thường Gặp

#### 1. "Thiếu thông tin xác thực" / "Missing credentials"
```bash
# Kiểm tra file .env.local
cat .env.local

# Đảm bảo có đủ các biến:
NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
GOOGLE_SPREADSHEET_ID=...
GOOGLE_SHEET_NAME=...
```

**Giải pháp:**
- Kiểm tra private key có đúng format (bao gồm `\n` cho line breaks)
- Restart server sau khi thay đổi `.env.local`
- Đảm bảo service account email chính xác

#### 2. "Không tìm thấy spreadsheet" / "Spreadsheet not found"
```javascript
// Test kết nối
const testConnection = async () => {
  try {
    const response = await fetch('/api/sheets?action=info');
    const result = await response.json();
    console.log('📋 Kết nối thành công:', result);
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error);
  }
};
```

**Giải pháp:**
- Kiểm tra Spreadsheet ID từ URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
- Đảm bảo đã chia sẻ spreadsheet với service account email
- Kiểm tra tên sheet chính xác (case-sensitive)

#### 3. "Permission denied" / "Insufficient permissions"
**Giải pháp:**
- Cấp quyền **Editor** cho service account trong Google Sheets
- Enable Google Sheets API trong Google Cloud Console
- Kiểm tra service account có quyền truy cập project

#### 4. "API quota exceeded"
```javascript
// Implement retry logic
const retryRequest = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.message.includes('quota') && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
};
```

#### 5. "Invalid JSON" / Lỗi parsing
```javascript
// Debug request data
console.log('📤 Sending data:', JSON.stringify(data, null, 2));

// Validate before sending
const validateData = (data) => {
  if (typeof data !== 'object') throw new Error('Data must be object');
  if (!data.name || !data.email) throw new Error('Missing required fields');
  return true;
};
```

### 🔧 Debug Tools

#### 1. Test API Endpoints
```bash
# Test POST
curl -X POST http://localhost:3002/api/sheets \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Test GET
curl http://localhost:3002/api/sheets

# Test PUT
curl -X PUT http://localhost:3002/api/sheets \
  -H "Content-Type: application/json" \
  -d '{"headers":["name","email","timestamp"]}'
```

#### 2. Browser Console Debug
```javascript
// Test trong browser console
fetch('/api/sheets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Debug Test', email: 'debug@test.com' })
})
.then(res => res.json())
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err));
```

#### 3. Server Logs
```javascript
// Thêm logging trong service
console.log('🔍 Initializing with:', {
  spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID?.substring(0, 10) + '...',
  sheetName: process.env.GOOGLE_SHEET_NAME,
  serviceEmail: process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_EMAIL
});
```

### 📞 Hỗ Trợ

**Nếu vẫn gặp vấn đề:**
1. Kiểm tra [Google Sheets API Documentation](https://developers.google.com/sheets/api)
2. Xem [Next.js API Routes Guide](https://nextjs.org/docs/api-routes/introduction)
3. Kiểm tra Google Cloud Console logs
4. Test với Postman hoặc curl

**Thông tin cần cung cấp khi báo lỗi:**
- Error message đầy đủ
- Browser console logs
- Server logs
- Các bước đã thực hiện
- Environment (development/production)

---

## 🎉 Kết Luận

Tích hợp Google Sheets API đã được thiết lập thành công! Bạn có thể:

✅ **Gửi dữ liệu form** lên Google Sheets real-time  
✅ **Lấy và hiển thị dữ liệu** từ Google Sheets  
✅ **Quản lý cấu hình** game và website động  
✅ **Tạo dashboard** analytics từ dữ liệu sheets  
✅ **Sử dụng React hooks** để tương tác dễ dàng  
✅ **Bảo mật** với Google Service Account  

### 🚀 Bước Tiếp Theo

1. **Tùy chỉnh form** theo nhu cầu cụ thể
2. **Thêm validation** và error handling
3. **Tối ưu performance** với caching
4. **Mở rộng tính năng** với multiple sheets
5. **Deploy lên production** với Vercel

**Happy coding! 🎮✨**

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