# Test Match2 Components

Thư mục này chứa các component đã được tách ra từ file `page.jsx` chính để tổ chức code tốt hơn và dễ bảo trì.

## Cấu trúc Components

### 1. GameContainer.jsx
**Mục đích**: Component chính chứa toàn bộ phần game
**Chức năng**:
- Tích hợp `Match2Background`, `Match2Foreground`, và `DynamicCard`
- Quản lý layout và positioning của các thành phần game
- Xử lý pointer events và tương tác người dùng

**Props**:
- `isGameWon`: Trạng thái thắng game
- `isGameStarted`: Trạng thái bắt đầu game
- `pointerEventsMode`: Chế độ pointer events ('background', 'cards', 'foreground')
- `handlePointerEnter`: Callback khi hover
- `rows`, `cols`: Số hàng và cột
- `cardIndices`: Mảng index các thẻ
- `cardStates`: Object chứa trạng thái các thẻ
- `handleCardValueChange`, `handleCardOpenChange`: Callbacks xử lý thay đổi thẻ

### 2. Match2Background.jsx
**Mục đích**: Component hiển thị hoạt ảnh nền
**Chức năng**:
- Sử dụng Rive animation cho background
- Đồng bộ trạng thái `isGameWon` với Rive
- Luôn ở chế độ pointer-events-none

**Props**:
- `isGameWon`: Trạng thái thắng game để đồng bộ với Rive

### 3. Match2Foreground.jsx
**Mục đích**: Component hiển thị hoạt ảnh nền trước
**Chức năng**:
- Sử dụng Rive animation cho foreground effects
- Đồng bộ trạng thái game (thắng, bắt đầu) với Rive
- Có thể bật/tắt pointer events

**Props**:
- `isGameWon`: Trạng thái thắng game
- `gameStarted`: Trạng thái bắt đầu game
- `pointerEventsEnabled`: Có cho phép pointer events hay không

### 4. DynamicCard.jsx
**Mục đích**: Component thẻ game với hoạt ảnh Rive
**Chức năng**:
- Hiển thị từng thẻ game với animation
- Quản lý trạng thái thẻ (giá trị, mở/đóng, khớp)
- Đồng bộ trạng thái React với Rive ViewModel
- Hỗ trợ 2 chế độ: 'display' (game) và 'control' (debug)

**Props**:
- `index`: Index của thẻ
- `value`: Giá trị thẻ
- `isOpen`: Trạng thái mở/đóng
- `isMatched`: Trạng thái đã khớp
- `gameStarted`: Trạng thái game đã bắt đầu
- `onClick`: Callback khi click (chỉ ở chế độ display)
- `onValueChange`: Callback khi thay đổi giá trị (chỉ ở chế độ control)
- `onOpenChange`: Callback khi thay đổi trạng thái mở/đóng (chỉ ở chế độ control)
- `mode`: 'display' hoặc 'control'
- `pointerEventsEnabled`: Có cho phép pointer events hay không

### 5. ControlPanel.jsx
**Mục đích**: Component bảng điều khiển cấu hình game
**Chức năng**:
- Cấu hình số hàng, cột
- Thiết lập giá trị min/max cho thẻ
- Điều khiển trạng thái game (tạm dừng/đặt lại)
- Hiển thị các thẻ ở chế độ control để debug

**Props**:
- `totalCards`: Tổng số thẻ
- `isGameStarted`: Trạng thái game
- `toggleGameState`: Function toggle trạng thái game
- `rows`, `cols`: Số hàng, cột hiện tại
- `setRows`, `setCols`: Functions thiết lập hàng, cột
- `minValue`, `maxValue`: Giá trị min/max
- `setMinValue`, `setMaxValue`: Functions thiết lập min/max
- `cardIndices`: Mảng index thẻ
- `cardStates`: Trạng thái các thẻ
- `handleCardValueChange`, `handleCardOpenChange`: Callbacks xử lý thẻ

### 6. QuickActions.jsx
**Mục đích**: Component các hành động nhanh và debug info
**Chức năng**:
- Điều khiển pointer events mode
- Các hành động nhanh: set sequential, random pairs, open/close all, reset
- Hiển thị thông tin debug chi tiết
- Copy debug data

**Props**:
- `pointerEventsMode`: Chế độ pointer events hiện tại
- `setPointerEventsMode`: Function thiết lập pointer events mode
- `setSequentialValues`, `generateRandomPairs`, `openAllCards`, `closeAllCards`, `resetAllValues`: Các functions hành động nhanh
- `copyDebugData`: Function copy debug data
- `twoCardOpen`: Trạng thái có 2 thẻ đang mở
- `isGameStarted`, `isGameWon`: Trạng thái game
- `cardStates`: Trạng thái các thẻ
- `totalCards`: Tổng số thẻ

## Cách sử dụng

Tất cả các component này được import và sử dụng trong file `page.jsx` chính:

```jsx
import GameContainer from './components/GameContainer';
import ControlPanel from './components/ControlPanel';
import QuickActions from './components/QuickActions';

// Trong component TestMatch2Page
<GameContainer
  isGameWon={isGameWon}
  isGameStarted={isGameStarted}
  // ... other props
/>

<ControlPanel
  totalCards={totalCards}
  isGameStarted={isGameStarted}
  // ... other props
/>

<QuickActions
  pointerEventsMode={pointerEventsMode}
  setPointerEventsMode={setPointerEventsMode}
  // ... other props
/>
```

## Lợi ích của việc tách component

1. **Dễ bảo trì**: Mỗi component có trách nhiệm rõ ràng
2. **Tái sử dụng**: Các component có thể được sử dụng ở nơi khác
3. **Debug dễ dàng**: Có thể test từng component riêng biệt
4. **Code sạch**: File chính không quá dài và phức tạp
5. **Phát triển song song**: Nhiều người có thể làm việc trên các component khác nhau

## Ghi chú

- Tất cả logic game và state management vẫn được giữ trong file `page.jsx` chính
- Các component chỉ nhận props và render UI, không quản lý state riêng
- Rive animations và ViewModels được quản lý trong từng component tương ứng
- Pointer events được điều khiển thông qua props để tránh xung đột