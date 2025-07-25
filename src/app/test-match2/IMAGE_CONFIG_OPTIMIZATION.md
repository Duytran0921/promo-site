# 🚀 Image Config Optimization

## Vấn đề trước khi tối ưu hóa

Trước đây, hàm `getImageUrl()` được gọi liên tục mỗi khi component render, gây ra:
- Console logs liên tục: `📋 Using default label URL` và `📋 Using default valueImg URL`
- Performance không tối ưu do gọi localStorage nhiều lần
- Khó debug vì quá nhiều logs không cần thiết

## Giải pháp tối ưu hóa

### 1. **Caching với useMemo**
```javascript
// Cache image URLs to avoid repeated calls
const imageUrls = useMemo(() => {
  return {
    labelBaseUrl: getImageUrl('label'),
    valueImgBaseUrl: getImageUrl('valueImg')
  };
}, []); // Empty dependency array - only calculate once
```

### 2. **Sử dụng cached URLs**
```javascript
// Trước đây (gọi getImageUrl() mỗi lần)
label: getImageUrl('label') ? `${getImageUrl('label')}_${index}` : null,
valueImg: getImageUrl('valueImg') ? `${getImageUrl('valueImg')}_${cardValue}` : null

// Sau khi tối ưu (sử dụng cached values)
label: imageUrls.labelBaseUrl ? `${imageUrls.labelBaseUrl}_${index}` : null,
valueImg: imageUrls.valueImgBaseUrl ? `${imageUrls.valueImgBaseUrl}_${cardValue}` : null
```

## Kết quả sau tối ưu hóa

✅ **Giảm thiểu logs**: Chỉ thấy logs khi thực sự cần thiết  
✅ **Tăng performance**: Chỉ gọi localStorage 1 lần duy nhất  
✅ **Dễ debug**: Console sạch sẽ hơn, dễ theo dõi  
✅ **Maintain functionality**: Vẫn hỗ trợ đầy đủ localStorage + fallback  

## Cách test

1. Truy cập: `http://localhost:5713/test-image-config`
2. Mở Console (F12)
3. Quan sát:
   - **Trước tối ưu**: Logs liên tục khi component render
   - **Sau tối ưu**: Chỉ thấy logs khi click button hoặc thực hiện action

## Files đã thay đổi

- `useMatch2GameWithConfig.js`: Thêm useMemo caching
- `imageConfig.js`: Giữ nguyên helper functions
- `gameConfig.js`: Loại bỏ label/valueImg khỏi config (chuyển sang imageConfig)

## Cách hoạt động

1. **Lần đầu render**: `useMemo` gọi `getImageUrl()` và cache kết quả
2. **Các lần render tiếp theo**: Sử dụng cached values, không gọi lại `getImageUrl()`
3. **Khi cần update URL**: Có thể clear cache bằng cách thay đổi dependencies của `useMemo`

## Lưu ý quan trọng

⚠️ **Empty dependency array**: `useMemo(() => {...}, [])` có nghĩa là chỉ tính toán 1 lần duy nhất  
⚠️ **URL changes**: Nếu cần update URL trong runtime, cần thêm dependencies hoặc force re-render  
⚠️ **localStorage changes**: Hiện tại không auto-detect localStorage changes, cần refresh page  

## Tương lai có thể cải thiện

- Thêm listener cho localStorage changes
- Auto-refresh cache khi URL thay đổi
- Thêm manual refresh cache function