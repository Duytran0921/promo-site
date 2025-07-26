# Match2 Game Components Documentation

## pauseGame Function

### Mô tả
Hàm `pauseGame` được sử dụng để tạm dừng trò chơi và xử lý các logic liên quan đến timer bất hoạt động.

### Logic Timer

#### 1. Logic Bắt đầu Timer
- Timer bất hoạt động được khởi tạo thông qua `resetUnifiedInactivityTimer()`
- Sử dụng `inactivityTimerRef` để quản lý timer chính
- Sử dụng Web Worker (`inactivityWorkerRef`) để tránh throttling khi tab không active
- Timer được bắt đầu khi:
  - Trò chơi được khởi động (`startGame`)
  - Có hoạt động từ người dùng (click, touch)
  - Game được resume sau khi pause

#### 2. Logic Reset Timer
- `resetUnifiedInactivityTimer()` được gọi để reset timer
- Clear `inactivityTimerRef` nếu đang chạy
- Gửi message 'RESET_TIMER' đến Web Worker
- Reset các ref liên quan:
  - `inactivityStartTimeRef.current = Date.now()`
  - `remainingTimeRef.current = inactivityTimeout`
  - `isPausedByInactivityRef.current = false`

#### 3. Logic Sau Khi Timer Đếm Xong

##### Thay đổi trạng thái:
1. **Timer States:**
   - `isPausedByInactivityRef.current = true`
   - Clear `inactivityTimerRef`
   - Stop Web Worker timer
   - Reset `remainingTimeRef.current = 0`
   - Reset `inactivityStartTimeRef.current = null`

2. **Game States:**
   - `setIsGameStarted(false)` - Dừng trò chơi
   - `setIsGameWon(false)` - Reset trạng thái thắng game

3. **Card States:**
   - Đóng tất cả các thẻ bài tuần tự với animation
   - Delay 50ms giữa mỗi thẻ để tạo hiệu ứng mượt

##### Gửi trạng thái đến:
1. **Match2Background Component:**
   - Nhận `isGameWon={false}` để hiển thị background phù hợp
   - Nhận `pointerEventsEnabled` để quản lý tương tác

2. **Match2Foreground Component:**
   - Nhận `gameStarted={false}` để hiển thị nút Start/Pause/Restart
   - Cập nhật UI controls phù hợp với trạng thái game

3. **DynamicCard Components:**
   - Nhận `isGameStarted={false}` để disable tương tác
   - Cards được đóng tuần tự thông qua `closeCard()` function

### Trigger Events
Hàm `pauseGame` được gọi khi:
- Web Worker gửi message `TIMER_COMPLETED`
- User click nút pause
- Game bị pause do các điều kiện khác

### Dependencies
- `inactivityTimerRef`: Ref cho timer chính
- `inactivityWorkerRef`: Ref cho Web Worker
- `inactivityStartTimeRef`: Thời điểm bắt đầu timer
- `remainingTimeRef`: Thời gian còn lại
- `isPausedByInactivityRef`: Trạng thái pause do bất hoạt động