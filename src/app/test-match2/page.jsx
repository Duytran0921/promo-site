'use client';
import React, { useCallback } from 'react';
import { useMatch2Game } from './useMatch2Game';
import GameContainer from './components/GameContainer';
import ControlPanel from './components/ControlPanel';
import QuickActions from './components/QuickActions';





const TestMatch2Page = () => {
  // Pointer Events Control State
  const [pointerEventsMode, setPointerEventsMode] = React.useState('cards'); // 'background', 'cards', 'foreground'
  

  
  // Sử dụng custom hook để quản lý toàn bộ logic game
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
    isUpdatingCardStates,
    
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
    

  } = useMatch2Game();

  
  // Handle pointer enter
  const handlePointerEnter = useCallback(() => {
    // Có thể thêm logic khác nếu cần
  }, []);

  return (
    <div className="min-h-screen">
      {/* Main container div */}
      <div className="flex flex-col gap-4 w-full p-4">
        {/* Match-2 Game Container - Optimized Responsive Design */}
        <GameContainer
          isGameWon={isGameWon}
          isGameStarted={isGameStarted}
          isUpdatingCardStates={isUpdatingCardStates}
          pointerEventsMode={pointerEventsMode}
          handlePointerEnter={handlePointerEnter}
          rows={rows}
          cols={cols}
          cardIndices={cardIndices}
          cardStates={cardStates}
          handleCardValueChange={handleCardValueChange}
          handleCardOpenChange={handleCardOpenChange}
          toggleGameState={toggleGameState}
          generateRandomPairs={generateRandomPairs}
          gameMode={gameMode}
        />
        
        Control Panel - Dynamic
        <ControlPanel
          totalCards={totalCards}
          isGameStarted={isGameStarted}
          isUpdatingCardStates={isUpdatingCardStates}
          toggleGameState={toggleGameState}
          rows={rows}
          cols={cols}
          setRows={setRows}
          setCols={setCols}
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          cardIndices={cardIndices}
          cardStates={cardStates}
          handleCardValueChange={handleCardValueChange}
          handleCardOpenChange={handleCardOpenChange}
          gameMode={gameMode}
          setGameMode={setGameMode}
          // Config persistence props
          saveConfig={saveConfig}
          configLoaded={configLoaded}
          lastSavedConfig={lastSavedConfig}
        />
         
        {/* Quick Actions */}
        <QuickActions
          pointerEventsMode={pointerEventsMode}
          setPointerEventsMode={setPointerEventsMode}
          setSequentialValues={setSequentialValues}
          generateRandomPairs={generateRandomPairs}
          openAllCards={openAllCards}
          closeAllCards={closeAllCards}
          resetAllValues={resetAllValues}
          copyDebugData={copyDebugData}
          twoCardOpen={twoCardOpen}
          isGameStarted={isGameStarted}
          isGameWon={isGameWon}
          isUpdatingCardStates={isUpdatingCardStates}
          cardStates={cardStates}
          totalCards={totalCards}
          gameMode={gameMode}
          setGameMode={setGameMode}
          // Config persistence props
          configLoaded={configLoaded}
          lastSavedConfig={lastSavedConfig}
          // Game session props
          currentSession={currentSession}
          isSessionActive={isSessionActive}
          sessionHistory={sessionHistory}
          clearSessionHistory={clearSessionHistory}
          getSessionStats={getSessionStats}
        />
      </div>
    </div>
  );
};

export default TestMatch2Page;