# Hướng dẫn sử dụng Rive Instances trong SaasPackageRive Component

## Tổng quan

Component `SaasPackageRive` đã được cập nhật để có thể truy cập và sử dụng các View Models và Instances có sẵn trong file `SaasPackage.riv`.

## Các View Models và Instances có sẵn

### 1. Product View Model
- **Instances:**
  - `Instance 1`
  - `Instance`
- **Properties:**
  - `State` (string)

### 2. ProductPackage View Model
- **Instances:**
  - `Instance`
- **Properties:**
  - `ProductCard_1` (viewModel reference)
  - `ProductCard_2` (viewModel reference)

### 3. Button View Model
- **Instances:**
  - `yellow` - Button màu vàng với text "XEM THÊM"
  - `blue` - Button màu xanh với text "XEM THÊM"
  - `Instance` - Button mặc định
- **Properties:**
  - `Label` (string)
  - `colorMain` (color)
  - `colorFeather` (color)

### 4. productCard View Model
- **Instances:**
  - `Custom` - Card cho gói Customize
    - Header: "CUSTOMIZE PACKAGE"
    - Main: "Gói Customize từ PromoGame là giải pháp linh hoạt..."
  - `SaaS` - Card cho gói SaaS
    - Header: "SAAS PACKAGE"
    - Main: "Gói giải pháp đóng gói SaaS cho phép doanh nghiệp..."
  - `Instance` - Card mặc định
- **Properties:**
  - `Header` (string)
  - `Main` (string)
  - `property of Product` (viewModel reference)

## Cách sử dụng

### 1. Sử dụng component cơ bản
```jsx
import SaasPackageRive from './components/SaasPackageRive';

function MyComponent() {
  return (
    <SaasPackageRive 
      className="my-rive-animation"
      width="100%"
      height="600px"
    />
  );
}
```

### 2. Thay đổi instances từ bên ngoài
```jsx
import React, { useRef } from 'react';
import SaasPackageRive from './components/SaasPackageRive';

function MyComponent() {
  const riveRef = useRef(null);

  const switchToSaaSPackage = () => {
    SaasPackageRive.changeInstance(riveRef, 'productCard', 'SaaS');
  };

  const switchToCustomPackage = () => {
    SaasPackageRive.changeInstance(riveRef, 'productCard', 'Custom');
  };

  const switchToYellowButton = () => {
    SaasPackageRive.changeInstance(riveRef, 'Button', 'yellow');
  };

  return (
    <div>
      <SaasPackageRive ref={riveRef} />
      <button onClick={switchToSaaSPackage}>SaaS Package</button>
      <button onClick={switchToCustomPackage}>Custom Package</button>
      <button onClick={switchToYellowButton}>Yellow Button</button>
    </div>
  );
}
```

### 3. Sử dụng component example có sẵn
```jsx
import SaasPackageRiveExample from './components/SaasPackageRiveExample';

function MyPage() {
  return <SaasPackageRiveExample />;
}
```

## Debug Mode

Component hiện tại có debug panel hiển thị tất cả view models và instances có sẵn. Panel này sẽ xuất hiện ở góc trên bên trái khi animation được load thành công.

**Lưu ý:** Hãy xóa debug panel trong production bằng cách xóa phần code có comment `{/* Debug info - remove in production */}`.

## API Reference

### SaasPackageRive.changeInstance(riveRef, viewModelName, instanceName)

**Parameters:**
- `riveRef`: Reference đến Rive instance
- `viewModelName`: Tên của view model (string)
- `instanceName`: Tên của instance muốn chuyển đến (string)

**Returns:**
- `boolean`: `true` nếu thành công, `false` nếu thất bại

**Example:**
```javascript
const success = SaasPackageRive.changeInstance(riveRef, 'Button', 'yellow');
if (success) {
  console.log('Instance changed successfully');
} else {
  console.log('Failed to change instance');
}
```

## Troubleshooting

1. **Không thấy debug panel:** Kiểm tra console để xem có lỗi loading không
2. **Không thay đổi được instance:** Đảm bảo riveRef đã được truyền đúng và animation đã load xong
3. **Instance không tồn tại:** Kiểm tra tên instance trong debug panel hoặc console logs

## Console Logs

Component sẽ log các thông tin sau vào console:
- Danh sách view models được tìm thấy
- Danh sách instances cho mỗi view model
- Thông báo khi thay đổi instance thành công
- Lỗi nếu có vấn đề xảy ra