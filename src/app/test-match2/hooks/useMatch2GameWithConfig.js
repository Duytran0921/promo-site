'use client';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { defaultConfig, validateGameConfig } from '../configs/gameConfig';
import { getImageUrl } from '../configs/imageConfig';
import { useGameSession } from './useGameSession';

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
  const [gameRestartKey, setGameRestartKey] = useState(0); // Force regenerate cardIndices
  
  // TimeUp mode timer state
  const [timeUpTimer, setTimeUpTimer] = useState(0);
  const timeUpTimerRef = useRef(null);
  
  // Auto-pause timer ref
  const autoPauseTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null); // Timer cho auto-pause sau 30s không có pointer event
  
  // Web Worker for inactivity timer (không bị throttling khi tab inactive)
  const inactivityWorkerRef = useRef(null);
  const [isWorkerReady, setIsWorkerReady] = useState(false);
  
  // Page visibility state để xử lý timer throttling khi tab inactive
  const [isPageVisible, setIsPageVisible] = useState(true);
  const inactivityStartTimeRef = useRef(null); // Lưu thời điểm bắt đầu timer
  const remainingTimeRef = useRef(30000); // Thời gian còn lại của timer (mặc định 30s)
  const isPausedByInactivityRef = useRef(false); // Flag để theo dõi xem game có bị pause bởi inactivity timer không
  
  // Web Worker setup để xử lý inactivity timer không bị throttling
  useEffect(() => {
    // Khởi tạo Web Worker
    try {
      const worker = new Worker('/workers/inactivityTimer.js');
      inactivityWorkerRef.current = worker;
      
      // Xử lý messages từ worker
      worker.onmessage = (e) => {
        const { type, payload } = e.data;
        
        switch (type) {
          case 'TIMER_COMPLETED':
            // console.log('🔄 Auto-pausing game due to 30s inactivity (Web Worker)');
            isPausedByInactivityRef.current = true;
            pauseGame();
            break;
            
          // case 'TIMER_STARTED':
          //   console.log('▶️ Inactivity timer started (Web Worker):', payload.duration + 'ms');
          //   break;
            
          // case 'TIMER_STOPPED':
          //   console.log('⏹️ Inactivity timer stopped (Web Worker)');
          //   break;
            
          // case 'TIMER_PAUSED':
          //   console.log('⏸️ Inactivity timer paused (Web Worker), remaining:', payload.remainingTime + 'ms');
          //   break;
            
          // case 'TIMER_RESUMED':
          //   console.log('▶️ Inactivity timer resumed (Web Worker), remaining:', payload.remainingTime + 'ms');
          //   break;
            
          // case 'TIMER_STATUS':
          //   // Optional: handle status updates
          //   break;
            
          default:
            // console.warn('Unknown worker message type:', type);
        }
      };
      
      worker.onerror = (error) => {
        console.error('Web Worker error:', error);
        setIsWorkerReady(false);
      };
      
      setIsWorkerReady(true);
      console.log('✅ Inactivity Web Worker initialized');
      
    } catch (error) {
      console.error('Failed to initialize Web Worker:', error);
      setIsWorkerReady(false);
    }
    
    // Cleanup
    return () => {
      if (inactivityWorkerRef.current) {
        inactivityWorkerRef.current.terminate();
        inactivityWorkerRef.current = null;
        setIsWorkerReady(false);
        console.log('🧹 Inactivity Web Worker terminated');
      }
    };
  }, []); // Chỉ chạy một lần khi component mount
  
  // Page Visibility API setup - chỉ để track trạng thái, KHÔNG pause/resume timer
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsPageVisible(isVisible);
      console.log('📱 Tab visibility changed:', isVisible ? 'visible' : 'hidden', '- Timer continues running');
    };
    
    // Add event listener
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Không cần dependencies vì chỉ track visibility
  
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
    console.log('🔄 cardIndices recalculated:', { rows, cols, totalCards, gameRestartKey });
    return Array.from({ length: totalCards }, (_, i) => i);
  }, [totalCards, gameRestartKey]);
  
  // Tính toán trạng thái "two-card open" - true khi có đúng 2 card đang được mở (không bao gồm thẻ đã matched)
  const twoCardOpen = useMemo(() => {
    const openCards = Object.values(cardStates).filter(state => state.open && !state.matched);
    return openCards.length === 2;
  }, [cardStates]);
  
  // Tính toán trạng thái "two-card open but no match" - true khi có 2 thẻ mở nhưng không match
  const twoCardOpenNoMatch = useMemo(() => {
    if (!twoCardOpen) return false;
    
    const openCards = Object.values(cardStates).filter(state => state.open && !state.matched);
    if (openCards.length !== 2) return false;
    
    // Kiểm tra xem 2 thẻ mở có cùng giá trị không
    const [card1, card2] = openCards;
    return card1.value !== card2.value;
  }, [cardStates, twoCardOpen]);
  
  // Tính toán trạng thái "two-card open and match" - true khi có 2 thẻ mở và match
  const twoCardOpenAndMatch = useMemo(() => {
    if (!twoCardOpen) return false;
    
    const openCards = Object.values(cardStates).filter(state => state.open && !state.matched);
    if (openCards.length !== 2) return false;
    
    // Kiểm tra xem 2 thẻ mở có cùng giá trị không
    const [card1, card2] = openCards;
    return card1.value === card2.value;
  }, [cardStates, twoCardOpen]);
  
  // Tính toán trạng thái animation trigger cho START/RESTART
  const startRestartAnimation = useMemo(() => {
    // Trigger animation khi game vừa bắt đầu hoặc restart
    return isGameStarted && Object.values(cardStates).every(state => !state.open && !state.matched);
  }, [isGameStarted, cardStates]);
  
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
    
    // Chỉ set timer mới nếu game KHÔNG đang chạy và không phải TimeUp mode
    if (!isGameStarted && config.gameMode !== 'timeUp' && !isGameWon) {
      autoPauseTimerRef.current = setTimeout(() => {
        setIsGameStarted(false);
        setIsGameWon(false); // Reset game won state khi auto-pause
        setIsGameLose(false); // Reset game lose state khi auto-pause
        // Đóng tất cả thẻ khi auto-pause
        setCardStates(prev => {
          const newStates = {};
          Object.keys(prev).forEach((index) => {
            newStates[index] = { ...prev[index], open: false };
          });
          return newStates;
        });
      }, autoPauseTimerDuration);
    }
  }, [isGameStarted, isGameWon, autoPauseTimerDuration, config.gameMode]);
  



  
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
  
  // Pause game
  const pauseGame = useCallback(() => {
    // Clear timers
    if (autoPauseTimerRef.current) {
      clearTimeout(autoPauseTimerRef.current);
      autoPauseTimerRef.current = null;
    }
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    
    // Stop Web Worker timer
    if (isWorkerReady && inactivityWorkerRef.current) {
      inactivityWorkerRef.current.postMessage({ type: 'STOP_TIMER' });
    }
    
    // Reset inactivity timer state
    remainingTimeRef.current = 30000;
    inactivityStartTimeRef.current = null;
    isPausedByInactivityRef.current = false; // Reset flag khi start game
    
    if (config.gameMode === 'timeUp') {
      stopTimeUpTimer();
    }
    
    // Đóng tất cả các thẻ với animation tuần tự
    cardIndices.forEach((index, arrayIndex) => {
      setTimeout(() => {
        setCardStates(prev => ({
          ...prev,
          [index]: { 
            ...prev[index], 
            open: false // Đóng từng thẻ lần lượt
          }
        }));
      }, arrayIndex * 50); // Mỗi thẻ cách nhau 50ms để tạo hiệu ứng animation
    });
    
    setIsGameStarted(false);
  }, [cardIndices, config.gameMode, stopTimeUpTimer, isWorkerReady]);
  
  // Reset inactivity timer (sử dụng Web Worker để tránh throttling)
  const resetInactivityTimer = useCallback(() => {
    // Clear existing fallback timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    
    // Reset remaining time về 30s
    remainingTimeRef.current = 30000;
    
    // Start new timer only if game is started, not in TimeUp mode
    if (isGameStarted && config.gameMode !== 'timeUp') {
      if (isWorkerReady && inactivityWorkerRef.current) {
        // Sử dụng Web Worker (không bị throttling)
        inactivityWorkerRef.current.postMessage({
          type: 'RESET_TIMER',
          payload: { duration: 30000 } // 30 seconds
        });
      } else {
        // Fallback to regular timer nếu worker không sẵn sàng
        inactivityStartTimeRef.current = Date.now();
        inactivityTimerRef.current = setTimeout(() => {
          console.log('🔄 Auto-pausing game due to 30s inactivity (fallback)');
          isPausedByInactivityRef.current = true;
          pauseGame();
        }, 30000);
      }
    } else {
      // Stop Web Worker timer nếu game không đang chạy hoặc là TimeUp mode
      if (isWorkerReady && inactivityWorkerRef.current) {
        inactivityWorkerRef.current.postMessage({ type: 'STOP_TIMER' });
        console.log('⏹️ Inactivity timer stopped - game not started or TimeUp mode');
      }
    }
  }, [isGameStarted, config.gameMode, pauseGame, isWorkerReady]);

  // Track pointer activity (để gọi từ các component khác)
  const trackPointerActivity = useCallback(() => {
    // Chỉ reset inactivity timer khi game đang chạy
    if (isGameStarted && config.gameMode !== 'timeUp') {
      resetInactivityTimer();
    } else {
      console.log('🚫 Pointer activity ignored - game not started or TimeUp mode', { isGameStarted, gameMode: config.gameMode });
    }
  }, [isGameStarted, config.gameMode, resetInactivityTimer]);
  
  // Handle card open changes với logic giới hạn 2 thẻ và disable matched cards
  const handleCardOpenChange = useCallback((cardIndex, newOpen) => {
    // Chỉ reset auto-pause timer khi game chưa bắt đầu và là normal mode
    // VÀ không phải khi đang cố gắng mở thẻ (newOpen = true)
    if (config.gameMode === 'normal' && !isGameStarted && !newOpen) {
      resetAutoPauseTimer();
    }
    
    setCardStates(prev => {
      // Kiểm tra nếu thẻ đã matched thì không cho phép thay đổi trạng thái
      const currentCard = prev[cardIndex];
      if (currentCard && currentCard.matched) {
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
        
        // Track click khi mở thẻ trong game
        trackClick();
        
        // Reset inactivity timer khi có click vào card
        resetInactivityTimer();
      }
      
      return {
        ...prev,
        [cardIndex]: {
          ...prev[cardIndex],
          open: newOpen
        }
      };
    });
  }, [isGameStarted, resetAutoPauseTimer, config.gameMode, trackClick, resetInactivityTimer]); // Removed cardStates from dependencies to prevent infinite loop
  
  // Cache image URLs to avoid repeated calls
  const imageUrls = useMemo(() => {
    return {
      labelBaseUrl: getImageUrl('label'),
      valueImgBaseUrl: getImageUrl('valueImg')
    };
  }, []); // Empty dependency array - only calculate once

  // Hàm tạo random pairs
  const generateRandomPairs = useCallback(() => {
    console.log('🎲 generateRandomPairs called with:', {
      totalCards,
      minValue,
      maxValue,
      cardIndices: cardIndices.length
    });
    
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
        const cardValue = values[arrayIndex] !== undefined ? values[arrayIndex] : minValue;
        newStates[index] = { 
          ...prevStates[index], 
          value: cardValue,
          matched: false, // Reset matched state khi tạo random pairs mới
          label: imageUrls.labelBaseUrl ? `${imageUrls.labelBaseUrl}_${index}` : null, // label dựa trên index: label_1, label_2, ...
          valueImg: imageUrls.valueImgBaseUrl ? `${imageUrls.valueImgBaseUrl}_${cardValue}` : null // valueImg dựa trên value: valueImg_4, valueImg_5, ...
        };
      });
      
      console.log('🎲 Generated new card values:', Object.values(newStates).map(card => card.value));
      
      return newStates;
    });
  }, [totalCards, cardIndices, minValue, maxValue, imageUrls]);
  
  // Game control functions
  
  // Start/Reset game
  const startGame = useCallback(() => {
    console.log('🔄 startGame called - triggering restart');
    
    // Clear timers trước khi start
    if (autoPauseTimerRef.current) {
      clearTimeout(autoPauseTimerRef.current);
      autoPauseTimerRef.current = null;
    }
    if (timeUpTimerRef.current) {
      clearInterval(timeUpTimerRef.current);
      timeUpTimerRef.current = null;
    }
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    
    // Stop Web Worker timer
    if (isWorkerReady && inactivityWorkerRef.current) {
      inactivityWorkerRef.current.postMessage({ type: 'STOP_TIMER' });
    }
    
    // Reset inactivity timer state
    remainingTimeRef.current = 30000;
    inactivityStartTimeRef.current = null;
    
    // Start game session
    startSession(config);
    
    // Force regenerate cardIndices by incrementing restart key
    setGameRestartKey(prev => prev + 1);
    
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        const cardValue = prev[index]?.value || minValue;
        newStates[index] = { 
          ...prev[index], 
          open: false,
          matched: false, // Reset matched state khi start game
          label: imageUrls.labelBaseUrl ? `${imageUrls.labelBaseUrl}_${index}` : null, // label dựa trên index: label_1, label_2, ...
          valueImg: imageUrls.valueImgBaseUrl ? `${imageUrls.valueImgBaseUrl}_${cardValue}` : null // valueImg dựa trên value: valueImg_4, valueImg_5, ...
        };
      });
      return newStates;
    });
    setIsGameStarted(true);
    setIsGameWon(false); // Reset game won state
    setIsGameLose(false); // Reset game lose state
    
    // Trigger animation cho START/RESTART
    // Mở lần lượt từng thẻ để tạo hiệu ứng animation tuần tự
    const openCardsSequentially = () => {
      cardIndices.forEach((index, arrayIndex) => {
        setTimeout(() => {
          setCardStates(prev => ({
            ...prev,
            [index]: { 
              ...prev[index], 
              open: true // Mở từng thẻ lần lượt
            }
          }));
        }, arrayIndex * 100); // Mỗi thẻ cách nhau 100ms
      });
      
      // Sau khi mở hết, đóng lần lượt từng thẻ
      const totalOpenTime = cardIndices.length * 100 + 500; // Thời gian để mở hết + delay 500ms
      
      cardIndices.forEach((index, arrayIndex) => {
        setTimeout(() => {
          setCardStates(prev => ({
            ...prev,
            [index]: { 
              ...prev[index], 
              open: false // Đóng từng thẻ lần lượt
            }
          }));
        }, totalOpenTime + arrayIndex * 100); // Bắt đầu đóng sau khi mở hết
      });
    };
    
    // Bắt đầu animation sau 100ms
    setTimeout(() => {
      openCardsSequentially();
    }, 100);
    
    // Bắt đầu timer tương ứng với game mode
    if (config.gameMode === 'timeUp') {
      startTimeUpTimer();
    } else {
      // Start inactivity timer cho normal mode
      resetInactivityTimer();
    }
    // Không gọi resetAutoPauseTimer khi game started = true
  }, [cardIndices, config, startSession, config.gameMode, startTimeUpTimer, resetInactivityTimer, setIsGameStarted, setIsGameWon, setIsGameLose, setCardStates, setGameRestartKey, isWorkerReady, imageUrls, minValue]); // Removed cardStates from dependencies to prevent infinite loop
  

  
  // Toggle game state (start/pause)
  const toggleGameState = useCallback(() => {
    if (isGameWon) {
      // Nếu game đã thắng, luôn restart
      startGame();
    } else if (isGameStarted) {
      pauseGame();
    } else {
      startGame();
    }
  }, [isGameWon, isGameStarted, pauseGame, startGame]);
  
  // Quick action functions
  
  // Set sequential values
  const setSequentialValues = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        newStates[index] = { 
          ...prev[index],
          value: index + 1, 
          open: true,
          matched: false // Reset matched state
        };
      });
      return newStates;
    });
  }, [cardIndices]);
  
  // Open all cards
  const openAllCards = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        newStates[index] = { ...prev[index], open: true };
      });
      return newStates;
    });
  }, [cardIndices]);
  
  // Close all cards
  const closeAllCards = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        newStates[index] = { ...prev[index], open: false };
      });
      return newStates;
    });
  }, [cardIndices]);
  
  // Reset all values
  const resetAllValues = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        newStates[index] = { 
          ...prev[index], 
          value: 0,
          matched: false // Reset matched state
        };
      });
      return newStates;
    });
  }, [cardIndices]);
  
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
  
  // Generate random pairs when cardIndices changes (after restart)
  useEffect(() => {
    if (gameRestartKey > 0) {
      console.log('🎲 useEffect: Generating random pairs after restart');
      generateRandomPairs();
    }
  }, [gameRestartKey, generateRandomPairs]);

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
          // Track match
          const currentMatches = Object.values(cardStates).filter(state => state.matched).length / 2;
          trackMatch(currentMatches);
          
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
  }, [twoCardOpen, isGameStarted, cardStates]); // Removed trackMatch from dependencies to prevent infinite loop
  
  // Cập nhật trạng thái game thắng
  useEffect(() => {
    setIsGameWon(gameWonStatus);
    
    // End session khi game thắng
    if (gameWonStatus && isSessionActive) {
      endSession(true); // true = completed
    }
  }, [gameWonStatus, isSessionActive]); // Removed endSession from dependencies to prevent infinite loop
  
  // Effect để cleanup timer khi component unmount
  useEffect(() => {
    return () => {
      if (autoPauseTimerRef.current) {
        clearTimeout(autoPauseTimerRef.current);
      }
      if (timeUpTimerRef.current) {
        clearInterval(timeUpTimerRef.current);
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      // Terminate Web Worker
      if (inactivityWorkerRef.current) {
        inactivityWorkerRef.current.terminate();
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
      
      // Stop Web Worker timer khi game dừng
      if (isWorkerReady && inactivityWorkerRef.current) {
        inactivityWorkerRef.current.postMessage({ type: 'STOP_TIMER' });
      }
      
      // Bắt đầu auto-pause timer khi game dừng (chỉ cho normal mode)
       // NHƯNG không start nếu game vừa bị auto-pause bởi inactivity timer
       if (config.gameMode === 'normal' && !isGameWon && !isPausedByInactivityRef.current) {
         // Delay nhỏ để tránh conflict với inactivity timer
         setTimeout(() => {
           resetAutoPauseTimer();
         }, 100);
       }
       
       // Reset flag sau khi xử lý
       if (isPausedByInactivityRef.current) {
         isPausedByInactivityRef.current = false;
       }
    }
  }, [isGameStarted, resetAutoPauseTimer, config.gameMode, startTimeUpTimer, isWorkerReady, isGameWon]);
  
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
    twoCardOpenNoMatch, // Thêm trạng thái 2 thẻ mở nhưng không match
    twoCardOpenAndMatch, // Thêm trạng thái 2 thẻ mở và match
    startRestartAnimation, // Thêm trạng thái animation cho START/RESTART
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
    stopTimeUpTimer,
    trackPointerActivity, // Thêm hàm để track pointer activity
    
    // Game session
    currentSession,
    isSessionActive,
    sessionHistory,
    clearSessionHistory,
    getSessionStats
  };
};

export default useMatch2GameWithConfig;