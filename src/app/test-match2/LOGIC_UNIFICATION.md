# Logic Unification Between Main and Simple Pages

## Tổng quan

Trước đây, hai trang `/test-match2/` và `/test-match2/simple/` sử dụng logic khác nhau:
- Trang chính sử dụng `useMatch2Game` hook
- Trang simple sử dụng `useMatch2GameWithConfig` hook thông qua `StandaloneMatch2Game`

Sau khi thống nhất, cả hai trang đều sử dụng cùng logic từ `useMatch2Game` hook, chỉ khác biệt về CSS và cấu hình từ file config.

## Thay đổi đã thực hiện

### 1. Tạo component mới: `SimpleMatch2Game.jsx`

- **Vị trí**: `/src/app/test-match2/components/SimpleMatch2Game.jsx`
- **Mục đích**: Thay thế `StandaloneMatch2Game` để sử dụng `useMatch2Game` hook
- **Tính năng**:
  - Sử dụng `useMatch2Game()` hook giống trang chính
  - Nhận config từ `gameConfig.js` (easy, medium, hard)
  - Tự động khởi tạo game với config values
  - Hỗ trợ auto-start nếu được cấu hình
  - Expose game state qua ref
  - Callback events (onGameWon, onGameStarted, onGamePaused)

### 2. Cập nhật trang simple

- **File**: `/src/app/test-match2/simple/page.jsx`
- **Thay đổi**: Import `EasyMatch2Game` từ `SimpleMatch2Game` thay vì `StandaloneMatch2Game`

## So sánh Logic

### Trước khi thống nhất:

| Trang | Hook sử dụng | Đặc điểm |
|-------|-------------|----------|
| `/test-match2/` | `useMatch2Game` | - Cấu hình động (rows, cols, minValue, maxValue)<br>- Có control panel<br>- Có quick actions<br>- Debug tools |
| `/test-match2/simple/` | `useMatch2GameWithConfig` | - Cấu hình cố định từ config<br>- Không có control panel<br>- Timer logic khác<br>- Auto-pause logic khác |

### Sau khi thống nhất:

| Trang | Hook sử dụng | Đặc điểm |
|-------|-------------|----------|
| `/test-match2/` | `useMatch2Game` | - Cấu hình động<br>- Có control panel<br>- Có quick actions<br>- Debug tools |
| `/test-match2/simple/` | `useMatch2Game` | - Cấu hình từ config nhưng sử dụng cùng logic<br>- Không có control panel<br>- UI đơn giản<br>- Cùng game logic |

## Lợi ích của việc thống nhất

### 1. **Consistency (Tính nhất quán)**
- Cả hai trang đều sử dụng cùng một game logic
- Bug fixes và improvements chỉ cần thực hiện ở một nơi
- Behavior giống nhau về card matching, game state management

### 2. **Maintainability (Dễ bảo trì)**
- Giảm code duplication
- Dễ dàng debug và test
- Thay đổi logic game chỉ cần sửa ở `useMatch2Game`

### 3. **Flexibility (Tính linh hoạt)**
- Trang simple vẫn có thể sử dụng config từ `gameConfig.js`
- Có thể dễ dàng thêm tính năng mới cho cả hai trang
- Customization thông qua props và config

## Sự khác biệt còn lại

Sau khi thống nhất logic, hai trang chỉ khác biệt về:

### 1. **CSS và Layout**
- Trang chính: Layout phức tạp với control panel, quick actions
- Trang simple: Layout đơn giản, chỉ có game area

### 2. **Configuration**
- Trang chính: Cấu hình động, người dùng có thể thay đổi
- Trang simple: Cấu hình cố định từ `gameConfig.js` (easy mode)

### 3. **UI Components**
- Trang chính: `GameContainer`, `ControlPanel`, `QuickActions`
- Trang simple: Chỉ có game area với Rive background/foreground

### 4. **User Experience**
- Trang chính: Dành cho developers, testing, debugging
- Trang simple: Dành cho end users, embedding

## Cách sử dụng

### Trang chính (`/test-match2/`)
```javascript
// Sử dụng trực tiếp useMatch2Game hook
const gameState = useMatch2Game();
```

### Trang simple (`/test-match2/simple/`)
```javascript
// Sử dụng SimpleMatch2Game component với config
<EasyMatch2Game 
  onGameWon={(data) => console.log('Game completed!', data)}
/>
```

### Custom config cho trang simple
```javascript
<SimpleMatch2Game 
  configId="medium"  // hoặc "hard"
  customConfig={{
    rows: 3,
    cols: 4,
    minValue: 1,
    maxValue: 6
  }}
/>
```

## Kết luận

Việc thống nhất logic giữa hai trang đã đạt được mục tiêu:
- **Cùng logic game**: Cả hai trang đều sử dụng `useMatch2Game`
- **Khác biệt chỉ về CSS và config**: Như yêu cầu ban đầu
- **Duy trì tính năng riêng**: Mỗi trang vẫn phục vụ mục đích riêng của mình
- **Dễ bảo trì**: Code cleaner và ít duplication hơn