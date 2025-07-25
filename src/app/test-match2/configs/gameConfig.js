// Game configuration files
// Mỗi config định nghĩa một variant của game Match-2

export const defaultConfig = {
  id: 'default',
  name: 'Default Game',
  // Grid configuration
  rows: 2,
  cols: 2,
  // Value range for cards
  minValue: 1,
  maxValue: 4,
  // Timer configuration (in milliseconds)
  autoPauseTimer: 10000, // 10 seconds
  // Game mode configuration
  gameMode: 'normal', // 'normal' or 'timeUp'
  timeUpDuration: 30000, // 30 seconds for timeUp mode
  // UI configuration
  cardGap: 4,
  cardWidth: 128, // Width of each card in pixels
  cardHeight: 176, // Height of each card in pixels
  // Game behavior
  autoStart: false,
  showTimer: true,
  enablePointerEvents: true,
  // Card image configuration
  labelOn: false, // Boolean to show/hide label
  valueImgOn: false // Boolean to show/hide value image
};

export const easyConfig = {
  id: 'easy',
  name: 'Easy Mode',
  rows: 2,
  cols: 3,
  minValue: 1,
  maxValue: 3,
  autoPauseTimer: 15000, // 15 seconds
  gameMode: 'normal',
  timeUpDuration: 45000, // 45 seconds for timeUp mode
  cardGap: 4,
  cardWidth: 128, // Width of each card in pixels
  cardHeight: 176, // Height of each card in pixels
  autoStart: false,
  showTimer: true,
  enablePointerEvents: true,
  // Card image configuration
  labelOn: false, // Boolean to show/hide label
  valueImgOn: false // Boolean to show/hide value image
};

export const mediumConfig = {
  id: 'medium',
  name: 'Medium Mode',
  rows: 3,
  cols: 4,
  minValue: 1,
  maxValue: 6,
  autoPauseTimer: 12000, // 12 seconds
  gameMode: 'normal',
  timeUpDuration: 35000, // 35 seconds for timeUp mode
  cardGap: 3,
  cardWidth: 128, // Width of each card in pixels
  cardHeight: 176, // Height of each card in pixels
  autoStart: false,
  showTimer: true,
  enablePointerEvents: true,
  // Card image configuration
  labelOn: false, // Boolean to show/hide label
  valueImgOn: false // Boolean to show/hide value image
};

export const hardConfig = {
  id: 'hard',
  name: 'Hard Mode',
  rows: 4,
  cols: 5,
  minValue: 1,
  maxValue: 10,
  autoPauseTimer: 8000, // 8 seconds
  gameMode: 'normal',
  timeUpDuration: 25000, // 25 seconds for timeUp mode
  cardGap: 2,
  cardWidth: 128, // Width of each card in pixels
  cardHeight: 176, // Height of each card in pixels
  autoStart: false,
  showTimer: false, // No timer display in hard mode
  enablePointerEvents: true,
  // Card image configuration
  labelOn: false, // Boolean to show/hide label
  valueImgOn: false // Boolean to show/hide value image
};

export const bannerConfig = {
  id: 'banner',
  name: 'Banner Mode',
  rows: 2,
  cols: 5,
  minValue: 1,
  maxValue: 4,
  autoPauseTimer: 8000, // 8 seconds
  gameMode: 'normal',
  timeUpDuration: 25000, // 25 seconds for timeUp mode
  cardGap: 2,
  cardWidth: 160, // Width of each card in pixels
  cardHeight: 220, // Height of each card in pixels
  autoStart: false,
  showTimer: false, // No timer display in hard mode
  enablePointerEvents: true,
  // Card image configuration
  labelOn: false, // Boolean to show/hide label
  valueImgOn: false // Boolean to show/hide value image
};

// TimeUp mode configs
export const timeUpEasyConfig = {
  ...easyConfig,
  id: 'timeUpEasy',
  name: 'TimeUp Easy Mode',
  gameMode: 'timeUp',
  showTimer: true
};

export const timeUpMediumConfig = {
  ...mediumConfig,
  id: 'timeUpMedium',
  name: 'TimeUp Medium Mode',
  gameMode: 'timeUp',
  showTimer: true
};

export const timeUpHardConfig = {
  ...hardConfig,
  id: 'timeUpHard',
  name: 'TimeUp Hard Mode',
  gameMode: 'timeUp',
  showTimer: true
};

// Export all configs
export const gameConfigs = {
  default: defaultConfig,
  easy: easyConfig,
  medium: mediumConfig,
  hard: hardConfig,
  banner: bannerConfig,
  timeUpEasy: timeUpEasyConfig,
  timeUpMedium: timeUpMediumConfig,
  timeUpHard: timeUpHardConfig
};

// Helper function to get config by id
export const getGameConfig = (configId) => {
  return gameConfigs[configId] || defaultConfig;
};

// Helper function to validate config
export const validateGameConfig = (config) => {
  const required = ['id', 'name', 'rows', 'cols', 'minValue', 'maxValue', 'autoPauseTimer', 'gameMode', 'labelOn', 'valueImgOn', 'cardWidth', 'cardHeight'];
  const missing = required.filter(key => !(key in config));
  
  if (missing.length > 0) {
    throw new Error(`Missing required config properties: ${missing.join(', ')}`);
  }
  
  if (config.rows < 1 || config.cols < 1) {
    throw new Error('Rows and cols must be at least 1');
  }
  
  if (config.minValue >= config.maxValue) {
    throw new Error('minValue must be less than maxValue');
  }
  
  if (config.autoPauseTimer < 1000) {
    throw new Error('autoPauseTimer must be at least 1000ms');
  }
  
  if (!['normal', 'timeUp'].includes(config.gameMode)) {
    throw new Error('gameMode must be either "normal" or "timeUp"');
  }
  
  if (config.gameMode === 'timeUp' && (!config.timeUpDuration || config.timeUpDuration < 1000)) {
    throw new Error('timeUpDuration must be at least 1000ms when gameMode is "timeUp"');
  }
  
  // Validate image properties
  if (typeof config.labelOn !== 'boolean') {
    throw new Error('labelOn must be a boolean');
  }
  
  if (typeof config.valueImgOn !== 'boolean') {
    throw new Error('valueImgOn must be a boolean');
  }
  
  // Validate card dimensions
  if (typeof config.cardWidth !== 'number' || config.cardWidth <= 0) {
    throw new Error('cardWidth must be a positive number');
  }
  
  if (typeof config.cardHeight !== 'number' || config.cardHeight <= 0) {
    throw new Error('cardHeight must be a positive number');
  }
  
  return true;
};