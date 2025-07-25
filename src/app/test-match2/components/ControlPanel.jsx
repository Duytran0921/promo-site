'use client';
import React from 'react';
import DynamicCard from './DynamicCard';

const ControlPanel = ({
  totalCards,
  isGameStarted,
  isUpdatingCardStates = false,
  toggleGameState,
  rows,
  cols,
  setRows,
  setCols,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  cardIndices,
  cardStates,
  handleCardValueChange,
  handleCardOpenChange,
  gameMode,
  setGameMode,
  // Config persistence props
  saveConfig,
  configLoaded,
  lastSavedConfig
}) => {
  return (
    <div className="w-full border-2 border-blue-500 rounded-lg bg-blue-50">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-blue-100 border-b border-blue-300 p-2 z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold">Control Panel ({totalCards} Cards)</h3>
          <div className="flex items-center gap-2">
            {/* Save Config Button */}
            <button
              onClick={() => {
                console.log('💾 Save Config button clicked!');
                const success = saveConfig();
                if (success) {
                  console.log('✅ Config saved successfully');
                } else {
                  console.error('❌ Failed to save config');
                }
              }}
              disabled={isUpdatingCardStates}
              className={`px-3 py-1 text-white text-xs rounded font-medium ${
                isUpdatingCardStates 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
              title="Save current configuration to localStorage"
            >
              💾 Save Config
            </button>
            
            {/* Game Control Button */}
            <button
              onClick={() => {
                console.log('🔄 Control Panel Button clicked!');
                console.log('📊 Current state:', {
                  isGameStarted,
                  isUpdatingCardStates,
                  totalCards
                });
                
                // Không cho phép click khi đang cập nhật cardStates
                if (isUpdatingCardStates) {
                  console.warn('❌ Button click ignored - card states are being updated');
                  return;
                }
                
                console.log('✅ Calling toggleGameState from Control Panel button');
                toggleGameState();
              }}
              disabled={isUpdatingCardStates}
              className={`px-4 py-1 text-white text-sm rounded font-medium ${
                isUpdatingCardStates 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : isGameStarted 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isUpdatingCardStates ? 'Updating...' : (isGameStarted ? 'Pause' : 'Reset')}
            </button>
          </div>
        </div>
        
        {/* Config Status */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <span>Config Status:</span>
          <span className={`px-2 py-1 rounded text-xs ${
            configLoaded ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {configLoaded ? '✅ Loaded' : '⏳ Loading...'}
          </span>
          {lastSavedConfig && (
            <span className="text-xs text-gray-500">
              | Last saved: {new Date(lastSavedConfig.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        
        {/* Grid Configuration */}
        <div className="flex items-center gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <label className="font-medium">Rows:</label>
            <input
              type="number"
              min="1"
              max="6"
              value={rows}
              disabled={isUpdatingCardStates}
              onChange={(e) => setRows(Number(e.target.value))}
              className={`w-12 p-1 border border-gray-300 rounded ${
                isUpdatingCardStates ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">Cols:</label>
            <input
              type="number"
              min="1"
              max="6"
              value={cols}
              disabled={isUpdatingCardStates}
              onChange={(e) => setCols(Number(e.target.value))}
              className={`w-12 p-1 border border-gray-300 rounded ${
                isUpdatingCardStates ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">Min:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={minValue}
              disabled={isUpdatingCardStates}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (newMin <= maxValue) {
                  setMinValue(newMin);
                }
              }}
              className={`w-12 p-1 border border-gray-300 rounded ${
                isUpdatingCardStates ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">Max:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={maxValue}
              disabled={isUpdatingCardStates}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax >= minValue) {
                  setMaxValue(newMax);
                }
              }}
              className={`w-12 p-1 border border-gray-300 rounded ${
                isUpdatingCardStates ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">Game Mode:</label>
            <select
              value={gameMode}
              disabled={isUpdatingCardStates}
              onChange={(e) => setGameMode(e.target.value)}
              className={`p-1 border border-gray-300 rounded text-xs ${
                isUpdatingCardStates ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              <option value="Default">Default</option>
              <option value="TimeUP">TimeUP</option>
              <option value="Multilever">Multilever</option>
              <option value="Scrored">Scrored</option>
            </select>
          </div>
          <div className="text-gray-600">
            Total Cards: {totalCards} | Range: {minValue}-{maxValue}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-2">
        {/* Individual Card Controls - Dynamic Grid */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center mb-3">
          <div 
            className="grid gap-1"
            style={{ 
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              width: `${120 * cols + 4 * (cols - 1)}px`,
              height: `${50 * rows + 4 * (rows - 1)}px`,
              maxWidth: '90vw'
            }}
          >
            {cardIndices.map((cardIndex) => (
              <DynamicCard
                key={`control-${cardIndex}`}
                cardIndex={cardIndex}
                onValueChange={handleCardValueChange}
                onOpenChange={handleCardOpenChange}
                mode="control"
                cardState={cardStates[cardIndex] || { value: 1, open: false, matched: false }}
                label={cardStates[cardIndex]?.label || null} // Truyền label từ cardState
                labelOn={config?.labelOn || false} // Truyền labelOn từ config
                valueImg={cardStates[cardIndex]?.valueImg || null} // Truyền valueImg từ cardState
                valueImgOn={config?.valueImgOn || false} // Truyền valueImgOn từ config
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;