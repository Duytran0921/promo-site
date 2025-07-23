# NavBar Rive Debug Guide

## Vấn đề: Không nhận được trigger từ Rive

### Các nguyên nhân có thể:

1. **Event names không đúng**: Tên event trong code không khớp với tên trong Rive file
2. **State Machine chưa được setup đúng**: State machine không được bind hoặc trigger
3. **Rive file không có events**: File .riv không có events được định nghĩa
4. **Event listener không được bind**: Event listener chưa được đăng ký đúng cách
5. **Rive instance chưa load**: Rive chưa được khởi tạo đúng cách

### Cách debug:

#### Bước 1: Sử dụng các component test

Thay thế NavBar bằng một trong các component test sau trong layout:

```jsx
// Trong layout.js hoặc page.js
import NavBarDebug from '../components/NavBarDebug';
import NavBarSimpleTest from '../components/NavBarSimpleTest';
import NavBarCanvasTest from '../components/NavBarCanvasTest';

// Thay thế
// <NavBar />
// Bằng một trong các component sau:

// Test 1: NavBarDebug (React WebGL2)
<NavBarDebug />

// Test 2: NavBarSimpleTest (React WebGL2 với error handling)
<NavBarSimpleTest />

// Test 3: NavBarCanvasTest (Direct Canvas API)
<NavBarCanvasTest />
```

#### Bước 2: Kiểm tra Console Output

Mở Developer Tools (F12) và xem console để kiểm tra:

**NavBarDebug:**
- ✅ Rive loaded successfully
- 📦 Rive instance: [object]
- 📋 Artboard names: [...]
- 🎮 State machine names: [...]
- 📊 View model names: [...]

**NavBarSimpleTest:**
- ✅ Rive loaded successfully
- 🔄 Rive state changed: loaded
- 📦 Rive instance: [object]

**NavBarCanvasTest:**
- 🎨 Starting Rive Canvas Test...
- ✅ Rive Canvas loaded successfully
- 📋 Artboard names: [...]
- 🎮 State machine names: [...]

#### Bước 3: Xác định vấn đề

**Nếu thấy lỗi:**
- ❌ Rive load error: [error message]
- 💥 Rive initialization error: [error message]

**Nếu Rive instance là null:**
- Có thể do file .riv không tồn tại
- Có thể do path không đúng
- Có thể do Rive runtime chưa load

#### Bước 4: Kiểm tra file Rive

1. **Kiểm tra file tồn tại:**
```bash
dir public\assets\animation\navbar.riv
```

2. **Kiểm tra file size:**
File nên có size > 0 bytes

3. **Mở file trong Rive editor** để kiểm tra:
   - Có State Machine không?
   - Có Events được định nghĩa không?
   - Tên của Events là gì?
   - Có Triggers được setup không?

#### Bước 5: Test click events

Sau khi Rive load thành công, click vào animation để xem:

- 🖱️ CANVAS CLICK: [click data]
- 🎯 RIVE EVENT: [event data] (nếu có events)

#### Bước 6: Cập nhật code theo tên events thực tế

Sau khi biết tên events thực tế, cập nhật switch case trong NavBar.js:

```jsx
switch (eventData.name) {
  case 'TênEventThựcTế1':
    console.log('Event 1 fired!');
    handleNavigation('/', 0);
    break;
  case 'TênEventThựcTế2':
    console.log('Event 2 fired!');
    handleNavigation('/services', 1);
    break;
  default:
    console.log('Unknown trigger:', eventData.name);
}
```

### Các event names phổ biến:

- `HomeTrigger`
- `ServicesTrigger`
- `item0Trigger`
- `item1Trigger`
- `home_click`
- `services_click`
- `click`
- `tap`
- `trigger`

### Kiểm tra State Machine:

Nếu sử dụng State Machine, cần kiểm tra:

1. **Inputs**: Có input nào cho trigger không?
2. **States**: Có state nào được trigger không?
3. **Transitions**: Có transition nào được setup không?

### Alternative approach:

Nếu không có events, có thể sử dụng State Machine inputs:

```jsx
// Thay vì events, sử dụng inputs
const homeInput = rive.stateMachines[0].input('HomeInput');
const servicesInput = rive.stateMachines[0].input('ServicesInput');

// Trigger manually
homeInput.value = true;
```

### Debug checklist:

- [ ] File .riv tồn tại và có size > 0
- [ ] Rive instance load thành công (không null)
- [ ] Artboards được detect
- [ ] State machines được detect
- [ ] View models được detect (nếu có)
- [ ] Events được fire khi click
- [ ] Console không có errors
- [ ] Animation chạy được
- [ ] Click/tap được detect

### Troubleshooting:

**Nếu Rive instance là null:**
1. Kiểm tra file path
2. Kiểm tra Rive runtime import
3. Thử sử dụng NavBarCanvasTest

**Nếu không có events:**
1. Kiểm tra Rive file có events không
2. Thử sử dụng State Machine inputs
3. Thử tạo events mới trong Rive editor

**Nếu click không detect:**
1. Kiểm tra canvas size
2. Kiểm tra z-index
3. Thử click vào các vùng khác nhau

### Next steps:

1. Chạy NavBarCanvasTest (khuyến nghị)
2. Kiểm tra console output
3. Click vào animation để test
4. Cập nhật event names trong NavBar.js
5. Test lại functionality 