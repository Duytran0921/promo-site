# Rive Scoring Integration Guide

## Tổng quan

Tài liệu này hướng dẫn cách tích hợp hệ thống scoring với Rive animation thông qua các property của sideBar.

## Cách thức hoạt động

### 1. Score Properties trong Rive

Hệ thống truyền 2 giá trị chính vào Rive animation:

- **`property of sideBar/score`**: Điểm số hiện tại (tích lũy trong session)
- **`property of sideBar/topScore`**: Điểm số cao nhất từ lịch sử game sessions

### 2. Luồng dữ liệu

```
useGameSession (scoring logic)
    ↓
useMatch2GameWithConfig (expose scoring functions)
    ↓
StandaloneMatch2Game (calculate current & top score)
    ↓
Match2Foreground (sync to Rive properties)
    ↓
Rive Animation (display scores)
```

## Implementation Details

### 1. Match2Foreground Component

```jsx
// Thêm props cho score
const Match2Foreground = React.memo(({ 
  // ... other props
  score = 0,        // Điểm số hiện tại
  topScore = 0,     // Điểm cao nhất
  // ... other props
}) => {
  // Truyền vào Rive
  const { setValue: setScore } = useViewModelInstanceNumber('property of sideBar/score', gameFGInstance);
  const { setValue: setTopScore } = useViewModelInstanceNumber('property of sideBar/topScore', gameFGInstance);
  
  // Sync với Rive
  React.useEffect(() => {
    if (score !== undefined && setScore) {
      setScore(score);
    }
  }, [score, setScore]);
  
  React.useEffect(() => {
    if (topScore !== undefined && setTopScore) {
      setTopScore(topScore);
    }
  }, [topScore, setTopScore]);
});
```

### 2. StandaloneMatch2Game Component

```jsx
// Tính toán scores
const currentScore = currentSession?.scoring?.totalScore || 0;
const topScore = React.useMemo(() => {
  if (!sessionHistory || sessionHistory.length === 0) return 0;
  return Math.max(...sessionHistory.map(session => 
    session.scoring?.finalScore || session.scoring?.totalScore || 0
  ));
}, [sessionHistory]);

// Truyền vào Match2Foreground
<Match2Foreground 
  score={currentScore}
  topScore={topScore}
  // ... other props
/>
```

## Scoring Formula

### Match Score
```
Match Score = Base Score (100) + Time Bonus + Efficiency Bonus

Time Bonus = max(0, 50 - matchTime * 10)
Efficiency Bonus = (totalPairs - currentMatchedPairs) * 5
```

### Final Score
```
Final Score = Total Match Points + Completion Bonus + Time Bonus + Efficiency Bonus

Completion Bonus = 200
Time Bonus = max(0, 300 - totalTime * 2)
Efficiency Bonus = (totalPairs / totalTime) * 100
```

## Real-time Updates

- **Current Score**: Cập nhật mỗi khi có match thành công
- **Top Score**: Cập nhật khi session kết thúc và có điểm cao hơn
- **Rive Sync**: Tự động sync mỗi khi giá trị thay đổi

## Testing

### Test Pages

1. **Basic Scoring Test**: `/test-match2/test-scoring`
   - Hiển thị chi tiết scoring trong real-time
   - Cho phép test các config khác nhau

2. **Simple Scoring Test**: `/test-match2/test-scoring-simple`
   - Test trực tiếp các hàm scoring
   - Simulate game session

3. **Rive Integration Test**: `/test-match2/test-rive-scoring`
   - Test tích hợp với Rive animation
   - Kiểm tra console logs cho sync events

### Console Logs

Khi chạy game, bạn sẽ thấy các logs:
```
🔄 Syncing score to Rive: 150
🔄 Syncing topScore to Rive: 450
```

## Troubleshooting

### 1. Score không hiển thị trong Rive
- Kiểm tra property names trong Rive: `property of sideBar/score` và `property of sideBar/topScore`
- Kiểm tra console logs để đảm bảo sync đang hoạt động
- Đảm bảo Rive instance đã được khởi tạo đúng cách

### 2. Top Score không cập nhật
- Kiểm tra localStorage có chứa sessionHistory không
- Đảm bảo game session đã kết thúc để lưu vào history
- Kiểm tra scoring data có được lưu đúng format không

### 3. Performance Issues
- Scoring được tối ưu với memoization
- Chỉ sync khi giá trị thay đổi
- Sử dụng useCallback cho event handlers

## Configuration

Có thể điều chỉnh scoring parameters trong `useGameSession.js`:

```javascript
const SCORING_CONFIG = {
  baseScore: 100,
  maxTimeBonus: 50,
  timePenalty: 10,
  efficiencyMultiplier: 5,
  completionBonus: 200,
  finalTimeBonus: 300,
  finalTimePenalty: 2,
  finalEfficiencyMultiplier: 100
};
```

## Next Steps

1. Tích hợp với backend API để sync scores
2. Thêm achievements system
3. Implement leaderboard
4. Thêm sound effects cho scoring events
5. Customize scoring formula theo game mode