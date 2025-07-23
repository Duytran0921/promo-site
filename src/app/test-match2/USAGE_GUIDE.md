# Hướng Dẫn Sử Dụng Match-2 Game System

## Tổng Quan

Hệ thống Match-2 Game cho phép bạn tạo và nhúng các trò chơi ghép thẻ với cấu hình linh hoạt vào bất kỳ đâu trên website. Hệ thống bao gồm:

- **Component game độc lập**: Có thể nhúng mà không cần control panel
- **Hệ thống cấu hình**: Định nghĩa các preset và custom config
- **Logic game dùng chung**: Tối ưu performance và maintainability
- **Event system**: Xử lý các sự kiện game

## Cài Đặt Nhanh

### 1. Import Component

```jsx
import StandaloneMatch2Game from './components/StandaloneMatch2Game';

// Hoặc import preset components
import { 
  EasyMatch2Game, 
  MediumMatch2Game, 
  HardMatch2Game 
} from './components/StandaloneMatch2Game';
```

### 2. Sử Dụng Cơ Bản

```jsx
// Game với cấu hình có sẵn
<StandaloneMatch2Game configId="easy" />

// Game với preset component
<EasyMatch2Game />

// Game với custom config
<StandaloneMatch2Game 
  customConfig={{
    rows: 3,
    cols: 4,
    minValue: 1,
    maxValue: 6,
    autoPauseTimer: 15000
  }}
/>
```

## Cấu Hình Game

### Cấu Hình Có Sẵn

| Config ID | Kích Thước | Timer | Giá Trị | Mô Tả |
|-----------|------------|-------|---------|-------|
| `default` | 2×2 | 10s | 1-4 | Cấu hình mặc định |
| `easy` | 2×3 | 15s | 1-3 | Dễ chơi, ít thẻ |
| `medium` | 3×4 | 12s | 1-6 | Trung bình |
| `hard` | 4×5 | 8s | 1-10 | Khó, nhiều thẻ, timer ngắn |

### Tạo Custom Config

```jsx
const myConfig = {
  id: 'custom-game',
  name: 'My Custom Game',
  rows: 3,                    // Số hàng
  cols: 4,                    // Số cột
  minValue: 1,                // Giá trị nhỏ nhất
  maxValue: 6,                // Giá trị lớn nhất
  autoPauseTimer: 15000,      // Timer (ms)
  cardWidth: 100,             // Chiều rộng thẻ (px)
  cardHeight: 140,            // Chiều cao thẻ (px)
  cardGap: 3,                 // Khoảng cách thẻ (px)
  autoStart: false,           // Tự động bắt đầu
  showTimer: true,            // Hiển thị timer
  enablePointerEvents: true   // Cho phép tương tác
};

<StandaloneMatch2Game customConfig={myConfig} />
```

## Props và Events

### Props Chính

```jsx
<StandaloneMatch2Game
  // Cấu hình
  configId="medium"                    // ID config có sẵn
  customConfig={customConfigObject}    // Custom config (override configId)
  
  // Styling
  className="border-2 shadow-lg"       // CSS classes
  style={{ margin: '20px' }}           // Inline styles
  containerStyle={{ scale: '0.8' }}    // Style cho game container
  
  // UI Options
  showStartButton={true}               // Hiển thị nút Start
  
  // Event Handlers
  onGameWon={(data) => console.log('Won!', data)}
  onGameStarted={(data) => console.log('Started!', data)}
  onGamePaused={(data) => console.log('Paused!', data)}
/>
```

### Event Data Structure

Các event handler nhận object chứa:

```javascript
{
  config: {              // Cấu hình game hiện tại
    id: 'medium',
    rows: 3,
    cols: 4,
    // ... other config props
  },
  cardStates: {          // Trạng thái tất cả thẻ
    0: { value: 3, isOpen: true, isMatched: false },
    1: { value: 1, isOpen: false, isMatched: false },
    // ...
  },
  totalCards: 12         // Tổng số thẻ
}
```

## Ví Dụ Sử Dụng

### 1. Game Showcase Trên Trang Chủ

```jsx
function HomePage() {
  const handleGameWin = (data) => {
    // Track analytics
    gtag('event', 'game_completed', {
      game_type: 'match2',
      difficulty: data.config.id,
      total_cards: data.totalCards
    });
    
    // Show congratulations
    toast.success('Chúc mừng bạn đã hoàn thành!');
  };

  return (
    <section className="hero-section">
      <div className="container mx-auto">
        <h1>Chào Mừng Đến Với Game Portal</h1>
        <p>Thử ngay game Match-2 miễn phí!</p>
        
        <div className="game-showcase mt-8">
          <EasyMatch2Game 
            onGameWon={handleGameWin}
            className="mx-auto shadow-xl rounded-lg"
            showStartButton={true}
          />
        </div>
      </div>
    </section>
  );
}
```

### 2. Mini Game Trong Sidebar

```jsx
function Sidebar() {
  return (
    <aside className="w-64 p-4">
      <h3 className="text-lg font-bold mb-4">Mini Game</h3>
      
      <StandaloneMatch2Game
        customConfig={{
          rows: 2,
          cols: 2,
          cardWidth: 60,
          cardHeight: 80,
          autoPauseTimer: 30000,
          showTimer: false,
          autoStart: false
        }}
        showStartButton={false}
        className="w-full"
        onGameWon={() => {
          // Award points or unlock content
          awardMiniGamePoints(10);
        }}
      />
    </aside>
  );
}
```

### 3. Game Gallery Với Multiple Difficulties

```jsx
function GameGallery() {
  const difficulties = [
    { id: 'easy', name: 'Dễ', component: EasyMatch2Game },
    { id: 'medium', name: 'Trung Bình', component: MediumMatch2Game },
    { id: 'hard', name: 'Khó', component: HardMatch2Game }
  ];

  const handleGameComplete = (difficulty, data) => {
    console.log(`Completed ${difficulty} game:`, data);
    // Save progress, update leaderboard, etc.
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {difficulties.map(({ id, name, component: GameComponent }) => (
        <div key={id} className="game-card p-4 border rounded-lg">
          <h3 className="text-center mb-4 font-bold">{name}</h3>
          <GameComponent
            onGameWon={(data) => handleGameComplete(id, data)}
            className="border-2 border-gray-200"
          />
        </div>
      ))}
    </div>
  );
}
```

### 4. Progressive Difficulty System

```jsx
function ProgressiveGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedLevels, setCompletedLevels] = useState([]);
  
  const levels = [
    { id: 'easy', name: 'Level 1', config: 'easy' },
    { id: 'medium', name: 'Level 2', config: 'medium' },
    { id: 'hard', name: 'Level 3', config: 'hard' },
    {
      id: 'expert',
      name: 'Level 4',
      config: {
        rows: 5,
        cols: 6,
        minValue: 1,
        maxValue: 15,
        autoPauseTimer: 5000,
        showTimer: true
      }
    }
  ];

  const handleLevelComplete = (levelId, data) => {
    setCompletedLevels(prev => [...prev, levelId]);
    
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      toast.success(`Level ${currentLevel + 1} hoàn thành! Mở khóa level tiếp theo.`);
    } else {
      toast.success('Chúc mừng! Bạn đã hoàn thành tất cả level!');
    }
  };

  const currentLevelData = levels[currentLevel];

  return (
    <div className="progressive-game">
      <div className="level-progress mb-6">
        <h2>Tiến Độ: {currentLevel + 1}/{levels.length}</h2>
        <div className="progress-bar">
          {levels.map((level, index) => (
            <div
              key={level.id}
              className={`progress-step ${
                index <= currentLevel ? 'completed' : 'locked'
              }`}
            >
              {level.name}
            </div>
          ))}
        </div>
      </div>

      <div className="current-game">
        <h3>{currentLevelData.name}</h3>
        <StandaloneMatch2Game
          key={currentLevelData.id} // Force re-render on level change
          configId={typeof currentLevelData.config === 'string' ? currentLevelData.config : undefined}
          customConfig={typeof currentLevelData.config === 'object' ? currentLevelData.config : undefined}
          onGameWon={(data) => handleLevelComplete(currentLevelData.id, data)}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
```

## Styling và Customization

### Responsive Design

```jsx
// Auto-responsive game
<StandaloneMatch2Game
  configId="medium"
  className="w-full max-w-md mx-auto"
  containerStyle={{
    transform: 'scale(0.8)',
    transformOrigin: 'center'
  }}
/>

// Mobile-optimized
<StandaloneMatch2Game
  customConfig={{
    rows: 2,
    cols: 3,
    cardWidth: window.innerWidth < 768 ? 70 : 100,
    cardHeight: window.innerWidth < 768 ? 90 : 140,
    cardGap: window.innerWidth < 768 ? 2 : 3
  }}
/>
```

### Theme Integration

```jsx
// Dark theme
<StandaloneMatch2Game
  configId="medium"
  className="bg-gray-900 border border-gray-700 rounded-lg p-4"
  containerStyle={{
    filter: 'brightness(0.9) contrast(1.1)'
  }}
/>

// Custom brand colors
<StandaloneMatch2Game
  configId="easy"
  className="border-4 border-blue-500 shadow-blue-200 shadow-lg"
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}
/>
```

## Performance Tips

### 1. Lazy Loading

```jsx
import { lazy, Suspense } from 'react';

const LazyMatch2Game = lazy(() => import('./components/StandaloneMatch2Game'));

function GameSection() {
  return (
    <Suspense fallback={<div>Loading game...</div>}>
      <LazyMatch2Game configId="medium" />
    </Suspense>
  );
}
```

### 2. Conditional Rendering

```jsx
function ConditionalGame() {
  const [showGame, setShowGame] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowGame(true)}>
        Chơi Game
      </button>
      
      {showGame && (
        <StandaloneMatch2Game
          configId="easy"
          onGameWon={() => setShowGame(false)}
        />
      )}
    </div>
  );
}
```

### 3. Memory Management

```jsx
// Limit concurrent games
const MAX_CONCURRENT_GAMES = 3;

function GameManager() {
  const [activeGames, setActiveGames] = useState([]);
  
  const addGame = (gameConfig) => {
    if (activeGames.length >= MAX_CONCURRENT_GAMES) {
      toast.warning('Tối đa 3 game cùng lúc!');
      return;
    }
    
    setActiveGames(prev => [...prev, gameConfig]);
  };
  
  return (
    <div className="game-manager">
      {activeGames.map((config, index) => (
        <StandaloneMatch2Game
          key={index}
          {...config}
          onGameWon={() => {
            setActiveGames(prev => prev.filter((_, i) => i !== index));
          }}
        />
      ))}
    </div>
  );
}
```

## Troubleshooting

### Lỗi Thường Gặp

1. **Game không hiển thị**
   - Kiểm tra Rive files tồn tại: `/assets/animation/match_2_*.riv`
   - Xem console để check validation errors

2. **Performance chậm**
   - Giảm số game instances đồng thời
   - Sử dụng smaller card sizes
   - Disable timer nếu không cần

3. **Styling bị lỗi**
   - Kiểm tra container size calculations
   - Ensure parent có đủ space
   - Sử dụng `containerStyle` cho transformations

### Debug Mode

```jsx
// Enable debug logging
<StandaloneMatch2Game
  configId="medium"
  onGameStarted={(data) => {
    console.log('Game Debug Info:', {
      config: data.config,
      cardStates: data.cardStates,
      timestamp: new Date().toISOString()
    });
  }}
/>
```

## Demo và Testing

### Xem Demo
- **Demo page**: `http://localhost:5713/test-match2/demo`
- **Test page**: `http://localhost:5713/test-match2`

### Local Development

```bash
# Start development server
npm run dev

# Access demo
open http://localhost:5713/test-match2/demo
```

## API Reference

### StandaloneMatch2Game Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `configId` | string | 'default' | ID của config có sẵn |
| `customConfig` | object | null | Custom config object |
| `className` | string | '' | CSS classes |
| `style` | object | {} | Inline styles |
| `containerStyle` | object | {} | Game container styles |
| `showStartButton` | boolean | true | Hiển thị nút Start |
| `onGameWon` | function | null | Callback khi thắng |
| `onGameStarted` | function | null | Callback khi bắt đầu |
| `onGamePaused` | function | null | Callback khi pause |

### Config Object Schema

```typescript
interface GameConfig {
  id: string;
  name: string;
  rows: number;              // 1-10
  cols: number;              // 1-10
  minValue: number;          // >= 1
  maxValue: number;          // > minValue
  autoPauseTimer: number;    // milliseconds
  cardWidth: number;         // pixels
  cardHeight: number;        // pixels
  cardGap: number;           // pixels
  autoStart: boolean;
  showTimer: boolean;
  enablePointerEvents: boolean;
}
```

---

**Tác giả**: Match-2 Game System  
**Phiên bản**: 1.0.0  
**Cập nhật**: 2024