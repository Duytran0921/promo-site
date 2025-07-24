# Game Session Storage Guide

## Tổng quan

Tính năng Game Session Storage cho phép lưu trữ và theo dõi lịch sử phiên chơi của người dùng. Mỗi khi bắt đầu game mới, một session ID duy nhất được tạo và theo dõi toàn bộ quá trình chơi.

## Tính năng chính

### 1. **Session Management**
- Tự động tạo session khi bấm "Start"
- Kết thúc session khi game thắng hoặc pause
- Giới hạn tối đa 10 session trong localStorage

### 2. **Data Tracking**
- **Cấu hình game**: game mode, grid size, value range
- **Thời gian**: start time, first match time, completion time
- **Gameplay stats**: total clicks, matched pairs, match times
- **Session ID**: định dạng `session_${timestamp}_${random}`

### 3. **Real-time Monitoring**
- Track số lần click hợp lệ
- Track thời gian từng lần match
- Tính toán completion rate và average time per match

## Cấu trúc dữ liệu

### Session Object
```javascript
{
  sessionId: "session_1703123456789_abc123",
  config: {
    gameMode: "Default",
    rows: 2,
    cols: 2,
    totalCards: 4,
    minValue: 1,
    maxValue: 4
  },
  timestamps: {
    startTime: 1703123456789,
    firstMatchTime: 1703123460000,
    completionTime: 1703123470000
  },
  gameplay: {
    totalClicks: 15,
    matchedPairs: 2,
    matchTimes: [12.5, 25.3] // seconds from start
  },
  completed: true
}
```

### Session Statistics
```javascript
{
  sessionId: "session_1703123456789_abc123",
  elapsedTime: "45.67", // seconds
  totalClicks: 15,
  matchedPairs: 2,
  totalPairs: 2,
  completionRate: 100.0, // percentage
  averageTimePerMatch: 18.9 // seconds
}
```

## Implementation Details

### 1. **Hook: useGameSession**
- **File**: `src/app/test-match2/hooks/useGameSession.js`
- **Chức năng**: Quản lý toàn bộ logic session storage
- **Methods**:
  - `startSession(config)`: Bắt đầu session mới
  - `endSession(completed)`: Kết thúc session
  - `trackClick()`: Track click hợp lệ
  - `trackMatch(pairIndex)`: Track match với thời gian
  - `getSessionStats()`: Lấy thống kê session hiện tại
  - `clearSessionHistory()`: Xóa toàn bộ history

### 2. **Integration với useMatch2Game**
- Tích hợp vào `useMatch2Game` hook
- Tự động start session khi game bắt đầu
- Tự động end session khi game thắng/pause
- Track click và match trong quá trình chơi

### 3. **UI Integration**
- Hiển thị thông tin session trong Quick Actions
- Debug info cho developers
- Button để clear session history

## Usage Examples

### 1. **Tự động tracking**
```javascript
// Session tự động được tạo khi bấm Start
const { startGame } = useMatch2Game();
startGame(); // Session được tạo tự động

// Click và match được track tự động
// Session được kết thúc khi game thắng hoặc pause
```

### 2. **Lấy thống kê session**
```javascript
const { getSessionStats, currentSession } = useMatch2Game();

const stats = getSessionStats();
console.log('Current session stats:', stats);
// Output: { elapsedTime: "45.67", totalClicks: 15, ... }
```

### 3. **Quản lý session history**
```javascript
const { sessionHistory, clearSessionHistory } = useMatch2Game();

// Xem history
console.log('Session history:', sessionHistory);

// Xóa history
clearSessionHistory();
```

## Debug Information

### 1. **Quick Actions Panel**
Hiển thị thông tin real-time:
- Session Active: TRUE/FALSE
- Session ID: 12 ký tự đầu
- Total Clicks: Số lần click
- Matched Pairs: Số cặp đã match
- Elapsed Time: Thời gian đã chơi (giây)
- Completion Rate: Tỷ lệ hoàn thành (%)
- History Count: Số session đã lưu (x/10)

### 2. **Console Logs**
```javascript
// Khi bắt đầu session
console.log('🎮 New game session started:', sessionId);

// Khi track match
console.log('🎯 Match 1 tracked at 12.50s');

// Khi kết thúc session
console.log('🏁 Game session ended:', sessionId, '(completed)');
```

## Storage Management

### 1. **localStorage Key**
- **Key**: `match2GameSessions`
- **Format**: JSON array
- **Limit**: Tối đa 10 session

### 2. **Auto-cleanup**
- Tự động giữ lại 10 session gần nhất
- Session cũ tự động bị xóa khi vượt quá limit

### 3. **Error Handling**
- Try-catch cho localStorage operations
- Fallback khi localStorage không khả dụng
- Validation cho session data

## Performance Considerations

### 1. **Memory Usage**
- Session data được lưu trong localStorage
- Refs được sử dụng cho real-time tracking
- Minimal impact on game performance

### 2. **Update Frequency**
- Click tracking: real-time
- Match tracking: khi có match
- Stats calculation: on-demand

### 3. **Optimization**
- Debounced updates để tránh spam
- Efficient data structure
- Minimal re-renders

## Future Enhancements

### 1. **Analytics Integration**
- Export session data cho analytics
- Performance metrics
- User behavior analysis

### 2. **Advanced Features**
- Session comparison
- Best time tracking
- Achievement system
- Leaderboard integration

### 3. **Data Export**
- Export session data
- Backup/restore functionality
- Cloud sync (future)

## Troubleshooting

### 1. **Session không được tạo**
- Kiểm tra console logs
- Đảm bảo game đã được start
- Kiểm tra localStorage permissions

### 2. **Data không được lưu**
- Kiểm tra localStorage quota
- Kiểm tra browser compatibility
- Kiểm tra error logs

### 3. **Performance issues**
- Kiểm tra session history size
- Clear old sessions nếu cần
- Monitor memory usage

## Testing

### 1. **Manual Testing**
1. Bấm Start → Kiểm tra session được tạo
2. Click thẻ → Kiểm tra click count tăng
3. Match thẻ → Kiểm tra match time được lưu
4. Thắng game → Kiểm tra session completed
5. Bấm Clear Sessions → Kiểm tra history bị xóa

### 2. **Automated Testing**
```javascript
// Test session creation
const { startSession } = useGameSession();
const sessionId = startSession(config);
expect(sessionId).toBeDefined();

// Test click tracking
const { trackClick } = useGameSession();
trackClick();
expect(getSessionStats().totalClicks).toBe(1);

// Test match tracking
const { trackMatch } = useGameSession();
trackMatch(0);
expect(getSessionStats().matchedPairs).toBe(1);
```

## Conclusion

Tính năng Game Session Storage cung cấp:
- **Tracking đầy đủ**: Mọi tương tác đều được ghi lại
- **Performance tốt**: Minimal impact trên game
- **Debug friendly**: Thông tin chi tiết cho developers
- **Scalable**: Dễ dàng mở rộng tính năng
- **User-friendly**: Tự động hoạt động, không cần setup

Tính năng này là foundation cho các tính năng analytics và gamification trong tương lai. 