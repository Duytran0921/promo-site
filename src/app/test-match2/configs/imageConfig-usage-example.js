// ===== HƯỚNG DẪN SỬ DỤNG INDIVIDUAL IMAGE URLS =====
// File này chứa các ví dụ về cách sử dụng hệ thống individual URLs mới

import { 
  setLabelUrl, 
  setValueImgUrl, 
  getLabelUrl, 
  getValueImgUrl, 
  clearLabelUrl, 
  clearValueImgUrl, 
  getCurrentImageConfig 
} from './imageConfig';

// ===== 1. THIẾT LẬP INDIVIDUAL URLS =====

// Thiết lập URL riêng cho từng label theo index
function setupIndividualLabelUrls() {
  // Ví dụ: Thiết lập URL cho label_0, label_1, label_2, ...
  setLabelUrl(0, 'https://picsum.photos/200/300?random=1');
  setLabelUrl(1, 'https://picsum.photos/200/300?random=2');
  setLabelUrl(2, 'https://picsum.photos/200/300?random=3');
  setLabelUrl(3, 'https://picsum.photos/200/300?random=4');
  setLabelUrl(4, 'https://picsum.photos/200/300?random=5');
  setLabelUrl(5, 'https://picsum.photos/200/300?random=6');
  
  console.log('✅ Đã thiết lập individual label URLs');
}

// Thiết lập URL riêng cho từng value image theo giá trị
function setupIndividualValueImgUrls() {
  // Ví dụ: Thiết lập URL cho value 1, 2, 3, ...
  setValueImgUrl(1, 'https://via.placeholder.com/150/FF0000/FFFFFF?text=1');
  setValueImgUrl(2, 'https://via.placeholder.com/150/00FF00/FFFFFF?text=2');
  setValueImgUrl(3, 'https://via.placeholder.com/150/0000FF/FFFFFF?text=3');
  setValueImgUrl(4, 'https://via.placeholder.com/150/FFFF00/000000?text=4');
  setValueImgUrl(5, 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=5');
  setValueImgUrl(6, 'https://via.placeholder.com/150/00FFFF/000000?text=6');
  
  console.log('✅ Đã thiết lập individual value image URLs');
}

// ===== 2. LẤY URLS =====

// Lấy URL cho label theo index
function getExampleLabelUrls() {
  console.log('📋 Label URLs:');
  for (let i = 0; i < 6; i++) {
    const url = getLabelUrl(i);
    console.log(`  label_${i}: ${url}`);
  }
}

// Lấy URL cho value image theo giá trị
function getExampleValueImgUrls() {
  console.log('📋 Value Image URLs:');
  for (let i = 1; i <= 6; i++) {
    const url = getValueImgUrl(i);
    console.log(`  valueImg_${i}: ${url}`);
  }
}

// ===== 3. XÓA URLS =====

// Xóa URL riêng cho label (sẽ fallback về base URL hoặc default)
function clearExampleLabelUrls() {
  clearLabelUrl(0);
  clearLabelUrl(1);
  console.log('🗑️ Đã xóa individual label URLs cho index 0 và 1');
}

// Xóa URL riêng cho value image
function clearExampleValueImgUrls() {
  clearValueImgUrl(1);
  clearValueImgUrl(2);
  console.log('🗑️ Đã xóa individual value image URLs cho value 1 và 2');
}

// ===== 4. XEM TOÀN BỘ CONFIGURATION =====

function showCurrentConfig() {
  const config = getCurrentImageConfig();
  console.log('📋 Current Image Configuration:', config);
}

// ===== 5. VÍ DỤ SỬ DỤNG THỰC TẾ =====

// Thiết lập URLs cho game 2x3 (6 cards)
function setupGame2x3() {
  console.log('🎮 Thiết lập URLs cho game 2x3...');
  
  // Labels cho 6 cards (index 0-5)
  setLabelUrl(0, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200&h=300&fit=crop');
  setLabelUrl(1, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=300&fit=crop');
  setLabelUrl(2, 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=300&fit=crop');
  setLabelUrl(3, 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200&h=300&fit=crop');
  setLabelUrl(4, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=300&fit=crop');
  setLabelUrl(5, 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=200&h=300&fit=crop');
  
  // Value images cho values 1-3 (vì có 3 cặp)
  setValueImgUrl(1, 'https://via.placeholder.com/150/e74c3c/ffffff?text=🐱');
  setValueImgUrl(2, 'https://via.placeholder.com/150/3498db/ffffff?text=🐶');
  setValueImgUrl(3, 'https://via.placeholder.com/150/2ecc71/ffffff?text=🐰');
  
  console.log('✅ Đã thiết lập URLs cho game 2x3');
  showCurrentConfig();
}

// Thiết lập URLs cho game 3x4 (12 cards)
function setupGame3x4() {
  console.log('🎮 Thiết lập URLs cho game 3x4...');
  
  // Labels cho 12 cards (index 0-11)
  const labelBaseUrl = 'https://picsum.photos/200/300?random=';
  for (let i = 0; i < 12; i++) {
    setLabelUrl(i, `${labelBaseUrl}${i + 10}`);
  }
  
  // Value images cho values 1-6 (vì có 6 cặp)
  const animals = ['🐱', '🐶', '🐰', '🦊', '🐻', '🐼'];
  const colors = ['e74c3c', '3498db', '2ecc71', 'f39c12', '9b59b6', '1abc9c'];
  
  for (let i = 1; i <= 6; i++) {
    setValueImgUrl(i, `https://via.placeholder.com/150/${colors[i-1]}/ffffff?text=${animals[i-1]}`);
  }
  
  console.log('✅ Đã thiết lập URLs cho game 3x4');
  showCurrentConfig();
}

// ===== 6. EXPORT CÁC FUNCTIONS =====

export {
  setupIndividualLabelUrls,
  setupIndividualValueImgUrls,
  getExampleLabelUrls,
  getExampleValueImgUrls,
  clearExampleLabelUrls,
  clearExampleValueImgUrls,
  showCurrentConfig,
  setupGame2x3,
  setupGame3x4
};

// ===== 7. CÁCH SỬ DỤNG TRONG CONSOLE =====
/*

// Import functions vào console:
import { setupGame2x3, showCurrentConfig } from './imageConfig-usage-example';

// Thiết lập URLs cho game 2x3:
setupGame2x3();

// Xem configuration hiện tại:
showCurrentConfig();

// Hoặc sử dụng trực tiếp:
import { setLabelUrl, setValueImgUrl } from './imageConfig';

// Thiết lập URL riêng cho label_0:
setLabelUrl(0, 'https://example.com/my-custom-image.jpg');

// Thiết lập URL riêng cho value 1:
setValueImgUrl(1, 'https://example.com/value-1-image.jpg');

*/

// ===== 8. LƯU Ý QUAN TRỌNG =====
/*

1. PRIORITY SYSTEM:
   - Individual URLs (localStorage) > Base URLs (localStorage) > Default config
   
2. FALLBACK BEHAVIOR:
   - Nếu không có individual URL cho index/value cụ thể
   - Sẽ fallback về base URL + index/value
   - Nếu không có base URL, sẽ dùng default config
   
3. STORAGE:
   - Individual URLs được lưu trong localStorage
   - Sẽ persist qua các session
   - Có thể clear bằng clearLabelUrl() hoặc clearValueImgUrl()
   
4. GAME INTEGRATION:
   - Game sẽ tự động sử dụng individual URLs khi có
   - Không cần thay đổi code game logic
   - Chỉ cần thiết lập URLs trước khi start game

*/