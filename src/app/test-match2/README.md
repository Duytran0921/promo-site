# Match-2 Game System

Hệ thống game Match-2 với khả năng cấu hình linh hoạt và component độc lập có thể nhúng vào bất kỳ đâu trên website.

## Cấu trúc thư mục

```
test-match2/
├── components/
│   ├── StandaloneMatch2Game.jsx    # Component game độc lập
│   ├── GameContainer.jsx           # Container cho game chính
│   ├── DynamicCard.jsx            # Component thẻ bài
│   ├── Match2Background.jsx       # Rive background
│   ├── Match2Foreground.jsx       # Rive foreground
│   ├── ControlPanel.jsx           # Panel điều khiển (chỉ dùng cho test)
│   └── QuickActions.jsx           # Actions nhanh (chỉ dùng cho test)
├── hooks/
│   ├── useMatch2Game.js           # Hook game logic gốc
│   └── useMatch2GameWithConfig.js # Hook game logic với config
├── configs/
│   └── gameConfig.js              # File cấu hình game
├── simple/
│   └── page.jsx                   # Trang game simple - dùng cho phát triển
├── page.jsx                       # Trang test chính
└── README.md                      # File này
```

## Cách sử dụng

### 1. Sử dụng Standalone Game Component

#### Import cơ bản
```jsx
import StandaloneMatch2Game from './components/StandaloneMatch2Game';

// Sử dụng với config có sẵn
<StandaloneMatch2Game configId="easy" />
```

#### Sử dụng với custom config
```jsx
const customConfig = {
  id: 'custom',
  name: 'Custom Game',
  rows: 3,
  cols: 4,
  minValue: 1,
  maxValue: 6,
  autoPauseTimer: 15000, // 15 giây
  cardWidth: 100,
  cardHeight: 140,
  cardGap: 3,
  autoStart: false,
  showTimer: true,
  enablePointerEvents: true
};

<StandaloneMatch2Game customConfig={customConfig} />
```

#### Với event handlers
```jsx
<StandaloneMatch2Game
  configId="medium"
  onGameWon={(data) => console.log('Game won!', data)}
  onGameStarted={(data) => console.log('Game started!', data)}
  onGamePaused={(data) => console.log('Game paused!', data)}
  className="custom-styling"
  showStartButton={true}
/>
```

### 2. Sử dụng với Config có sẵn

```jsx
import { StandaloneMatch2Game } from './components/StandaloneMatch2Game';

// Sử dụng config easy
<StandaloneMatch2Game configId="easy" onGameWon={handleWin} />

// Sử dụng config medium với styling
<StandaloneMatch2Game 
  configId="medium" 
  className="bg-white rounded-lg shadow-lg p-6" 
/>

// Sử dụng config hard không hiển thị nút start
<StandaloneMatch2Game 
  configId="hard" 
  showStartButton={false} 
/>
```

### 3. Tạo Config mới

#### Thêm vào file configs/gameConfig.js
```javascript
export const myCustomConfig = {
  id: 'my-custom',
  name: 'My Custom Game',
  rows: 4,
  cols: 4,
  minValue: 1,
  maxValue: 8,
  autoPauseTimer: 12000,
  cardWidth: 90,
  cardHeight: 120,
  cardGap: 2,
  autoStart: false,
  showTimer: true,
  enablePointerEvents: true
};

// Thêm vào gameConfigs object
export const gameConfigs = {
  // ... existing configs
  'my-custom': myCustomConfig
};
```

#### Sử dụng config mới
```jsx
<StandaloneMatch2Game configId="my-custom" />
```

## Cấu hình Game (Config)

### Cấu trúc Config

```javascript
{
  id: string,                    // ID duy nhất của config
  name: string,                  // Tên hiển thị
  rows: number,                  // Số hàng thẻ
  cols: number,                  // Số cột thẻ
  minValue: number,              // Giá trị nhỏ nhất trên thẻ
  maxValue: number,              // Giá trị lớn nhất trên thẻ
  autoPauseTimer: number,        // Thời gian tự động pause (ms)
  cardWidth: number,             // Chiều rộng thẻ (px)
  cardHeight: number,            // Chiều cao thẻ (px)
  cardGap: number,               // Khoảng cách giữa các thẻ (px)
  autoStart: boolean,            // Tự động bắt đầu game
  showTimer: boolean,            // Hiển thị timer
  enablePointerEvents: boolean   // Cho phép tương tác
}
```

### Configs có sẵn

- **default**: 2x2, timer 10s, values 1-4
- **easy**: 2x3, timer 15s, values 1-3
- **medium**: 3x4, timer 12s, values 1-6
- **hard**: 4x5, timer 8s, values 1-10, no timer display

## Props của StandaloneMatch2Game

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `configId` | string | 'default' | ID của config có sẵn |
| `customConfig` | object | null | Config tùy chỉnh (override configId) |
| `className` | string | '' | CSS class cho container |
| `style` | object | {} | Inline style cho container |
| `onGameWon` | function | null | Callback khi thắng game |
| `onGameStarted` | function | null | Callback khi bắt đầu game |
| `onGamePaused` | function | null | Callback khi pause game |
| `showStartButton` | boolean | true | Hiển thị nút Start |
| `containerStyle` | object | {} | Style cho game container |

## Event Handlers

Các event handler nhận một object chứa thông tin game:

```javascript
{
  config: object,        // Config hiện tại
  cardStates: object,    // Trạng thái các thẻ
  totalCards: number     // Tổng số thẻ
}
```

## Styling và Customization

### CSS Classes
```jsx
<StandaloneMatch2Game
  className="border-2 border-blue-500 shadow-lg"
  containerStyle={{ transform: 'scale(0.8)' }}
/>
```

### Responsive Design
Component tự động tính toán kích thước dựa trên config:
- Width: `cardWidth * cols + cardGap * (cols - 1) + 40px`
- Height: `cardHeight * rows + cardGap * (rows - 1) + 40px`
- Minimum: 200x200px

## Trang Simple - Phát triển chính

### Trang Simple Game
Trang simple là phiên bản đơn giản của game, được tối ưu hóa cho việc phát triển và tích hợp:

```
http://localhost:5713/test-match2/simple/
```

**Đặc điểm:**
- Sử dụng `StandaloneMatch2Game` component
- Bố cục responsive, tự động điều chỉnh theo màn hình
- Kích thước thẻ bài cố định: 120px x 160px
- Khoảng cách đều giữa các thẻ: 4px
- Không có các control panel phức tạp
- Dễ dàng tùy chỉnh và tích hợp

**Cách sử dụng:**
```jsx
// simple/page.jsx
import { StandaloneMatch2Game } from '../components/StandaloneMatch2Game';

export default function SimpleGamePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <StandaloneMatch2Game 
        configId="medium"
        onGameWon={(data) => console.log('Game won!', data)}
        className="bg-white rounded-lg shadow-lg p-6"
      />
    </div>
  );
}
```

## Demo và Testing

### Test page chính (với controls)
```
http://localhost:5713/test-match2
```

### Simple page (cho phát triển)
```
http://localhost:5713/test-match2/simple/
```

## Integration Examples

### Nhúng vào trang chủ
```jsx
// pages/index.js
import { StandaloneMatch2Game } from '../test-match2/components/StandaloneMatch2Game';

export default function HomePage() {
  return (
    <div className="hero-section">
      <h1>Welcome to our site!</h1>
      <div className="game-showcase">
        <StandaloneMatch2Game 
          configId="easy"
          onGameWon={() => alert('Congratulations!')}
          className="mx-auto bg-white rounded-lg shadow-lg p-6"
        />
      </div>
    </div>
  );
}
```

### Nhúng vào sidebar
```jsx
<aside className="sidebar">
  <h3>Mini Game</h3>
  <StandaloneMatch2Game
    customConfig={{
      rows: 2, cols: 2,
      cardWidth: 60, cardHeight: 80,
      autoPauseTimer: 30000,
      showTimer: false
    }}
    showStartButton={false}
    className="w-full"
  />
</aside>
```

### Multiple games
```jsx
<div className="games-grid grid grid-cols-1 md:grid-cols-3 gap-6">
  {['easy', 'medium', 'hard'].map(difficulty => (
    <div key={difficulty} className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4 capitalize">{difficulty}</h3>
      <StandaloneMatch2Game
        configId={difficulty}
        onGameWon={(data) => trackGameWin(difficulty, data)}
        className="w-full"
      />
    </div>
  ))}
</div>
```

## Performance Notes

- Mỗi game instance sử dụng Rive animation riêng biệt
- Recommend không hiển thị quá nhiều game cùng lúc (< 10)
- Sử dụng `showStartButton={false}` cho games không cần interaction ngay lập tức
- Config validation được thực hiện tự động

## Troubleshooting

### Game không hiển thị
- Kiểm tra Rive files có tồn tại: `/assets/animation/match_2_*.riv`
- Kiểm tra config validation errors trong console

### Performance issues
- Giảm số lượng game instances
- Sử dụng smaller card sizes
- Disable timer display nếu không cần thiết

### Styling issues
- Kiểm tra container size calculations
- Sử dụng `containerStyle` cho custom transformations
- Ensure parent container có đủ space