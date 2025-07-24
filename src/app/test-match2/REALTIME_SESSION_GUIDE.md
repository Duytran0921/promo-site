# Real-time Game Session Storage Guide

## Tổng quan
Tính năng Real-time Game Session Storage cho phép lưu trữ và cập nhật session data ngay lập tức khi có sự kiện xảy ra, thay vì chỉ lưu khi game kết thúc.

## Cách hoạt động

### 1. **Session Creation (Khi bấm Start)**
```javascript
// Session được tạo và lưu ngay lập tức
const newSession = {
  sessionId: "session_1234567890_abc123",
  config: { gameMode, rows, cols, totalCards, minValue, maxValue },
  timestamps: { startTime, firstMatchTime: null, completionTime: null },
  gameplay: { totalClicks: 0, matchedPairs: 0, matchTimes: [] },
  completed: false
};

// Lưu vào localStorage ngay khi tạo
const newHistory = [...sessionHistoryRef.current, newSession];
saveSessionHistory(newHistory);
```

### 2. **Real-time Updates (Khi có sự kiện)**

#### **Click Event**
```javascript
// Mỗi lần click thẻ
trackClick() {
  clickCountRef.current += 1;
  
  const updatedSession = {
    ...currentSession,
    gameplay: {
      ...currentSession.gameplay,
      totalClicks: clickCountRef.current
    }
  };
  
  // Update ngay lập tức
  updateSessionInHistory(updatedSession);
}
```

#### **Match Event**
```javascript
// Mỗi lần match thành công
trackMatch(pairIndex) {
  matchTimesRef.current.push(timeFromStart);
  
  const updatedSession = {
    ...currentSession,
    gameplay: {
      ...currentSession.gameplay,
      matchedPairs: pairIndex + 1,
      matchTimes: [...matchTimesRef.current]
    }
  };
  
  // Lưu firstMatchTime nếu là match đầu tiên
  if (pairIndex === 0) {
    updatedSession.timestamps.firstMatchTime = matchTime;
  }
  
  // Update ngay lập tức
  updateSessionInHistory(updatedSession);
}
```

### 3. **Session Completion (Khi game kết thúc)**
```javascript
// Chỉ update completion time và status
endSession(isCompleted) {
  const finalSession = {
    ...currentSession,
    timestamps: {
      ...currentSession.timestamps,
      completionTime: endTime
    },
    completed: isCompleted
  };
  
  // Update session cuối cùng
  updateSessionInHistory(finalSession);
}
```

## Lợi ích

### ✅ **Không mất dữ liệu**
- Session được lưu ngay khi bắt đầu
- Mọi sự kiện đều được lưu real-time
- Người chơi có thể thoát giữa chừng mà không mất progress

### ✅ **Real-time Tracking**
- Click count được update ngay lập tức
- Match times được lưu theo thời gian thực
- First match time được lưu chính xác

### ✅ **Performance Tối ưu**
- Sử dụng refs để tránh infinite loops
- Chỉ update localStorage khi cần thiết
- Giới hạn 10 session để tránh quá tải

## Data Structure

### **Session Object**
```javascript
{
  sessionId: "session_1234567890_abc123",
  config: {
    gameMode: "Default",
    rows: 4,
    cols: 4,
    totalCards: 16,
    minValue: 1,
    maxValue: 8
  },
  timestamps: {
    startTime: 1703123456789,
    firstMatchTime: 1703123457000, // null nếu chưa match
    completionTime: 1703123460000   // null nếu chưa kết thúc
  },
  gameplay: {
    totalClicks: 25,
    matchedPairs: 6,
    matchTimes: [2.5, 4.1, 6.8, 8.2, 10.5, 12.3]
  },
  completed: true // false nếu chưa kết thúc
}
```

## Implementation Details

### **Files Modified**
1. `src/app/test-match2/hooks/useGameSession.js`
   - ✅ Thêm `updateSessionInHistory()` function
   - ✅ Sửa `startSession()` để lưu ngay khi tạo
   - ✅ Sửa `trackClick()` để update real-time
   - ✅ Sửa `trackMatch()` để update real-time
   - ✅ Sửa `endSession()` để chỉ update completion

### **Key Functions**
```javascript
// Tạo và lưu session ngay lập tức
startSession(gameConfig) → sessionId

// Update click count real-time
trackClick() → void

// Update match data real-time  
trackMatch(pairIndex) → void

// Update completion status
endSession(isCompleted) → finalSession

// Update session trong localStorage
updateSessionInHistory(updatedSession) → void
```

## Testing Scenarios

### **1. Normal Game Flow**
1. Bấm Start → Session được tạo và lưu
2. Click thẻ → Click count được update real-time
3. Match thẻ → Match data được update real-time
4. Thắng game → Completion time được update

### **2. Interrupted Game Flow**
1. Bấm Start → Session được tạo và lưu
2. Click vài thẻ → Data được lưu real-time
3. Match vài cặp → Match data được lưu real-time
4. Thoát giữa chừng → Session vẫn được lưu với progress hiện tại

### **3. Multiple Sessions**
1. Chơi game 1 → Session 1 được lưu
2. Chơi game 2 → Session 2 được lưu
3. Chơi game 3 → Session 3 được lưu
4. Giới hạn 10 session → Session cũ nhất bị xóa

## Console Logs

### **Session Creation**
```
🎮 New game session started and saved: session_1234567890_abc123
```

### **Click Tracking**
```
🖱️ Click tracked: 1 clicks
🖱️ Click tracked: 2 clicks
```

### **Match Tracking**
```
🎯 Match 1 tracked at 2.50s
🎯 Match 2 tracked at 4.10s
🎯 Match 3 tracked at 6.80s
```

### **Session Completion**
```
🏁 Game session ended: session_1234567890_abc123 (completed)
```

## Notes
- Session data được lưu trong `localStorage` với key `match2GameSessions`
- Mỗi session có unique ID với format `session_timestamp_random`
- Real-time updates không ảnh hưởng đến performance
- Session history được giới hạn tối đa 10 session 