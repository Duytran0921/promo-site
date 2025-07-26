'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useGameSession } from './hooks/useGameSession';

/**
 * Custom hook quản lý logic game Match-2
 * Tách riêng toàn bộ logic game ra khỏi UI component
 */
export const useMatch2Game = (initialRows = 2, initialCols = 2) => {
  // Game configuration
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  
  // Game mode configuration
  const [gameMode, setGameMode] = useState('Default'); // TimeUP, Multilever, Scrored, Default
  
  // Random value configuration
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(4);
  
  // Game state
  const [cardStates, setCardStates] = useState(() => {
    // Khởi tạo cardStates với structure rõ ràng
    const initialStates = {};
    const initialTotalCards = initialRows * initialCols;
    for (let i = 0; i < initialTotalCards; i++) {
      initialStates[i] = {
        value: 1, // Khởi tạo với giá trị 1 thay vì 0 để tránh confusion
        open: false,
        matched: false
      };
    }
    return initialStates;
  });
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hasInitialRandomized, setHasInitialRandomized] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGeneratingPairs, setIsGeneratingPairs] = useState(false);
  
  // Thêm state để track việc đang cập nhật cardStates
  const [isUpdatingCardStates, setIsUpdatingCardStates] = useState(false);
  
  // Config persistence state
  const [configLoaded, setConfigLoaded] = useState(false);
  const [lastSavedConfig, setLastSavedConfig] = useState(null);
  
  // Game session management
  const {
    currentSession,
    isSessionActive,
    startSession,
    endSession,
    trackClick,
    trackMatch,
    sessionHistory,
    clearSessionHistory,
    getSessionStats
  } = useGameSession();

  // Computed values
  const totalCards = rows * cols;
  const cardIndices = useMemo(() => {
    return Array.from({ length: totalCards }, (_, i) => i);
  }, [totalCards]);
  
  // Debug effect để theo dõi cardIndices thay đổi
  useEffect(() => {
    console.log('🔄 cardIndices changed:', {
      length: cardIndices.length,
      indices: cardIndices,
      totalCards,
      rows,
      cols
    });
  }, [cardIndices, totalCards, rows, cols]);
  
  // Debug effect để theo dõi isGeneratingPairs
  useEffect(() => {
    console.log('🔄 isGeneratingPairs changed:', isGeneratingPairs);
  }, [isGeneratingPairs]);
  
  // Đồng bộ cardStates với cardIndices khi totalCards thay đổi
  useEffect(() => {
    console.log('🔄 Syncing cardStates with new cardIndices:', cardIndices.length);
    setIsUpdatingCardStates(true);
    setCardStates(prev => {
      const newStates = {};
      
      // Tạo mới tất cả card dựa trên cardIndices hiện tại
      cardIndices.forEach(index => {
        // Nếu card đã tồn tại, giữ nguyên trạng thái matched nếu có
        const existingCard = prev[index];
        newStates[index] = {
          value: existingCard?.value || 1,
          open: false, // Luôn reset open state khi thay đổi grid
          matched: existingCard?.matched || false
        };
      });
      
      console.log('✅ Synced cardStates for', Object.keys(newStates).length, 'cards');
      return newStates;
    });
    
    // Đảm bảo cardStates đã được cập nhật trước khi cho phép tương tác
    setTimeout(() => {
      setIsUpdatingCardStates(false);
      console.log('✅ cardStates update completed');
    }, 100);
  }, [cardIndices]);
  
  // Tính toán trạng thái "two-card open" - true khi có đúng 2 card đang được mở (không bao gồm thẻ đã matched)
  const twoCardOpen = useMemo(() => {
    const openCards = Object.values(cardStates).filter(state => state.open && !state.matched);
    return openCards.length === 2;
  }, [cardStates]);
  
  // Tính toán số card đã matched và tổng số cặp cần match
  const matchedCardsCount = useMemo(() => {
    return Object.values(cardStates).filter(state => state.matched).length;
  }, [cardStates]);
  
  const totalMatches = useMemo(() => {
    return Math.floor(totalCards / 2);
  }, [totalCards]);
  
  // Kiểm tra trạng thái game thắng
  const gameWonStatus = useMemo(() => {
    // Game thắng khi tất cả các cặp đã được match
    // Với số card lẻ, card cuối cùng không cần match
    const requiredMatches = totalMatches * 2;
    return matchedCardsCount >= requiredMatches && requiredMatches > 0;
  }, [matchedCardsCount, totalMatches]);
  
  // Config persistence functions
  
  // Get default config
  const getDefaultConfig = useCallback(() => ({
    rows: 2,
    cols: 2,
    gameMode: 'Default',
    minValue: 1,
    maxValue: 4
  }), []);
  
  // Save config to localStorage
  const saveConfig = useCallback(() => {
    try {
      const config = {
        rows,
        cols,
        gameMode,
        minValue,
        maxValue,
        timestamp: Date.now()
      };
      
      localStorage.setItem('match2GameConfig', JSON.stringify(config));
      setLastSavedConfig(config);
      console.log('💾 Config saved to localStorage:', config);
      return true;
    } catch (error) {
      console.error('❌ Failed to save config:', error);
      return false;
    }
  }, [rows, cols, gameMode, minValue, maxValue]);
  
  // Load config from localStorage
  const loadConfig = useCallback(() => {
    try {
      const savedConfig = localStorage.getItem('match2GameConfig');
      if (!savedConfig) {
        console.log('📝 No saved config found, using defaults');
        return false;
      }
      
      const config = JSON.parse(savedConfig);
      
      // Validate config
      if (!config || typeof config !== 'object') {
        console.warn('❌ Invalid config format');
        return false;
      }
      
      // Apply config with validation
      if (config.rows && config.rows > 0) setRows(config.rows);
      if (config.cols && config.cols > 0) setCols(config.cols);
      if (config.gameMode) setGameMode(config.gameMode);
      if (config.minValue && config.minValue > 0) setMinValue(config.minValue);
      if (config.maxValue && config.maxValue >= config.minValue) setMaxValue(config.maxValue);
      
      setLastSavedConfig(config);
      console.log('📥 Config loaded from localStorage:', config);
      return true;
    } catch (error) {
      console.error('❌ Failed to load config:', error);
      return false;
    }
  }, []);
  
  // Auto-load config on mount
  useEffect(() => {
    if (!configLoaded) {
      const loaded = loadConfig();
      setConfigLoaded(true);
      console.log('🔄 Initial config load:', loaded ? 'success' : 'using defaults');
    }
  }, [configLoaded, loadConfig]);
  
  // Game logic functions
  
  // Handle card value changes
  const handleCardValueChange = useCallback((cardIndex, newValue) => {
    // Không cho phép thay đổi khi đang cập nhật cardStates
    if (isUpdatingCardStates) {
      return;
    }
    
    setCardStates(prev => {
      // Tự động tạo card nếu không tồn tại
      const currentCard = prev[cardIndex] || { value: 1, open: false, matched: false };
      
      return {
        ...prev,
        [cardIndex]: {
          ...currentCard,
          value: newValue
        }
      };
    });
  }, [isUpdatingCardStates]);


  
  // Handle card open changes với logic giới hạn 2 thẻ và disable matched cards
  const handleCardOpenChange = useCallback((cardIndex, newOpen) => {
    // Không cho phép thay đổi khi đang cập nhật cardStates
    if (isUpdatingCardStates) {
      return;
    }
    
    // Error handling: Kiểm tra cardIndex hợp lệ
    if (typeof cardIndex !== 'number' || cardIndex < 0) {
      console.warn('Invalid cardIndex:', cardIndex);
      return;
    }
    
    // Track click khi mở thẻ (chỉ khi game đang chạy và đang mở thẻ)
    if (isGameStarted && newOpen) {
      trackClick();
    }
    
    setCardStates(prev => {
      // Error handling: Tự động tạo card nếu không tồn tại
      let currentCard = prev[cardIndex];
      if (!currentCard) {
        console.warn('Card not found, creating new card:', cardIndex);
        currentCard = { value: 1, open: false, matched: false };
        // Tạo state mới với card được tạo
        prev = { ...prev, [cardIndex]: currentCard };
      }
      
      // Kiểm tra nếu thẻ đã matched thì không cho phép thay đổi trạng thái
      if (currentCard.matched) {
        return prev; // Không thực hiện thay đổi nếu thẻ đã matched
      }
      
      // Chỉ áp dụng logic giới hạn khi game đang chạy và đang cố gắng mở thẻ
      if (isGameStarted && newOpen) {
        // Đếm số thẻ hiện tại đang mở (không bao gồm thẻ đã matched)
        const currentOpenCards = Object.values(prev).filter(state => state.open && !state.matched).length;
        
        // Nếu đã có 2 thẻ mở rồi, không cho phép mở thêm
        if (currentOpenCards >= 2) {
          return prev; // Không thực hiện thay đổi
        }
      }
      
      return {
        ...prev,
        [cardIndex]: {
          ...prev[cardIndex],
          open: newOpen
        }
      };
    });
  }, [isGameStarted, isUpdatingCardStates]); // Removed trackClick from dependencies
  
  // Hàm tạo random pairs
  const generateRandomPairs = useCallback(() => {
    // Không cho phép generate khi đang cập nhật cardStates hoặc đang generate
    if (isUpdatingCardStates || isGeneratingPairs) {
      console.warn('❌ Cannot generate pairs while updating card states or already generating');
      return;
    }
    
    console.log('🎲 generateRandomPairs called for', totalCards, 'total cards,', cardIndices.length, 'indices');
    
    // Error handling: Kiểm tra các giá trị đầu vào
    if (totalCards <= 0) {
      console.warn('❌ Invalid totalCards:', totalCards);
      return;
    }
    
    if (minValue > maxValue) {
      console.warn('❌ Invalid value range: minValue > maxValue', { minValue, maxValue });
      return;
    }
    
    // Đảm bảo minValue không bao giờ là 0
    const safeMinValue = Math.max(minValue, 1);
    const safeMaxValue = Math.max(maxValue, safeMinValue);
    
    console.log('🎯 Generating pairs with', cardIndices.length, 'cards, range:', safeMinValue, '-', safeMaxValue);
    
    setCardStates(prevStates => {
      const newStates = {};
      const pairsCount = Math.floor(totalCards / 2);
      
      // Tạo mảng các cặp giá trị trong khoảng min-max với safe values
      const values = [];
      const availableRange = safeMaxValue - safeMinValue + 1;
      
      // Error handling: Đảm bảo có ít nhất 1 giá trị có thể sử dụng
      if (availableRange <= 0) {
        console.warn('❌ No available values in range');
        return prevStates;
      }
      
      // Đảm bảo có đủ giá trị cho tất cả các card
      if (availableRange < pairsCount) {
        // Nếu khoảng giá trị nhỏ hơn số cặp cần thiết, lặp lại các giá trị
        for (let i = 0; i < pairsCount; i++) {
          const value = safeMinValue + (i % availableRange);
          values.push(value, value);
        }
      } else {
        // Chọn ngẫu nhiên các giá trị trong khoảng min-max
        const availableValues = Array.from({length: availableRange}, (_, i) => safeMinValue + i);
        
        // Shuffle và chọn số lượng cần thiết
        for (let i = availableValues.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableValues[i], availableValues[j]] = [availableValues[j], availableValues[i]];
        }
        
        // Đảm bảo có đủ giá trị cho tất cả các cặp
        for (let i = 0; i < pairsCount; i++) {
          const value = availableValues[i % availableValues.length];
          values.push(value, value);
        }
      }
      
      // Nếu số card lẻ, thêm 1 giá trị đơn
      if (totalCards % 2 === 1) {
        const oddValue = safeMinValue + Math.floor(Math.random() * availableRange);
        values.push(oddValue);
      }
      
      // Shuffle mảng để random vị trí
      for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
      }
      
      // Đảm bảo mảng values có đủ phần tử cho tất cả cardIndices
      while (values.length < cardIndices.length) {
        const additionalValue = safeMinValue + Math.floor(Math.random() * availableRange);
        values.push(additionalValue);
      }
      
      console.log('🎲 Generated', values.length, 'values for', cardIndices.length, 'cards:', values);
      
      // Gán giá trị cho từng card
      cardIndices.forEach((index, arrayIndex) => {
        // Error handling: Đảm bảo index hợp lệ
        if (typeof index !== 'number' || index < 0) {
          console.warn('❌ Invalid card index:', index);
          return;
        }
        
        // Đảm bảo value không bao giờ là 0
        const finalValue = values[arrayIndex] !== undefined ? values[arrayIndex] : safeMinValue;
        const validatedValue = Math.max(finalValue, 1); // Double check để đảm bảo không bao giờ là 0
        
        newStates[index] = { 
          ...prevStates[index], 
          value: validatedValue,
          open: false, // Đóng tất cả thẻ khi tạo random pairs mới
          matched: false // Reset matched state khi tạo random pairs mới
        };
      });
      
      console.log('✅ generateRandomPairs completed for', Object.keys(newStates).length, 'cards');
      
      return newStates;
    });
  }, [totalCards, cardIndices, minValue, maxValue, isUpdatingCardStates, isGeneratingPairs]);
  
  // Game control functions
  
  // Start/Reset game với debounce để tránh race condition
  const startGame = useCallback(() => {
    console.log('🚀 startGame called');
    console.log('📊 Current state:', {
      isGeneratingPairs,
      isUpdatingCardStates,
      totalCards,
      cardIndices: cardIndices.length,
      rows,
      cols
    });
    
    // Tránh gọi generateRandomPairs nếu đang trong quá trình tạo
    if (isGeneratingPairs || isUpdatingCardStates) {
      console.warn('❌ Cannot start game while generating pairs or updating card states');
      return;
    }
    
    console.log('✅ Starting game - calling generateRandomPairs for', cardIndices.length, 'cards');
    setIsGeneratingPairs(true);
    
    // Thêm delay nhỏ để đảm bảo state được cập nhật đúng cách
    setTimeout(() => {
      console.log('🔄 Executing generateRandomPairs after delay for', cardIndices.length, 'cards');
      generateRandomPairs();
      // Không gọi setCardStates ở đây vì generateRandomPairs đã xử lý
      // Chỉ cần set các state khác
      setIsGameStarted(true);
      setIsGameWon(false); // Reset game won state
      setIsGeneratingPairs(false);
      
      // Bắt đầu game session
      const gameConfig = {
        gameMode,
        rows,
        cols,
        minValue,
        maxValue
      };
      startSession(gameConfig);
      
      console.log('✅ startGame completed for', cardIndices.length, 'cards');
    }, 50); // 50ms delay để tránh race condition
  }, [generateRandomPairs, isGeneratingPairs, isUpdatingCardStates, cardIndices.length, rows, cols, gameMode, minValue, maxValue]); // Removed startSession from dependencies
  
  // Pause game
  const pauseGame = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        // Error handling: Đảm bảo card tồn tại trước khi cập nhật
        if (prev[index]) {
          newStates[index] = { ...prev[index], open: true };
        } else {
          // Tạo card mới nếu không tồn tại với giá trị hợp lệ
          const safeValue = Math.max(minValue, 1); // Đảm bảo không bao giờ là 0
          newStates[index] = { value: safeValue, open: true, matched: false };
        }
      });
      return newStates;
    });
    setIsGameStarted(false);
    
    // Kết thúc session khi pause (không completed)
    if (isSessionActive) {
      endSession(false);
    }
  }, [cardIndices, minValue, isSessionActive]); // Removed endSession from dependencies
  
  // Toggle game state (start/pause)
  const toggleGameState = useCallback(() => {
    console.log('🔄 toggleGameState called');
    console.log('📊 Current state:', {
      isGameStarted,
      isGameWon,
      isUpdatingCardStates,
      totalCards,
      cardIndices: cardIndices.length,
      rows,
      cols
    });
    
    // Nếu game đã thắng, luôn bắt đầu game mới
    if (isGameWon) {
      console.log('🎉 Game won, starting new game');
      startGame();
    } else if (isGameStarted) {
      console.log('⏸️ Game running, pausing game');
      pauseGame();
    } else {
      console.log('▶️ Game not started, starting game');
      startGame();
    }
  }, [isGameStarted, isGameWon, pauseGame, startGame, totalCards, cardIndices.length, rows, cols]);
  
  // Quick action functions
  
  // Set sequential values
  const setSequentialValues = useCallback(() => {
    const newStates = {};
    cardIndices.forEach((index) => {
      newStates[index] = { 
        value: index + 1, 
        open: true,
        matched: false // Reset matched state
      };
    });
    setCardStates(newStates);
  }, [cardIndices]);
  
  // Open all cards
  const openAllCards = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        // Error handling: Đảm bảo card tồn tại
        if (prev[index]) {
          newStates[index] = { ...prev[index], open: true };
        } else {
          // Tạo card mới với giá trị hợp lệ
          const safeValue = Math.max(minValue, 1); // Đảm bảo không bao giờ là 0
          newStates[index] = { value: safeValue, open: true, matched: false };
        }
      });
      return newStates;
    });
  }, [cardIndices, minValue]);
  
  // Close all cards
  const closeAllCards = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        // Error handling: Đảm bảo card tồn tại
        if (prev[index]) {
          newStates[index] = { ...prev[index], open: false };
        } else {
          // Tạo card mới với giá trị hợp lệ
          const safeValue = Math.max(minValue, 1); // Đảm bảo không bao giờ là 0
          newStates[index] = { value: safeValue, open: false, matched: false };
        }
      });
      return newStates;
    });
  }, [cardIndices, minValue]);
  
  // Reset all values
  const resetAllValues = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        // Error handling: Đảm bảo card tồn tại
        if (prev[index]) {
          newStates[index] = { 
            ...prev[index], 
            value: 0,
            matched: false // Reset matched state
          };
        } else {
          newStates[index] = { value: 0, open: false, matched: false };
        }
      });
      return newStates;
    });
  }, [cardIndices]);
  
  // Debug function
  const copyDebugData = useCallback(() => {
    const debugData = {
      twoCardOpen,
      isGameStarted,
      isGameWon,
      gameStartedRive: isGameStarted, // Thêm thông tin gameStarted cho Rive
      cardStates,
      matchedCards: matchedCardsCount,
      totalMatches: totalMatches,
      gameWonStatus,
      isUpdatingCardStates,
      totalCards,
      cardIndices,
      // Config persistence info
      configLoaded,
      lastSavedConfig,
      currentConfig: {
        rows,
        cols,
        gameMode,
        minValue,
        maxValue
      }
    };
    navigator.clipboard.writeText(JSON.stringify(debugData, null, 2));
  }, [twoCardOpen, isGameStarted, isGameWon, cardStates, matchedCardsCount, totalMatches, gameWonStatus, isUpdatingCardStates, totalCards, cardIndices, configLoaded, lastSavedConfig, rows, cols, gameMode, minValue, maxValue]);
  
  // Effects
  
  // Tự động chạy random pairs 1 lần duy nhất khi khởi tạo
  useEffect(() => {
    if (cardIndices.length > 0 && !hasInitialRandomized && !isUpdatingCardStates) {
      // Delay nhỏ để đảm bảo Rive đã load hoàn toàn
      const timer = setTimeout(() => {
        console.log('🎯 Initial randomization with', cardIndices.length, 'cards');
        generateRandomPairs();
        setHasInitialRandomized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cardIndices.length, hasInitialRandomized, generateRandomPairs, isUpdatingCardStates]);

  // Chạy random pairs khi rows hoặc cols thay đổi (sau khi đã khởi tạo lần đầu)
  useEffect(() => {
    if (hasInitialRandomized && cardIndices.length > 0 && !isUpdatingCardStates) {
      // Delay nhỏ để đảm bảo cardIndices đã được cập nhật hoàn toàn
      const timer = setTimeout(() => {
        console.log('🔄 Grid size changed, regenerating pairs for', cardIndices.length, 'cards');
        generateRandomPairs();
      }, 100); // Tăng delay từ 50ms lên 100ms để đảm bảo cardStates đã được cập nhật
      return () => clearTimeout(timer);
    }
  }, [rows, cols, hasInitialRandomized, generateRandomPairs, isUpdatingCardStates]);

  // Logic game: Kiểm tra khi có 2 card mở để xử lý match/không match
  useEffect(() => {
    if (twoCardOpen && isGameStarted && !isUpdatingCardStates) {
      // Tìm 2 card đang mở (không bao gồm thẻ đã matched)
      const openCardEntries = Object.entries(cardStates).filter(([_, state]) => state.open && !state.matched);
      
      if (openCardEntries.length === 2) {
        const [card1Index, card1State] = openCardEntries[0];
        const [card2Index, card2State] = openCardEntries[1];
        
        // Kiểm tra nếu 2 card match (value giống nhau)
        if (card1State.value === card2State.value) {
          // Track match trong session
          const currentMatchedPairs = Object.values(cardStates).filter(state => state.matched).length;
          trackMatch(currentMatchedPairs);
          
          // Đánh dấu 2 card đã match
          const timer = setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              [card1Index]: { ...prev[card1Index], matched: true },
              [card2Index]: { ...prev[card2Index], matched: true }
            }));
          }, 500); // Delay ngắn để người chơi thấy được 2 thẻ match
          
          return () => clearTimeout(timer);
        } else {
          // Đóng 2 card lại sau 1 giây nếu không match
          const timer = setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              [card1Index]: { ...prev[card1Index], open: false },
              [card2Index]: { ...prev[card2Index], open: false }
            }));
          }, 1000);
          
          return () => clearTimeout(timer);
        }
      }
    }
  }, [twoCardOpen, isGameStarted, cardStates, isUpdatingCardStates]); // Removed trackMatch from dependencies
  
  // Cập nhật trạng thái game thắng
  useEffect(() => {
    setIsGameWon(gameWonStatus);
    
    // Kết thúc session khi game thắng
    if (gameWonStatus && isSessionActive) {
      endSession(true); // completed = true
    }
  }, [gameWonStatus, isSessionActive]); // Removed endSession from dependencies
  
  // Reset isGeneratingPairs sau khi generateRandomPairs hoàn thành
  useEffect(() => {
    if (isGeneratingPairs) {
      const timer = setTimeout(() => {
        console.log('🔄 Resetting isGeneratingPairs flag');
        setIsGeneratingPairs(false);
      }, 100); // Delay để đảm bảo generateRandomPairs đã hoàn thành
      return () => clearTimeout(timer);
    }
  }, [isGeneratingPairs]);
  

  
  // Create config object for compatibility
  const config = {
    labelOn: false, // Default value for basic useMatch2Game
    valueImgOn: false // Default value for basic useMatch2Game
  };

  // Return all game state and functions
  return {
    // Game configuration
    config,
    rows,
    cols,
    setRows,
    setCols,
    totalCards,
    cardIndices,
    
    // Game mode configuration
    gameMode,
    setGameMode,
    
    // Random value configuration
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    
    // Game state
    cardStates,
    isGameStarted,
    isGameWon,
    twoCardOpen,
    isUpdatingCardStates, // Export để UI có thể disable tương tác
    
    // Card handlers
    handleCardValueChange,
    handleCardOpenChange,
    
    // Game control
    generateRandomPairs,
    startGame,
    pauseGame,
    toggleGameState,
    
    // Quick actions
    setSequentialValues,
    openAllCards,
    closeAllCards,
    resetAllValues,
    
    // Config persistence
    saveConfig,
    loadConfig,
    configLoaded,
    lastSavedConfig,
    
    // Game session
    currentSession,
    isSessionActive,
    sessionHistory,
    clearSessionHistory,
    getSessionStats,
    
    // Debug
    copyDebugData,
    

  };
};