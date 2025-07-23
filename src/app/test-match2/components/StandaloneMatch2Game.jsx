'use client';
import React, { useState, useCallback } from 'react';
import { useMatch2GameWithConfig } from '../hooks/useMatch2GameWithConfig';
import { getGameConfig } from '../configs/gameConfig';
import Match2Background from './Match2Background';
import Match2Foreground from './Match2Foreground';
import DynamicCard from './DynamicCard';

/**
 * Standalone Match-2 Game Component
 * Component game độc lập có thể nhúng vào bất kỳ đâu trên website
 * Chỉ chứa game logic và UI, không có control panel hay debug info
 */
const StandaloneMatch2Game = React.forwardRef(({ 
  configId = 'default',
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
  const [pointerEventsMode, setPointerEventsMode] = useState('foreground'); // 'background', 'cards', 'foreground'
  
  // Timer state để truyền vào Rive
  const [timer, setTimer] = useState(gameConfig.autoPauseTimer / 1000);
  
  // Sử dụng game logic với config
  const {
    config,
    rows,
    cols,
    totalCards,
    cardIndices,
    cardStates,
    isGameStarted,
    isGameWon,
    isGameLose,
    twoCardOpen,
    timeUpTimer,
    handleCardValueChange,
    handleCardOpenChange,
    toggleGameState,
    resetAutoPauseTimer
  } = useMatch2GameWithConfig(gameConfig);
  
  // Handle pointer enter để reset auto-pause timer
  const handlePointerEnter = useCallback(() => {
    if (isGameStarted) {
      resetAutoPauseTimer();
    }
  }, [isGameStarted, resetAutoPauseTimer]);
  
  // Callback effects
  React.useEffect(() => {
    if (onGameWon && isGameWon) {
      onGameWon({ config, cardStates, totalCards });
    }
  }, [isGameWon, onGameWon, config, cardStates, totalCards]);
  
  React.useEffect(() => {
    if (onGameStarted && isGameStarted) {
      onGameStarted({ config, cardStates, totalCards });
    }
    
    // Tự động chuyển pointer events mode khi game bắt đầu/dừng
    if (isGameStarted) {
      setPointerEventsMode('cards'); // Cho phép click vào thẻ bài
    } else {
      setPointerEventsMode('foreground'); // Cho phép click nút Start
    }
  }, [isGameStarted, onGameStarted, config, cardStates, totalCards]);
  
  React.useEffect(() => {
    if (onGamePaused && !isGameStarted) {
      onGamePaused({ config, cardStates, totalCards });
    }
  }, [isGameStarted, onGamePaused, config, cardStates, totalCards]);
  
  // Timer effect để sync với Rive
  React.useEffect(() => {
    if (config.gameMode === 'timeUp') {
      // Cho TimeUp mode, sử dụng timeUpTimer
      setTimer(timeUpTimer);
    } else {
      // Cho normal mode, timer sẽ không được truyền vào Rive nữa
      setTimer(0); // Luôn set về 0 cho normal mode
    }
  }, [timeUpTimer, config.gameMode]);

  // Expose game state through ref
  React.useImperativeHandle(ref, () => ({
    getGameState: () => ({
      config,
      cardStates,
      isGameStarted,
      isGameWon,
      isGameLose,
      twoCardOpen,
      timeUpTimer,
      totalCards
    })
  }), [config, cardStates, isGameStarted, isGameWon, isGameLose, twoCardOpen, timeUpTimer, totalCards]);
  
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
      onPointerEnter={config.enablePointerEvents ? handlePointerEnter : undefined}
    >
      {/* Game Container với absolute positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg z-20 pointer-events-auto ">
        {/* Rive Background */}
        <Match2Background 
          isGameWon={isGameWon} 
          pointerEventsEnabled={pointerEventsMode === 'background' && config.enablePointerEvents}
        />
        
        {/* Content Layer */}
        <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center ${
          pointerEventsMode === 'background' ? 'pointer-events-none' : 'pointer-events-auto'
        }`}>
          <div className="w-full h-full flex items-center justify-center ">
            <div 
              className={`grid gap-1 ${
                pointerEventsMode === 'cards' && config.enablePointerEvents ? 'pointer-events-auto' : 'pointer-events-none'
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
                  pointerEventsEnabled={pointerEventsMode === 'cards' && config.enablePointerEvents}
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
          isGameLose={isGameLose}
          gameStarted={isGameStarted}
          pointerEventsEnabled={pointerEventsMode === 'foreground' && config.enablePointerEvents}
          toggleGameState={toggleGameState}
          timer={timer}
          gameMode={config.gameMode}
        />
        
      </div>
    </div>
  );
});

StandaloneMatch2Game.displayName = 'StandaloneMatch2Game';

export default StandaloneMatch2Game;

// Export với tên khác để dễ import
export { StandaloneMatch2Game as Match2Game };

// Export component với các preset configs
export const EasyMatch2Game = (props) => (
  <StandaloneMatch2Game {...props} configId="easy" />
);

export const MediumMatch2Game = (props) => (
  <StandaloneMatch2Game {...props} configId="medium" />
);

export const HardMatch2Game = (props) => (
  <StandaloneMatch2Game {...props} configId="hard" />
);
