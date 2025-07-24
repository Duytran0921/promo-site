'use client';
import React, { useEffect } from 'react';

const QuickActions = ({
  pointerEventsMode,
  setPointerEventsMode,
  setSequentialValues,
  generateRandomPairs,
  openAllCards,
  closeAllCards,
  resetAllValues,
  copyDebugData,
  twoCardOpen,
  isGameStarted,
  isGameWon,
  isUpdatingCardStates = false,
  cardStates,
  totalCards,
  gameMode,
  setGameMode,
  // Config persistence props
  configLoaded,
  lastSavedConfig,
  // Game session props
  currentSession,
  isSessionActive,
  sessionHistory,
  clearSessionHistory,
  getSessionStats
}) => {

  // Thiết lập pointer events mode mặc định là 'foreground' khi component được mount
  useEffect(() => {
    if (setPointerEventsMode) {
      setPointerEventsMode('foreground');
    }
  }, [setPointerEventsMode]);

  // Tự động chuyển pointer events mode dựa trên trạng thái game
  useEffect(() => {
    if (setPointerEventsMode) {
      if (isGameWon) {
        // Khi game thắng, chuyển sang foreground để người chơi có thể tương tác với Rive foreground
        setPointerEventsMode('foreground');
      } else if (isGameStarted) {
        // Khi game đang chạy, chuyển sang cards để người chơi có thể click vào thẻ
        setPointerEventsMode('cards');
      } else {
        // Khi game chưa bắt đầu hoặc đã pause, chuyển sang foreground
        setPointerEventsMode('foreground');
      }
    }
  }, [isGameStarted, isGameWon, setPointerEventsMode]);



  return (
    <div className="w-full border-2 border-green-500 rounded-lg p-2 bg-green-50">
      {/* Sticky Header với Timer */}
      <div className="sticky top-0 bg-green-50 border-b border-green-300 pb-2 mb-2 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">Quick Actions</h3>
          

        </div>
      </div>
      
      {/* Pointer Events Toggle */}
      <div className="mb-3 p-2 bg-yellow-50 border border-yellow-300 rounded">
        <h4 className="text-xs font-bold mb-2 text-yellow-800">Pointer Events Control</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPointerEventsMode('background')}
            disabled={isUpdatingCardStates}
            className={`px-3 py-1 text-xs rounded font-medium ${
              isUpdatingCardStates
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : pointerEventsMode === 'background'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-100'
            }`}
          >
            Background Only
          </button>
          <button
            onClick={() => setPointerEventsMode('cards')}
            disabled={isUpdatingCardStates}
            className={`px-3 py-1 text-xs rounded font-medium ${
              isUpdatingCardStates
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : pointerEventsMode === 'cards'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-100'
            }`}
          >
            Cards Only
          </button>
          <button
            onClick={() => setPointerEventsMode('foreground')}
            disabled={isUpdatingCardStates}
            className={`px-3 py-1 text-xs rounded font-medium ${
              isUpdatingCardStates
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : pointerEventsMode === 'foreground'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-yellow-700 border border-yellow-300 hover:bg-yellow-100'
            }`}
          >
            Foreground Only
          </button>
        </div>
        <div className="text-xs text-yellow-700 mt-1">
          Current: <span className="font-bold">{pointerEventsMode}</span> - Only this layer can receive mouse/touch events
          {isUpdatingCardStates && <span className="text-red-600 font-bold ml-2">(Updating...)</span>}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            if (isUpdatingCardStates) {
              console.warn('Button click ignored - card states are being updated');
              return;
            }
            setSequentialValues();
          }}
          disabled={isUpdatingCardStates}
          className={`px-3 py-1 text-xs rounded font-medium ${
            isUpdatingCardStates
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Set Sequential
        </button>
        <button
          onClick={() => {
            if (isUpdatingCardStates) {
              console.warn('Button click ignored - card states are being updated');
              return;
            }
            generateRandomPairs();
          }}
          disabled={isUpdatingCardStates}
          className={`px-3 py-1 text-xs rounded font-medium ${
            isUpdatingCardStates
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
        >
          Random Pairs
        </button>
        <button
          onClick={() => {
            if (isUpdatingCardStates) {
              console.warn('Button click ignored - card states are being updated');
              return;
            }
            openAllCards();
          }}
          disabled={isUpdatingCardStates}
          className={`px-3 py-1 text-xs rounded font-medium ${
            isUpdatingCardStates
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Open All
        </button>
        <button
          onClick={() => {
            if (isUpdatingCardStates) {
              console.warn('Button click ignored - card states are being updated');
              return;
            }
            closeAllCards();
          }}
          disabled={isUpdatingCardStates}
          className={`px-3 py-1 text-xs rounded font-medium ${
            isUpdatingCardStates
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          Close All
        </button>
        <button
          onClick={() => {
            if (isUpdatingCardStates) {
              console.warn('Button click ignored - card states are being updated');
              return;
            }
            resetAllValues();
          }}
          disabled={isUpdatingCardStates}
          className={`px-3 py-1 text-xs rounded font-medium ${
            isUpdatingCardStates
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Reset Values
        </button>
        <button
          onClick={() => {
            if (isUpdatingCardStates) {
              console.warn('Button click ignored - card states are being updated');
              return;
            }
            copyDebugData();
          }}
          disabled={isUpdatingCardStates}
          className={`px-3 py-1 text-xs rounded font-medium ${
            isUpdatingCardStates
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          Copy Debug
        </button>
        <button
          onClick={() => {
            if (isUpdatingCardStates) {
              console.warn('Button click ignored - card states are being updated');
              return;
            }
            clearSessionHistory();
          }}
          disabled={isUpdatingCardStates}
          className={`px-3 py-1 text-xs rounded font-medium ${
            isUpdatingCardStates
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Clear Sessions
        </button>
      </div>
      
              {/* Debug Info */}
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium">Debug - Game Status:</div>
            <button
              onClick={copyDebugData}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
          <div className="text-gray-600 mb-2">
            <div className="flex items-center gap-4 flex-wrap">
              <span>Two-Card Open: <span className={`font-bold ${twoCardOpen ? 'text-green-600' : 'text-red-600'}`}>{twoCardOpen ? 'TRUE' : 'FALSE'}</span></span>
              <span>Game Started: <span className={`font-bold ${isGameStarted ? 'text-green-600' : 'text-red-600'}`}>{isGameStarted ? 'TRUE' : 'FALSE'}</span></span>
              <span>Game Won: <span className={`font-bold ${isGameWon ? 'text-green-600' : 'text-red-600'}`}>{isGameWon ? 'TRUE' : 'FALSE'}</span></span>
              <span>Game Started (Rive): <span className={`font-bold ${isGameStarted ? 'text-green-600' : 'text-red-600'}`}>{isGameStarted ? 'TRUE' : 'FALSE'}</span></span>
              <span>Game Mode: <span className="font-bold text-orange-600">{gameMode}</span></span>
              <span>Matched Cards: <span className="font-bold text-blue-600">{Object.values(cardStates).filter(state => state.matched).length}</span></span>
              <span>Total Pairs: <span className="font-bold text-purple-600">{Math.floor(totalCards / 2)}</span></span>
            </div>
          </div>
          
          {/* Game Session Debug Info */}
          <div className="font-medium mb-1">Debug - Game Session:</div>
          <div className="text-gray-600 mb-2">
            <div className="flex items-center gap-4 flex-wrap">
              <span>Session Active: <span className={`font-bold ${isSessionActive ? 'text-green-600' : 'text-red-600'}`}>{isSessionActive ? 'TRUE' : 'FALSE'}</span></span>
              {currentSession && (
                <>
                  <span>Session ID: <span className="font-bold text-purple-600">{currentSession.sessionId.substring(0, 12)}...</span></span>
                  <span>Total Clicks: <span className="font-bold text-blue-600">{currentSession.gameplay.totalClicks}</span></span>
                  <span>Matched Pairs: <span className="font-bold text-green-600">{currentSession.gameplay.matchedPairs}</span></span>
                </>
              )}
              {getSessionStats && (
                <>
                  <span>Elapsed Time: <span className="font-bold text-orange-600">{getSessionStats()?.elapsedTime || '0.00'}s</span></span>
                  <span>Completion Rate: <span className="font-bold text-indigo-600">{getSessionStats()?.completionRate?.toFixed(1) || '0'}%</span></span>
                </>
              )}
              <span>History Count: <span className="font-bold text-gray-600">{sessionHistory.length}/10</span></span>
            </div>
          </div>
        
        {/* Config Persistence Debug Info */}
        <div className="font-medium mb-1">Debug - Config Persistence:</div>
        <div className="text-gray-600 mb-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span>Config Loaded: <span className={`font-bold ${configLoaded ? 'text-green-600' : 'text-yellow-600'}`}>{configLoaded ? 'TRUE' : 'FALSE'}</span></span>
            <span>Last Saved: <span className="font-bold text-purple-600">
              {lastSavedConfig ? new Date(lastSavedConfig.timestamp).toLocaleTimeString() : 'Never'}
            </span></span>
            {lastSavedConfig && (
              <>
                <span>Saved Config: <span className="font-bold text-blue-600">
                  {lastSavedConfig.rows}x{lastSavedConfig.cols} | {lastSavedConfig.gameMode} | {lastSavedConfig.minValue}-{lastSavedConfig.maxValue}
                </span></span>
              </>
            )}
          </div>
        </div>
        
        <div className="font-medium mb-1">Debug - Card States (Checkbox Display):</div>
        <div className="text-gray-600 font-mono text-xs">
          <div className="space-y-1">
            {Object.entries(cardStates).map(([key, state]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-gray-500">Card {key}:</span>
                <span>value: {state.value || 0},</span>
                <span>open: <span className={state.open ? 'text-green-600' : 'text-red-600'}>{state.open ? 'true' : 'false'}</span>,</span>
                <span>matched: <span className={state.matched ? 'text-blue-600' : 'text-gray-400'}>{state.matched ? 'true' : 'false'}</span>,</span>
                <span>gameStarted: <span className={isGameStarted ? 'text-green-600' : 'text-red-600'}>{isGameStarted ? 'true' : 'false'}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;