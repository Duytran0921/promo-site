// Image URL configuration
// Quản lý URL cho label và valueImg của game Match-2

// Default image URLs - sử dụng khi không có trong localStorage
export const defaultImageConfig = {
  // Base URL cho label images
  labelBaseUrl: 'https://example.com/images/label',
  
  // Base URL cho value images  
  valueImgBaseUrl: 'https://example.com/images/value',
  
  // Có thể thêm các URL khác nếu cần
  // backgroundUrl: 'https://example.com/images/background',
  // iconUrl: 'https://example.com/images/icon'
};

// LocalStorage keys
export const IMAGE_CONFIG_KEYS = {
  LABEL_BASE_URL: 'match2_label_base_url',
  VALUE_IMG_BASE_URL: 'match2_value_img_base_url'
};

// Helper function để lấy URL từ localStorage hoặc fallback về default
export const getImageUrl = (type) => {
  try {
    let storageKey, defaultUrl;
    
    switch (type) {
      case 'label':
        storageKey = IMAGE_CONFIG_KEYS.LABEL_BASE_URL;
        defaultUrl = defaultImageConfig.labelBaseUrl;
        break;
      case 'valueImg':
        storageKey = IMAGE_CONFIG_KEYS.VALUE_IMG_BASE_URL;
        defaultUrl = defaultImageConfig.valueImgBaseUrl;
        break;
      default:
        console.warn(`Unknown image type: ${type}`);
        return null;
    }
    
    // Ưu tiên lấy từ localStorage
    const storedUrl = localStorage.getItem(storageKey);
    if (storedUrl && storedUrl.trim() !== '') {
      console.log(`📥 Using ${type} URL from localStorage:`, storedUrl);
      return storedUrl;
    }
    
    // Fallback về default config
    console.log(`📋 Using default ${type} URL:`, defaultUrl);
    return defaultUrl;
    
  } catch (error) {
    console.error(`❌ Error getting ${type} URL:`, error);
    // Fallback về default nếu có lỗi
    return type === 'label' ? defaultImageConfig.labelBaseUrl : defaultImageConfig.valueImgBaseUrl;
  }
};

// Helper function để lưu URL vào localStorage
export const setImageUrl = (type, url) => {
  try {
    let storageKey;
    
    switch (type) {
      case 'label':
        storageKey = IMAGE_CONFIG_KEYS.LABEL_BASE_URL;
        break;
      case 'valueImg':
        storageKey = IMAGE_CONFIG_KEYS.VALUE_IMG_BASE_URL;
        break;
      default:
        console.warn(`Unknown image type: ${type}`);
        return false;
    }
    
    localStorage.setItem(storageKey, url);
    console.log(`💾 Saved ${type} URL to localStorage:`, url);
    return true;
    
  } catch (error) {
    console.error(`❌ Error saving ${type} URL:`, error);
    return false;
  }
};

// Helper function để xóa URL khỏi localStorage (sẽ fallback về default)
export const clearImageUrl = (type) => {
  try {
    let storageKey;
    
    switch (type) {
      case 'label':
        storageKey = IMAGE_CONFIG_KEYS.LABEL_BASE_URL;
        break;
      case 'valueImg':
        storageKey = IMAGE_CONFIG_KEYS.VALUE_IMG_BASE_URL;
        break;
      default:
        console.warn(`Unknown image type: ${type}`);
        return false;
    }
    
    localStorage.removeItem(storageKey);
    console.log(`🗑️ Cleared ${type} URL from localStorage`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error clearing ${type} URL:`, error);
    return false;
  }
};

// Helper function để lấy tất cả image config hiện tại
export const getCurrentImageConfig = () => {
  return {
    labelBaseUrl: getImageUrl('label'),
    valueImgBaseUrl: getImageUrl('valueImg')
  };
};