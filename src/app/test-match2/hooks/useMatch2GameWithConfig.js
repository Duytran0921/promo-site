'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { defaultConfig, validateGameConfig } from '../configs/gameConfig';

/**
 * Enhanced version of useMatch2Game that accepts external configuration
 * Tách riêng toàn bộ logic game ra khỏi UI component với hỗ trợ config
 */
export const useMatch2GameWithConfig = (gameConfig = defaultConfig) => {
  // Validate config on initialization
  useEffect(() => {
    try {
      validateGameConfig(gameConfig);
    } catch (error) {
      console.error('Invalid game config:', error.message);
      // Fallback to default config if validation fails
    }
  }, [gameConfig]);

  // Use config values or fallback to defaults
  const config = useMemo(() => {
    try {
      validateGameConfig(gameConfig);
      return gameConfig;
    } catch (error) {
      console.warn('Using default config due to validation error:', error.message);
      return defaultConfig;
    }
  }, [gameConfig]);

  // Game configuration from config
  const [rows] = useState(config.rows);
  const [cols] = useState(config.cols);
  const [minValue] = useState(config.minValue);
  const [maxValue] = useState(config.maxValue);
  const autoPauseTimerDuration = config.autoPauseTimer;
  
  // Game state
  const [cardStates, setCardStates] = useState({});
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hasInitialRandomized, setHasInitialRandomized] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLose, setIsGameLose] = useState(false);
  
  // TimeUp mode timer state
  const [timeUpTimer, setTimeUpTimer] = useState(0);
  const timeUpTimerRef = useRef(null);
  
  // Auto-pause timer ref
  const autoPauseTimerRef = useRef(null);
  
  // Computed values
  const totalCards = rows * cols;
  const cardIndices = useMemo(() => {
    return Array.from({ length: totalCards }, (_, i) => i);
  }, [totalCards]);
  
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
  
  // Game logic functions
  
  // Handle card value changes
  const handleCardValueChange = useCallback((cardIndex, newValue) => {
    setCardStates(prev => ({
      ...prev,
      [cardIndex]: {
        ...prev[cardIndex],
        value: newValue
      }
    }));
  }, []);

  // Function để reset auto-pause timer
  const resetAutoPauseTimer = useCallback(() => {
    // Clear existing timer
    if (autoPauseTimerRef.current) {
      clearTimeout(autoPauseTimerRef.current);
    }
    
    // Chỉ set timer mới nếu game KHÔNG đang chạy (gameStarted = false) và không phải TimeUp mode
    if (!isGameStarted && config.gameMode !== 'timeUp') {
      autoPauseTimerRef.current = setTimeout(() => {
        setIsGameStarted(false);
        setIsGameWon(false); // Reset game won state khi auto-pause
        setIsGameLose(false); // Reset game lose state khi auto-pause
        // Đóng tất cả thẻ khi auto-pause
        const newStates = {};
        Object.keys(cardStates).forEach((index) => {
          newStates[index] = { ...cardStates[index], open: false };
        });
        setCardStates(prev => ({ ...prev, ...newStates }));
      }, autoPauseTimerDuration);
    }
  }, [isGameStarted, cardStates, autoPauseTimerDuration, config.gameMode]);
  
  // Function để start TimeUp timer
  const startTimeUpTimer = useCallback(() => {
    if (config.gameMode === 'timeUp' && config.timeUpDuration) {
      setTimeUpTimer(Math.floor(config.timeUpDuration / 1000));
      
      // Clear existing timer
      if (timeUpTimerRef.current) {
        clearInterval(timeUpTimerRef.current);
      }
      
      // Start countdown
      timeUpTimerRef.current = setInterval(() => {
        setTimeUpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timeUpTimerRef.current);
            // Check if game is not won yet, then set game lose
            setIsGameLose(true);
            setIsGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [config.gameMode, config.timeUpDuration]);
  
  // Function để stop TimeUp timer
  const stopTimeUpTimer = useCallback(() => {
    if (timeUpTimerRef.current) {
      clearInterval(timeUpTimerRef.current);
      timeUpTimerRef.current = null;
    }
  }, []);
  
  // Handle card open changes với logic giới hạn 2 thẻ và disable matched cards
  const handleCardOpenChange = useCallback((cardIndex, newOpen) => {
    // KHÔNG reset auto-pause timer khi game đang chạy
    // Chỉ reset khi game chưa bắt đầu và là normal mode
    if (config.gameMode === 'normal' && !isGameStarted) {
      resetAutoPauseTimer();
    }
    
    // Kiểm tra nếu thẻ đã matched thì không cho phép thay đổi trạng thái
    const currentCard = cardStates[cardIndex];
    if (currentCard && currentCard.matched) {
      return; // Không thực hiện thay đổi nếu thẻ đã matched
    }
    
    // Chỉ áp dụng logic giới hạn khi game đang chạy và đang cố gắng mở thẻ
    if (isGameStarted && newOpen) {
      // Đếm số thẻ hiện tại đang mở (không bao gồm thẻ đã matched)
      const currentOpenCards = Object.values(cardStates).filter(state => state.open && !state.matched).length;
      
      // Nếu đã có 2 thẻ mở rồi, không cho phép mở thêm
      if (currentOpenCards >= 2) {
        return; // Không thực hiện thay đổi
      }
    }
    
    setCardStates(prev => ({
      ...prev,
      [cardIndex]: {
        ...prev[cardIndex],
        open: newOpen
      }
    }));
  }, [cardStates, isGameStarted, resetAutoPauseTimer, config.gameMode]);
  
  // Hàm tạo random pairs
  const generateRandomPairs = useCallback(() => {
    setCardStates(prevStates => {
      const newStates = {};
      const pairsCount = Math.floor(totalCards / 2);
      
      // Tạo mảng các cặp giá trị trong khoảng min-max
      const values = [];
      const availableRange = maxValue - minValue + 1;
      
      // Đảm bảo có đủ giá trị cho tất cả các card
      if (availableRange < pairsCount) {
        // Nếu khoảng giá trị nhỏ hơn số cặp cần thiết, lặp lại các giá trị
        for (let i = 0; i < pairsCount; i++) {
          const value = minValue + (i % availableRange);
          values.push(value, value);
        }
      } else {
        // Chọn ngẫu nhiên các giá trị trong khoảng min-max
        const availableValues = Array.from({length: availableRange}, (_, i) => minValue + i);
        
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
        const oddValue = minValue + Math.floor(Math.random() * availableRange);
        values.push(oddValue);
      }
      
      // Shuffle mảng để random vị trí
      for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
      }
      
      // Đảm bảo mảng values có đủ phần tử cho tất cả cardIndices
      while (values.length < cardIndices.length) {
        const additionalValue = minValue + Math.floor(Math.random() * availableRange);
        values.push(additionalValue);
      }
      
      // Gán giá trị cho từng card
      cardIndices.forEach((index, arrayIndex) => {
        newStates[index] = { 
          ...prevStates[index], 
          value: values[arrayIndex] !== undefined ? values[arrayIndex] : minValue,
          matched: false // Reset matched state khi tạo random pairs mới
        };
      });
      
      return newStates;
    });
  }, [totalCards, cardIndices, minValue, maxValue]);
  
  // Game control functions
  
  // Start/Reset game
  const startGame = useCallback(() => {
    generateRandomPairs();
    const newStates = {};
    cardIndices.forEach((index) => {
      newStates[index] = { 
        ...cardStates[index], 
        open: false,
        matched: false // Reset matched state khi start game
      };
    });
    setCardStates(newStates);
    setIsGameStarted(true);
    setIsGameWon(false); // Reset game won state
    setIsGameLose(false); // Reset game lose state
    
    // Bắt đầu timer tương ứng với game mode
    if (config.gameMode === 'timeUp') {
      startTimeUpTimer();
    }
    // Không gọi resetAutoPauseTimer khi game started = true
  }, [generateRandomPairs, cardIndices, cardStates, config.gameMode, startTimeUpTimer]);
  
  // Pause game
  const pauseGame = useCallback(() => {
    // Clear timers khi pause manual
    if (autoPauseTimerRef.current) {
      clearTimeout(autoPauseTimerRef.current);
      autoPauseTimerRef.current = null;
    }
    
    if (config.gameMode === 'timeUp') {
      stopTimeUpTimer();
    }
    
    const newStates = {};
    cardIndices.forEach((index) => {
      newStates[index] = { ...cardStates[index], open: true };
    });
    setCardStates(newStates);
    setIsGameStarted(false);
  }, [cardIndices, cardStates, config.gameMode, stopTimeUpTimer]);
  
  // Toggle game state (start/pause)
  const toggleGameState = useCallback(() => {
    if (isGameStarted) {
      pauseGame();
    } else {
      startGame();
    }
  }, [isGameStarted, pauseGame, startGame]);
  
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
    const newStates = {};
    cardIndices.forEach((index) => {
      newStates[index] = { ...cardStates[index], open: true };
    });
    setCardStates(newStates);
  }, [cardIndices, cardStates]);
  
  // Close all cards
  const closeAllCards = useCallback(() => {
    const newStates = {};
    cardIndices.forEach((index) => {
      newStates[index] = { ...cardStates[index], open: false };
    });
    setCardStates(newStates);
  }, [cardIndices, cardStates]);
  
  // Reset all values
  const resetAllValues = useCallback(() => {
    const newStates = {};
    cardIndices.forEach((index) => {
      newStates[index] = { 
        ...cardStates[index], 
        value: 0,
        matched: false // Reset matched state
      };
    });
    setCardStates(newStates);
  }, [cardIndices, cardStates]);
  
  // Debug function
  const copyDebugData = useCallback(() => {
    const debugData = {
      config: config,
      twoCardOpen,
      isGameStarted,
      isGameWon,
      gameStartedRive: isGameStarted, // Thêm thông tin gameStarted cho Rive
      cardStates,
      matchedCards: matchedCardsCount,
      totalMatches: totalMatches,
      gameWonStatus
    };
    navigator.clipboard.writeText(JSON.stringify(debugData, null, 2));
  }, [config, twoCardOpen, isGameStarted, isGameWon, cardStates, matchedCardsCount, totalMatches, gameWonStatus]);
  
  // Effects
  
  // Tự động chạy random pairs 1 lần duy nhất khi khởi tạo
  useEffect(() => {
    if (cardIndices.length > 0 && !hasInitialRandomized) {
      // Delay nhỏ để đảm bảo Rive đã load hoàn toàn
      const timer = setTimeout(() => {
        generateRandomPairs();
        setHasInitialRandomized(true);
        
        // Auto start if configured
        if (config.autoStart) {
          startGame();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cardIndices.length, hasInitialRandomized, generateRandomPairs, config.autoStart, startGame]);

  // Chạy random pairs khi rows hoặc cols thay đổi (sau khi đã khởi tạo lần đầu)
  useEffect(() => {
    if (hasInitialRandomized && cardIndices.length > 0) {
      // Delay nhỏ để đảm bảo cardIndices đã được cập nhật hoàn toàn
      const timer = setTimeout(() => {
        generateRandomPairs();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [rows, cols, hasInitialRandomized, generateRandomPairs]);

  // Logic game: Kiểm tra khi có 2 card mở để xử lý match/không match
  useEffect(() => {
    if (twoCardOpen && isGameStarted) {
      // Tìm 2 card đang mở (không bao gồm thẻ đã matched)
      const openCardEntries = Object.entries(cardStates).filter(([_, state]) => state.open && !state.matched);
      
      if (openCardEntries.length === 2) {
        const [card1Index, card1State] = openCardEntries[0];
        const [card2Index, card2State] = openCardEntries[1];
        
        // Kiểm tra nếu 2 card match (value giống nhau)
        if (card1State.value === card2State.value) {
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
  }, [twoCardOpen, isGameStarted, cardStates]);
  
  // Cập nhật trạng thái game thắng
  useEffect(() => {
    setIsGameWon(gameWonStatus);
  }, [gameWonStatus]);
  
  // Effect để cleanup timer khi component unmount
  useEffect(() => {
    return () => {
      if (autoPauseTimerRef.current) {
        clearTimeout(autoPauseTimerRef.current);
      }
      if (timeUpTimerRef.current) {
        clearInterval(timeUpTimerRef.current);
      }
    };
  }, []);
  
  // Effect để reset timer khi isGameStarted thay đổi
  useEffect(() => {
    if (isGameStarted) {
      // Khi game bắt đầu, chỉ start TimeUp timer nếu là TimeUp mode
      if (config.gameMode === 'timeUp') {
        startTimeUpTimer();
      }
      // Không start auto-pause timer khi game đang chạy
    } else {
      // Clear timers khi game stop
      if (autoPauseTimerRef.current) {
        clearTimeout(autoPauseTimerRef.current);
        autoPauseTimerRef.current = null;
      }
      if (timeUpTimerRef.current) {
        clearInterval(timeUpTimerRef.current);
        timeUpTimerRef.current = null;
      }
      
      // Bắt đầu auto-pause timer khi game dừng (chỉ cho normal mode)
      if (config.gameMode === 'normal') {
        resetAutoPauseTimer();
      }
    }
  }, [isGameStarted, resetAutoPauseTimer, config.gameMode, startTimeUpTimer]);
  
  // Effect để check game lose khi hết thời gian trong TimeUp mode
  useEffect(() => {
    if (config.gameMode === 'timeUp' && timeUpTimer === 0 && isGameStarted && !isGameWon) {
      setIsGameLose(true);
      setIsGameStarted(false);
    }
  }, [config.gameMode, timeUpTimer, isGameStarted, isGameWon]);
  
  // Return all game state and functions
  return {
    // Game configuration (read-only from config)
    config,
    rows,
    cols,
    totalCards,
    cardIndices,
    minValue,
    maxValue,
    autoPauseTimerDuration,
    
    // Game state
    cardStates,
    isGameStarted,
    isGameWon,
    isGameLose,
    twoCardOpen,
    timeUpTimer, // Timer cho TimeUp mode
    
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
    
    // Debug
    copyDebugData,
    
    // Timer functions
    resetAutoPauseTimer,
    startTimeUpTimer,
    stopTimeUpTimer
  };
};

export default useMatch2GameWithConfig;