'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useMatch2Game } from '../useMatch2Game';
import { getGameConfig } from '../configs/gameConfig';
import Match2Background from './Match2Background';
import Match2Foreground from './Match2Foreground';
import DynamicCard from './DynamicCard';

/**
 * Simple Match-2 Game Component
 * Sử dụng useMatch2Game với config từ gameConfig để có logic giống với trang chính
 * Chỉ khác biệt về CSS và những gì quy định trong file config
 */
const SimpleMatch2Game = React.forwardRef(({
  configId = 'easy',
  customConfig = null,
  className = '',
  style = {},
  onGameWon = null,
  onGameStarted = null,
  onGamePaused = null,
  containerStyle = {}
}, ref) => {
  // Load config
  const gameConfig = customConfig || getGameConfig(configId);
  
  // Pointer Events Control State - foreground enabled by default để có thể click Start button
  const [pointerEventsMode, setPointerEventsMode] = useState('foreground');
  
  // Timer state để truyền vào Rive
  const [timer, setTimer] = useState(gameConfig.autoPauseTimer / 1000);
  
  // Sử dụng useMatch2Game với config values
  const {
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
    
    // Card handlers
    handleCardValueChange,
    handleCardOpenChange,
    
    // Game control
    generateRandomPairs,
    toggleGameState,
    
    // Quick actions
    setSequentialValues,
    openAllCards,
    closeAllCards,
    resetAllValues,
    
    // Debug
    copyDebugData
  } = useMatch2Game();
  
  // Initialize game with config values
  useEffect(() => {
    setRows(gameConfig.rows);
    setCols(gameConfig.cols);
    setMinValue(gameConfig.minValue);
    setMaxValue(gameConfig.maxValue);
    setGameMode(gameConfig.gameMode || 'Default');
  }, [gameConfig, setRows, setCols, setMinValue, setMaxValue, setGameMode]);
  
  // Auto start if configured
  useEffect(() => {
    if (gameConfig.autoStart && !isGameStarted) {
      const timer = setTimeout(() => {
        generateRandomPairs();
        toggleGameState();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [gameConfig.autoStart, isGameStarted, generateRandomPairs, toggleGameState]);
  
  // Handle pointer enter
  const handlePointerEnter = useCallback(() => {
    // Có thể thêm logic khác nếu cần
  }, []);
  
  // Callback effects
  useEffect(() => {
    if (onGameWon && isGameWon) {
      onGameWon({ config: gameConfig, cardStates, totalCards });
    }
  }, [isGameWon, onGameWon, gameConfig, cardStates, totalCards]);
  
  useEffect(() => {
    if (onGameStarted && isGameStarted) {
      onGameStarted({ config: gameConfig, cardStates, totalCards });
    }
    
    // Tự động chuyển pointer events mode khi game bắt đầu/dừng
    if (isGameStarted) {
      setPointerEventsMode('cards'); // Cho phép click vào thẻ bài
    } else {
      setPointerEventsMode('foreground'); // Cho phép click nút Start
    }
  }, [isGameStarted, onGameStarted, gameConfig, cardStates, totalCards]);
  
  useEffect(() => {
    if (onGamePaused && !isGameStarted) {
      onGamePaused({ config: gameConfig, cardStates, totalCards });
    }
  }, [isGameStarted, onGamePaused, gameConfig, cardStates, totalCards]);
  
  // Timer effect để sync với Rive
  useEffect(() => {
    if (gameConfig.gameMode === 'timeUp') {
      // Cho TimeUp mode, có thể implement timer logic ở đây
      setTimer(gameConfig.timeUpDuration ? gameConfig.timeUpDuration / 1000 : 0);
    } else {
      // Cho normal mode, timer sẽ không được truyền vào Rive nữa
      setTimer(0); // Luôn set về 0 cho normal mode
    }
  }, [gameConfig.gameMode, gameConfig.timeUpDuration]);
  
  // Expose game state through ref
  React.useImperativeHandle(ref, () => ({
    getGameState: () => ({
      config: gameConfig,
      cardStates,
      isGameStarted,
      isGameWon,
      twoCardOpen,
      totalCards
    })
  }), [gameConfig, cardStates, isGameStarted, isGameWon, twoCardOpen, totalCards]);
  
  return (
    <div 
      className={`relative overflow-hidden w-full flex items-center justify-center ${className}`}
      style={{
        height: `${220 * rows + 4 * (rows - 1) + 100}px`,
        minWidth: '500px',
        minHeight: '200px',
        ...containerStyle,
        ...style
      }}
      onPointerEnter={gameConfig.enablePointerEvents ? handlePointerEnter : undefined}
    >
      {/* Game Container với absolute positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg z-20 pointer-events-auto ">
        {/* Rive Background */}
        <Match2Background 
          isGameWon={isGameWon} 
          pointerEventsEnabled={pointerEventsMode === 'background' && gameConfig.enablePointerEvents}
        />
        
        {/* Content Layer */}
        <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center ${
          pointerEventsMode === 'background' ? 'pointer-events-none' : 'pointer-events-auto'
        }`}>
          <div className="w-full h-full flex items-center justify-center ">
            <div 
              className={`grid gap-1 ${
                pointerEventsMode === 'cards' && gameConfig.enablePointerEvents ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              style={{ 
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: `${160 * cols + 2 * (cols - 1)}px`,
                height: `${220 * rows + 2 * (rows - 1)}px`,
                maxWidth: '100vw',
                maxHeight: '100vh'
              }}
            >
              {cardIndices.map((cardIndex) => (
                <DynamicCard
                  key={cardIndex}
                  cardIndex={cardIndex}
                  onValueChange={handleCardValueChange}
                  onOpenChange={handleCardOpenChange}
                  cardState={cardStates[cardIndex] || {}}
                  isGameStarted={isGameStarted}
                  cardStates={cardStates}
                  pointerEventsEnabled={pointerEventsMode === 'cards' && gameConfig.enablePointerEvents}
                  style={{
                    // width: '160px',
                    // height: '220px',
                    // padding: '4px',
                    // margin: '4px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Rive Foreground */}
        <Match2Foreground 
          isGameWon={isGameWon} 
          isGameLose={false} // useMatch2Game không có isGameLose
          gameStarted={isGameStarted}
          pointerEventsEnabled={pointerEventsMode === 'foreground' && gameConfig.enablePointerEvents}
          toggleGameState={toggleGameState}
          timer={timer}
          gameMode={gameConfig.gameMode}
        />
        
      </div>
    </div>
  );
});

SimpleMatch2Game.displayName = 'SimpleMatch2Game';

export default SimpleMatch2Game;

// Export với tên khác để dễ import
export { SimpleMatch2Game as Match2Game };

// Export component với các preset configs
export const EasyMatch2Game = (props) => (
  <SimpleMatch2Game {...props} configId="easy" />
);

export const MediumMatch2Game = (props) => (
  <SimpleMatch2Game {...props} configId="medium" />
);

export const HardMatch2Game = (props) => (
  <SimpleMatch2Game {...props} configId="hard" />
);