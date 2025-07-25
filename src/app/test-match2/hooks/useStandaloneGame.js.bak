'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';

/**
 * Custom hook quản lý logic game Match-2 độc lập
 * Không phụ thuộc vào ControlPanel hay QuickActions
 */
export const useStandaloneGame = (initialRows = 2, initialCols = 2) => {
  // Game configuration
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  
  // Game mode configuration
  const [gameMode, setGameMode] = useState('Default');
  
  // Random value configuration
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(4);
  
  // Game state
  const [cardStates, setCardStates] = useState(() => {
    const initialStates = {};
    const initialTotalCards = initialRows * initialCols;
    for (let i = 0; i < initialTotalCards; i++) {
      initialStates[i] = {
        value: 1,
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
  const [isUpdatingCardStates, setIsUpdatingCardStates] = useState(false);
  
  // Pointer events control
  const [pointerEventsMode, setPointerEventsMode] = useState('cards');
  
  // Computed values
  const totalCards = rows * cols;
  const cardIndices = useMemo(() => {
    return Array.from({ length: totalCards }, (_, i) => i);
  }, [totalCards]);
  
  // Tính toán trạng thái "two-card open"
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
    const requiredMatches = totalMatches * 2;
    return matchedCardsCount >= requiredMatches && requiredMatches > 0;
  }, [matchedCardsCount, totalMatches]);
  
  // Đồng bộ cardStates với cardIndices khi totalCards thay đổi
  useEffect(() => {
    setIsUpdatingCardStates(true);
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach(index => {
        const existingCard = prev[index];
        newStates[index] = {
          value: existingCard?.value || 1,
          open: false,
          matched: existingCard?.matched || false
        };
      });
      return newStates;
    });
    
    setTimeout(() => {
      setIsUpdatingCardStates(false);
    }, 100);
  }, [cardIndices]);
  
  // Handle card value changes
  const handleCardValueChange = useCallback((cardIndex, newValue) => {
    if (isUpdatingCardStates) {
      return;
    }
    
    setCardStates(prev => {
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

  // Handle card open changes
  const handleCardOpenChange = useCallback((cardIndex, newOpen) => {
    if (isUpdatingCardStates) {
      return;
    }
    
    if (typeof cardIndex !== 'number' || cardIndex < 0) {
      return;
    }
    
    setCardStates(prev => {
      let currentCard = prev[cardIndex];
      if (!currentCard) {
        currentCard = { value: 1, open: false, matched: false };
        prev = { ...prev, [cardIndex]: currentCard };
      }
      
      if (currentCard.matched) {
        return prev;
      }
      
      if (isGameStarted && newOpen) {
        const currentOpenCards = Object.values(prev).filter(state => state.open && !state.matched).length;
        if (currentOpenCards >= 2) {
          return prev;
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
  }, [isGameStarted, isUpdatingCardStates]);
  
  // Hàm tạo random pairs
  const generateRandomPairs = useCallback(() => {
    if (isUpdatingCardStates || isGeneratingPairs) {
      return;
    }
    
    const safeMinValue = Math.max(minValue, 1);
    const safeMaxValue = Math.max(maxValue, safeMinValue);
    
    setCardStates(prevStates => {
      const newStates = {};
      const pairsCount = Math.floor(totalCards / 2);
      
      const values = [];
      const availableRange = safeMaxValue - safeMinValue + 1;
      
      if (availableRange <= 0) {
        return prevStates;
      }
      
      if (availableRange < pairsCount) {
        for (let i = 0; i < pairsCount; i++) {
          const value = safeMinValue + (i % availableRange);
          values.push(value, value);
        }
      } else {
        const availableValues = Array.from({length: availableRange}, (_, i) => safeMinValue + i);
        
        for (let i = availableValues.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableValues[i], availableValues[j]] = [availableValues[j], availableValues[i]];
        }
        
        for (let i = 0; i < pairsCount; i++) {
          const value = availableValues[i % availableValues.length];
          values.push(value, value);
        }
      }
      
      if (totalCards % 2 === 1) {
        const oddValue = safeMinValue + Math.floor(Math.random() * availableRange);
        values.push(oddValue);
      }
      
      for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
      }
      
      while (values.length < cardIndices.length) {
        const additionalValue = safeMinValue + Math.floor(Math.random() * availableRange);
        values.push(additionalValue);
      }
      
      cardIndices.forEach((index, arrayIndex) => {
        if (typeof index !== 'number' || index < 0) {
          return;
        }
        
        const finalValue = values[arrayIndex] !== undefined ? values[arrayIndex] : safeMinValue;
        const validatedValue = Math.max(finalValue, 1);
        
        newStates[index] = { 
          ...prevStates[index], 
          value: validatedValue,
          open: false,
          matched: false
        };
      });
      
      return newStates;
    });
  }, [totalCards, cardIndices, minValue, maxValue, isUpdatingCardStates, isGeneratingPairs]);
  
  // Start/Reset game
  const startGame = useCallback(() => {
    if (isGeneratingPairs || isUpdatingCardStates) {
      return;
    }
    
    setIsGeneratingPairs(true);
    
    setTimeout(() => {
      generateRandomPairs();
      setIsGameStarted(true);
      setIsGameWon(false);
      setIsGeneratingPairs(false);
    }, 50);
  }, [generateRandomPairs, isGeneratingPairs, isUpdatingCardStates]);
  
  // Pause game
  const pauseGame = useCallback(() => {
    setCardStates(prev => {
      const newStates = {};
      cardIndices.forEach((index) => {
        if (prev[index]) {
          newStates[index] = { ...prev[index], open: true };
        } else {
          const safeValue = Math.max(minValue, 1);
          newStates[index] = { value: safeValue, open: true, matched: false };
        }
      });
      return newStates;
    });
    setIsGameStarted(false);
  }, [cardIndices, minValue]);
  
  // Toggle game state
  const toggleGameState = useCallback(() => {
    if (isGameWon) {
      startGame();
    } else if (isGameStarted) {
      pauseGame();
    } else {
      startGame();
    }
  }, [isGameStarted, isGameWon, pauseGame, startGame]);
  
  // Handle pointer enter
  const handlePointerEnter = useCallback(() => {
    // Có thể thêm logic khác nếu cần
  }, []);
  
  // Logic game: Kiểm tra khi có 2 card mở để xử lý match/không match
  useEffect(() => {
    if (twoCardOpen && isGameStarted && !isUpdatingCardStates) {
      const openCardEntries = Object.entries(cardStates).filter(([_, state]) => state.open && !state.matched);
      
      if (openCardEntries.length === 2) {
        const [card1Index, card1State] = openCardEntries[0];
        const [card2Index, card2State] = openCardEntries[1];
        
        if (card1State.value === card2State.value) {
          const timer = setTimeout(() => {
            setCardStates(prev => ({
              ...prev,
              [card1Index]: { ...prev[card1Index], matched: true },
              [card2Index]: { ...prev[card2Index], matched: true }
            }));
          }, 500);
          
          return () => clearTimeout(timer);
        } else {
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
  }, [twoCardOpen, isGameStarted, cardStates, isUpdatingCardStates]);
  
  // Cập nhật trạng thái game thắng
  useEffect(() => {
    setIsGameWon(gameWonStatus);
  }, [gameWonStatus]);
  
  // Reset isGeneratingPairs sau khi generateRandomPairs hoàn thành
  useEffect(() => {
    if (isGeneratingPairs) {
      const timer = setTimeout(() => {
        setIsGeneratingPairs(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isGeneratingPairs]);
  
  // Tự động chạy random pairs 1 lần duy nhất khi khởi tạo
  useEffect(() => {
    if (cardIndices.length > 0 && !hasInitialRandomized && !isUpdatingCardStates) {
      const timer = setTimeout(() => {
        generateRandomPairs();
        setHasInitialRandomized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cardIndices.length, hasInitialRandomized, generateRandomPairs, isUpdatingCardStates]);

  // Chạy random pairs khi rows hoặc cols thay đổi
  useEffect(() => {
    if (hasInitialRandomized && cardIndices.length > 0 && !isUpdatingCardStates) {
      const timer = setTimeout(() => {
        generateRandomPairs();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [rows, cols, hasInitialRandomized, generateRandomPairs, isUpdatingCardStates]);
  
  return {
    // Game configuration
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
    isUpdatingCardStates,
    
    // Pointer events
    pointerEventsMode,
    setPointerEventsMode,
    
    // Card handlers
    handleCardValueChange,
    handleCardOpenChange,
    
    // Game control
    generateRandomPairs,
    toggleGameState,
    
    // Pointer events
    handlePointerEnter,
  };
}; 