'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';

/**
 * Custom hook quản lý logic game Match-2
 * Tách riêng toàn bộ logic game ra khỏi UI component
 */
export const useMatch2Game = (initialRows = 2, initialCols = 2) => {
  // Game configuration
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  
  // Game state
  const [cardStates, setCardStates] = useState({});
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [hasInitialRandomized, setHasInitialRandomized] = useState(false);
  
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

  // Handle card open changes với logic giới hạn 2 thẻ và disable matched cards
  const handleCardOpenChange = useCallback((cardIndex, newOpen) => {
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
  }, [cardStates, isGameStarted]);
  
  // Hàm tạo random pairs
  const generateRandomPairs = useCallback(() => {
    setCardStates(prevStates => {
      const newStates = {};
      const pairsCount = Math.floor(totalCards / 2);
      
      // Tạo mảng các cặp giá trị
      const values = [];
      for (let i = 1; i <= pairsCount; i++) {
        values.push(i, i); // Thêm mỗi giá trị 2 lần để tạo cặp
      }
      
      // Nếu số card lẻ, thêm 1 giá trị đơn
      if (totalCards % 2 === 1) {
        values.push(pairsCount + 1);
      }
      
      // Shuffle mảng để random vị trí
      for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
      }
      
      // Gán giá trị cho từng card
      cardIndices.forEach((index) => {
        newStates[index] = { 
          ...prevStates[index], 
          value: values[index] || 0,
          matched: false // Reset matched state khi tạo random pairs mới
        };
      });
      
      return newStates;
    });
  }, [totalCards, cardIndices]);
  
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
  }, [generateRandomPairs, cardIndices, cardStates]);
  
  // Pause game
  const pauseGame = useCallback(() => {
    const newStates = {};
    cardIndices.forEach((index) => {
      newStates[index] = { ...cardStates[index], open: true };
    });
    setCardStates(newStates);
    setIsGameStarted(false);
  }, [cardIndices, cardStates]);
  
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
      twoCardOpen,
      isGameStarted,
      gameStartedRive: isGameStarted, // Thêm thông tin gameStarted cho Rive
      cardStates,
      matchedCards: Object.entries(cardStates).filter(([_, state]) => state.matched).length,
      totalMatches: Math.floor(totalCards / 2)
    };
    navigator.clipboard.writeText(JSON.stringify(debugData, null, 2));
  }, [twoCardOpen, isGameStarted, cardStates, totalCards]);
  
  // Effects
  
  // Tự động chạy random pairs 1 lần duy nhất khi khởi tạo
  useEffect(() => {
    if (cardIndices.length > 0 && !hasInitialRandomized) {
      // Delay nhỏ để đảm bảo Rive đã load hoàn toàn
      const timer = setTimeout(() => {
        generateRandomPairs();
        setHasInitialRandomized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [cardIndices.length, hasInitialRandomized, generateRandomPairs]);

  // Chạy random pairs khi rows hoặc cols thay đổi (sau khi đã khởi tạo lần đầu)
  useEffect(() => {
    if (hasInitialRandomized && cardIndices.length > 0) {
      generateRandomPairs();
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
  
  // Return all game state and functions
  return {
    // Game configuration
    rows,
    cols,
    setRows,
    setCols,
    totalCards,
    cardIndices,
    
    // Game state
    cardStates,
    isGameStarted,
    twoCardOpen,
    
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
    copyDebugData
  };
};