// Image URL configuration
// Quản lý URL cho label và valueImg của game Match-2

// Debug configuration - set to true to enable console logs
const DEBUG_IMAGE_CONFIG = false;

// Helper function for conditional logging
const debugLog = (message, ...args) => {
  if (DEBUG_IMAGE_CONFIG) {
    console.log(message, ...args);
  }
};

// Default image URLs - sử dụng khi không có trong localStorage
export const defaultImageConfig = {
  // Base URL cho label images (fallback)
  labelBaseUrl: 'https://example.com/images/label',
  
  // Base URL cho value images (fallback)
  valueImgBaseUrl: 'https://example.com/images/value',
  
  // Individual label URLs - thiết lập riêng lẻ từng hình theo index
  labelUrls: {
    0: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/P%40300x.png',
    1: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/R%40300x.png',
    2: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/O%40300x.png', // 2
    3: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/M%40300x.png', // 3
    4: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/O%40300x.png', // 4
    5: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/G%40300x.png', // 5
    6: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/A%40300x.png', // 6
    7: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/M%40300x.png', // 7
    8: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/E%40300x.png', // 8
    9: 'https://s3-sgn10.fptcloud.com/promogame-staging/promo-website/banner/!%40300x.png' // 9
  },
  
  // Individual value image URLs - thiết lập riêng lẻ từng hình theo value
  valueImgUrls: {
    1: 'https://example.com/images/value_1.png',
    2: 'https://example.com/images/value_2.png',
    3: 'https://example.com/images/value_3.png',
    4: 'https://example.com/images/value_4.png',
    5: 'https://example.com/images/value_5.png',
    6: 'https://example.com/images/value_6.png'
  },
  
  // Có thể thêm các URL khác nếu cần
  // backgroundUrl: 'https://example.com/images/background',
  // iconUrl: 'https://example.com/images/icon'
};

// LocalStorage keys
export const IMAGE_CONFIG_KEYS = {
  LABEL_BASE_URL: 'match2_label_base_url',
  VALUE_IMG_BASE_URL: 'match2_value_img_base_url',
  LABEL_URLS: 'match2_label_urls', // Lưu object chứa individual label URLs
  VALUE_IMG_URLS: 'match2_value_img_urls' // Lưu object chứa individual value image URLs
};

// Helper function để lấy URL từ localStorage hoặc fallback về default
export const getImageUrl = (type, index = null) => {
  try {
    let storageKey, defaultUrl, individualStorageKey, defaultIndividualUrls;
    
    switch (type) {
      case 'label':
        storageKey = IMAGE_CONFIG_KEYS.LABEL_BASE_URL;
        defaultUrl = defaultImageConfig.labelBaseUrl;
        individualStorageKey = IMAGE_CONFIG_KEYS.LABEL_URLS;
        defaultIndividualUrls = defaultImageConfig.labelUrls;
        break;
      case 'valueImg':
        storageKey = IMAGE_CONFIG_KEYS.VALUE_IMG_BASE_URL;
        defaultUrl = defaultImageConfig.valueImgBaseUrl;
        individualStorageKey = IMAGE_CONFIG_KEYS.VALUE_IMG_URLS;
        defaultIndividualUrls = defaultImageConfig.valueImgUrls;
        break;
      default:
        console.warn(`Unknown image type: ${type}`);
        return null;
    }
    
    // Nếu có index, ưu tiên lấy individual URL
    if (index !== null) {
      // Lấy individual URLs từ localStorage
      try {
        const storedIndividualUrls = localStorage.getItem(individualStorageKey);
        if (storedIndividualUrls) {
          const parsedUrls = JSON.parse(storedIndividualUrls);
          if (parsedUrls[index]) {
            debugLog(`📥 Using individual ${type} URL from localStorage for index ${index}:`, parsedUrls[index]);
            return parsedUrls[index];
          }
        }
      } catch (parseError) {
        console.warn(`⚠️ Error parsing individual ${type} URLs from localStorage:`, parseError);
      }
      
      // Fallback về default individual URLs
      if (defaultIndividualUrls[index]) {
        debugLog(`📋 Using default individual ${type} URL for index ${index}:`, defaultIndividualUrls[index]);
        return defaultIndividualUrls[index];
      }
      
      // Nếu không có individual URL, tạo từ base URL + index
      const baseUrl = localStorage.getItem(storageKey) || defaultUrl;
      const generatedUrl = `${baseUrl}_${index}`;
      debugLog(`🔧 Generated ${type} URL for index ${index}:`, generatedUrl);
      return generatedUrl;
    }
    
    // Nếu không có index, lấy base URL như cũ
    const storedUrl = localStorage.getItem(storageKey);
    if (storedUrl && storedUrl.trim() !== '') {
      debugLog(`📥 Using ${type} base URL from localStorage:`, storedUrl);
      return storedUrl;
    }
    
    // Fallback về default base URL
    debugLog(`📋 Using default ${type} base URL:`, defaultUrl);
    return defaultUrl;
    
  } catch (error) {
    console.error(`❌ Error getting ${type} URL:`, error);
    // Fallback về default nếu có lỗi
    return type === 'label' ? defaultImageConfig.labelBaseUrl : defaultImageConfig.valueImgBaseUrl;
  }
};

// Helper function để lấy individual URL cho label theo index
export const getLabelUrl = (index) => {
  const url = getImageUrl('label', index);
  console.log(`🏷️ getLabelUrl(${index}) -> ${url}`);
  return url;
};

// Helper function để lấy individual URL cho valueImg theo value
export const getValueImgUrl = (value) => {
  const url = getImageUrl('valueImg', value);
  console.log(`🖼️ getValueImgUrl(${value}) -> ${url}`);
  return url;
};

// Helper function để lưu URL vào localStorage
export const setImageUrl = (type, url, index = null) => {
  try {
    if (index !== null) {
      // Lưu individual URL
      let individualStorageKey;
      
      switch (type) {
        case 'label':
          individualStorageKey = IMAGE_CONFIG_KEYS.LABEL_URLS;
          break;
        case 'valueImg':
          individualStorageKey = IMAGE_CONFIG_KEYS.VALUE_IMG_URLS;
          break;
        default:
          console.warn(`Unknown image type: ${type}`);
          return false;
      }
      
      // Lấy existing individual URLs
      let existingUrls = {};
      try {
        const storedUrls = localStorage.getItem(individualStorageKey);
        if (storedUrls) {
          existingUrls = JSON.parse(storedUrls);
        }
      } catch (parseError) {
        console.warn(`⚠️ Error parsing existing ${type} URLs:`, parseError);
        existingUrls = {};
      }
      
      // Cập nhật URL cho index cụ thể
      existingUrls[index] = url;
      
      // Lưu lại vào localStorage
      localStorage.setItem(individualStorageKey, JSON.stringify(existingUrls));
      debugLog(`💾 Saved individual ${type} URL for index ${index}:`, url);
      return true;
      
    } else {
      // Lưu base URL như cũ
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
      debugLog(`💾 Saved ${type} base URL to localStorage:`, url);
      return true;
    }
    
  } catch (error) {
    console.error(`❌ Error saving ${type} URL:`, error);
    return false;
  }
};

// Helper function để lưu individual label URL
export const setLabelUrl = (index, url) => {
  return setImageUrl('label', url, index);
};

// Helper function để lưu individual valueImg URL
export const setValueImgUrl = (value, url) => {
  return setImageUrl('valueImg', url, value);
};

// Helper function để xóa URL khỏi localStorage (sẽ fallback về default)
export const clearImageUrl = (type, index = null) => {
  try {
    if (index !== null) {
      // Xóa individual URL
      let individualStorageKey;
      
      switch (type) {
        case 'label':
          individualStorageKey = IMAGE_CONFIG_KEYS.LABEL_URLS;
          break;
        case 'valueImg':
          individualStorageKey = IMAGE_CONFIG_KEYS.VALUE_IMG_URLS;
          break;
        default:
          console.warn(`Unknown image type: ${type}`);
          return false;
      }
      
      // Lấy existing individual URLs
      let existingUrls = {};
      try {
        const storedUrls = localStorage.getItem(individualStorageKey);
        if (storedUrls) {
          existingUrls = JSON.parse(storedUrls);
        }
      } catch (parseError) {
        console.warn(`⚠️ Error parsing existing ${type} URLs:`, parseError);
        return true; // Không có gì để xóa
      }
      
      // Xóa URL cho index cụ thể
      delete existingUrls[index];
      
      // Lưu lại vào localStorage
      localStorage.setItem(individualStorageKey, JSON.stringify(existingUrls));
      debugLog(`🗑️ Cleared individual ${type} URL for index ${index}`);
      return true;
      
    } else {
      // Xóa base URL như cũ
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
      debugLog(`🗑️ Cleared ${type} base URL from localStorage`);
      return true;
    }
    
  } catch (error) {
    console.error(`❌ Error clearing ${type} URL:`, error);
    return false;
  }
};

// Helper function để xóa individual label URL
export const clearLabelUrl = (index) => {
  return clearImageUrl('label', index);
};

// Helper function để xóa individual valueImg URL
export const clearValueImgUrl = (value) => {
  return clearImageUrl('valueImg', value);
};

// Helper function để lấy tất cả image config hiện tại
export const getCurrentImageConfig = () => {
  try {
    // Lấy individual URLs từ localStorage
    let labelUrls = {};
    let valueImgUrls = {};
    
    try {
      const storedLabelUrls = localStorage.getItem(IMAGE_CONFIG_KEYS.LABEL_URLS);
      if (storedLabelUrls) {
        labelUrls = JSON.parse(storedLabelUrls);
      }
    } catch (parseError) {
      console.warn('⚠️ Error parsing stored label URLs:', parseError);
    }
    
    try {
      const storedValueImgUrls = localStorage.getItem(IMAGE_CONFIG_KEYS.VALUE_IMG_URLS);
      if (storedValueImgUrls) {
        valueImgUrls = JSON.parse(storedValueImgUrls);
      }
    } catch (parseError) {
      console.warn('⚠️ Error parsing stored value image URLs:', parseError);
    }
    
    const config = {
      // Base URLs
      labelBaseUrl: getImageUrl('label'),
      valueImgBaseUrl: getImageUrl('valueImg'),
      
      // Individual URLs
      labelUrls: {
        ...defaultImageConfig.labelUrls,
        ...labelUrls
      },
      valueImgUrls: {
        ...defaultImageConfig.valueImgUrls,
        ...valueImgUrls
      },
      
      // Sources
      sources: {
        labelBaseUrl: localStorage.getItem(IMAGE_CONFIG_KEYS.LABEL_BASE_URL) ? 'localStorage' : 'default',
        valueImgBaseUrl: localStorage.getItem(IMAGE_CONFIG_KEYS.VALUE_IMG_BASE_URL) ? 'localStorage' : 'default',
        labelUrls: Object.keys(labelUrls).length > 0 ? 'localStorage + default' : 'default',
        valueImgUrls: Object.keys(valueImgUrls).length > 0 ? 'localStorage + default' : 'default'
      }
    };
    
    debugLog('📋 Current Image Config:', config);
    return config;
    
  } catch (error) {
    console.error('❌ Error getting current image config:', error);
    return {
      labelBaseUrl: defaultImageConfig.labelBaseUrl,
      valueImgBaseUrl: defaultImageConfig.valueImgBaseUrl,
      labelUrls: defaultImageConfig.labelUrls,
      valueImgUrls: defaultImageConfig.valueImgUrls,
      sources: {
        labelBaseUrl: 'default',
        valueImgBaseUrl: 'default',
        labelUrls: 'default',
        valueImgUrls: 'default'
      }
    };
  }
};