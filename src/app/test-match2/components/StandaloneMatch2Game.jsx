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
  
  // State để track việc cập nhật card states
  const [isUpdatingCardStates, setIsUpdatingCardStates] = useState(false);
  
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
    twoCardOpenNoMatch, // Thêm trạng thái mới
    twoCardOpenAndMatch, // Thêm trạng thái mới
    startRestartAnimation, // Thêm trạng thái animation cho START/RESTART

    handleCardValueChange,
    handleCardOpenChange,
    generateRandomPairs,
    startGame,
    pauseGame,
    toggleGameState,
    setSequentialValues,
    openAllCards,
    closeAllCards,
    resetAllValues,
    copyDebugData,
    resetUnifiedInactivityTimer,
    trackPointerActivity,
    // Game session
    currentSession,
    isSessionActive,
    sessionHistory,
    clearSessionHistory,
    getSessionStats
  } = useMatch2GameWithConfig(gameConfig);
  
  // State để lưu trữ điểm số cuối cùng khi game thắng
  const [lastWonScore, setLastWonScore] = useState(0);
  
  // Tính toán score và topScore
  const currentScore = React.useMemo(() => {
    // Nếu game đã thắng và có điểm số được lưu, hiển thị điểm đó
    if (isGameWon && lastWonScore > 0) {
      return lastWonScore;
    }
    // Chỉ hiển thị điểm số khi game đã thực sự bắt đầu
    if (isGameStarted && currentSession?.scoring?.totalScore) {
      return currentSession.scoring.totalScore;
    }
    // Mặc định hiển thị 0
    return 0;
  }, [isGameWon, lastWonScore, isGameStarted, currentSession?.scoring?.totalScore]);
  
  const topScore = React.useMemo(() => {
    if (!sessionHistory || sessionHistory.length === 0) return 0;
    return Math.max(...sessionHistory.map(session => {
      // Ưu tiên finalScore chỉ khi session đã hoàn thành và có finalScore > 0
      if (session.completed && session.scoring?.finalScore > 0) {
        return session.scoring.finalScore;
      }
      // Nếu không, sử dụng totalScore
      return session.scoring?.totalScore || 0;
    }));
  }, [sessionHistory]);
  
  // Debug function để kiểm tra sessionHistory (chỉ khi cần debug)
  // React.useEffect(() => {
  //   if (sessionHistory && sessionHistory.length > 0) {
  //     console.log('📊 Session History Debug:', sessionHistory.map(session => ({
  //       sessionId: session.sessionId,
  //       completed: session.completed,
  //       totalScore: session.scoring?.totalScore,
  //       finalScore: session.scoring?.finalScore,
  //       matchedPairs: session.gameplay?.matchedPairs,
  //       totalPairs: Math.floor(session.config?.totalCards / 2)
  //     })));
  //     
  //     const scores = sessionHistory.map(session => {
  //       if (session.completed && session.scoring?.finalScore > 0) {
  //         return session.scoring.finalScore;
  //       }
  //       return session.scoring?.totalScore || 0;
  //     });
  //     console.log('📊 All scores for top calculation:', scores);
  //     console.log('📊 Calculated top score:', Math.max(...scores));
  //   }
  // }, [sessionHistory]);
  
  // Ref để track điểm số trước khi session bị xóa
  const previousScoreRef = React.useRef(0);
  
  // Effect để track điểm số trong khi chơi
  React.useEffect(() => {
    if (currentSession?.scoring?.totalScore) {
      previousScoreRef.current = currentSession.scoring.totalScore;
    }
  }, [currentSession?.scoring?.totalScore]);
  
  // Effect để lưu điểm số khi game thắng
  React.useEffect(() => {
    if (isGameWon) {
      // Khi game thắng, lưu điểm số từ ref (vì currentSession có thể đã bị xóa)
      const scoreToSave = currentSession?.scoring?.totalScore || previousScoreRef.current;
      if (scoreToSave > 0) {
        setLastWonScore(scoreToSave);
      }
    } else if (!isGameWon && !isGameStarted && !isSessionActive) {
      // Reset điểm số đã lưu khi không có session active (game hoàn toàn reset)
      setLastWonScore(0);
      previousScoreRef.current = 0;
    }
  }, [isGameWon, isGameStarted, isSessionActive, currentSession?.scoring?.totalScore]);
  
  // Effect để reset điểm số khi component mount lần đầu (chỉ chạy một lần)
  React.useEffect(() => {
    // Chỉ reset nếu không có session history (lần đầu tiên vào game)
    if (!sessionHistory || sessionHistory.length === 0) {
      setLastWonScore(0);
      previousScoreRef.current = 0;
    }
  }, []); // Empty dependency array - chỉ chạy khi mount
  
  // Handle pointer enter để reset auto-pause timer và inactivity timer
  const handlePointerEnter = useCallback(() => {
    if (isGameStarted) {
      resetUnifiedInactivityTimer(); // Reset inactivity timer
    }
  }, [isGameStarted, resetUnifiedInactivityTimer]);
  
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
    if (isGameWon) {
      // Khi game thắng, cho phép click nút Restart
      setPointerEventsMode('foreground');
    } else if (isGameStarted) {
      setPointerEventsMode('cards'); // Cho phép click vào thẻ bài
    } else {
      setPointerEventsMode('foreground'); // Cho phép click nút Start
    }
  }, [isGameStarted, isGameWon, onGameStarted, config, cardStates, totalCards]);
  
  // Track previous game started state để tránh trigger liên tục
  const prevGameStartedRef = React.useRef(isGameStarted);
  
  React.useEffect(() => {
    // Chỉ trigger onGamePaused khi game chuyển từ started sang paused
    if (onGamePaused && prevGameStartedRef.current && !isGameStarted) {
      onGamePaused({ config, cardStates, totalCards });
    }
    prevGameStartedRef.current = isGameStarted;
  }, [isGameStarted, onGamePaused, config, cardStates, totalCards]);
  
  // Timer effect để sync với Rive
  React.useEffect(() => {
    // Cho normal mode, timer sẽ không được truyền vào Rive nữa
    setTimer(0); // Luôn set về 0 cho normal mode
  }, [config.gameMode]);

  // Expose game state through ref
  React.useImperativeHandle(ref, () => ({
    getGameState: () => ({
      config,
      cardStates,
      isGameStarted,
      isGameWon,
      isGameLose,
      twoCardOpen,
      twoCardOpenNoMatch, // Thêm trạng thái mới
      twoCardOpenAndMatch, // Thêm trạng thái mới
      startRestartAnimation, // Thêm trạng thái animation cho START/RESTART
      totalCards
    }),
    getSessionData: () => ({
      currentSession,
      isSessionActive,
      sessionHistory,
      getSessionStats: getSessionStats()
    })
  }), [config, cardStates, isGameStarted, isGameWon, isGameLose, twoCardOpen, twoCardOpenNoMatch, twoCardOpenAndMatch, startRestartAnimation, totalCards, currentSession, isSessionActive, sessionHistory, getSessionStats]);
  
  return (
    <div 
      className={`relative overflow-hidden w-full flex items-center justify-center ${className}`}
      style={{
        height: `${config.cardHeight * rows + config.cardGap * (rows - 1) + 120}px`,
        minWidth: '500px',
        minHeight: '200px',
        ...containerStyle,
        ...style
      }}
      onPointerEnter={config.enablePointerEvents ? handlePointerEnter : undefined}
      onPointerMove={config.enablePointerEvents ? resetUnifiedInactivityTimer : undefined}
      onPointerDown={config.enablePointerEvents ? resetUnifiedInactivityTimer : undefined}
      onKeyDown={config.enablePointerEvents ? resetUnifiedInactivityTimer : undefined}
    >
      {/* Game Container với absolute positioning */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-20 pointer-events-auto ">
        {/* Rive Background */}
        <Match2Background 
          isGameWon={isGameWon} 
          pointerEventsEnabled={pointerEventsMode === 'background' && config.enablePointerEvents}
          onPointerActivity={trackPointerActivity}
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
              //card grid
              style={{ 
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: `${config.cardWidth * cols + config.cardGap * (cols - 1)}px`,
                height: `${config.cardHeight * rows + config.cardGap * (rows - 1)}px`,
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
                  twoCardOpenNoMatch={twoCardOpenNoMatch} // Thêm prop mới
                  twoCardOpenAndMatch={twoCardOpenAndMatch} // Thêm prop mới
                  startRestartAnimation={startRestartAnimation} // Thêm prop mới cho START/RESTART animation
                  label={cardStates[cardIndex]?.label || null} // Truyền label từ cardState
                  labelOn={config.labelOn || false} // Truyền labelOn từ config
                  valueImg={cardStates[cardIndex]?.valueImg || null} // Truyền valueImg từ cardState
                  valueImgOn={config.valueImgOn || false} // Truyền valueImgOn từ config
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
          isUpdatingCardStates={isUpdatingCardStates}
          pointerEventsEnabled={pointerEventsMode === 'foreground' && config.enablePointerEvents}
          toggleGameState={toggleGameState}
          timer={timer}
          gameMode={config.gameMode}
          twoCardOpenNoMatch={twoCardOpenNoMatch} // Thêm prop mới
          twoCardOpenAndMatch={twoCardOpenAndMatch} // Thêm prop mới
          score={currentScore} // Điểm số hiện tại
          topScore={topScore} // Điểm cao nhất
          onPointerActivity={trackPointerActivity}
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
