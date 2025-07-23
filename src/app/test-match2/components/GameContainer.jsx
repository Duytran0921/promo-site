'use client';
import React from 'react';
import Match2Background from './Match2Background';
import Match2Foreground from './Match2Foreground';
import DynamicCard from './DynamicCard';

const GameContainer = ({
  isGameWon,
  isGameStarted,
  isUpdatingCardStates,
  pointerEventsMode,
  handlePointerEnter,
  rows,
  cols,
  cardIndices,
  cardStates,
  handleCardValueChange,
  handleCardOpenChange,
  toggleGameState,
  generateRandomPairs,
  gameMode
}) => {
  return (
    <div 
      className="w-full py-20 bg-gray-100 flex flex-col items-center relative overflow-hidden"
      onPointerEnter={handlePointerEnter}
    >
      {/* Rive Background với isGameWon */}
      <Match2Background 
        isGameWon={isGameWon} 
        pointerEventsEnabled={pointerEventsMode === 'background'}
      />
      
      {/* Content Layer */}
      <div className={`relative z-10 w-full flex flex-col items-center ${
        pointerEventsMode === 'background' ? 'pointer-events-none' : 'pointer-events-auto'
      }`}>
        <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
          <div 
            className={`grid gap-1 ${
              pointerEventsMode === 'cards' ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            style={{ 
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              width: `${160 * cols + 4 * (cols - 1)}px`,
              height: `${185 * rows + 4 * (rows - 1)}px`,
              maxWidth: '90vw',
              maxHeight: '80vh'
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
                pointerEventsEnabled={pointerEventsMode === 'cards' && !isUpdatingCardStates}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Rive Foreground với isGameWon, gameStarted, timer và gameMode */}
      <Match2Foreground 
        isGameWon={isGameWon} 
        gameStarted={isGameStarted}
        isUpdatingCardStates={isUpdatingCardStates}
        pointerEventsEnabled={pointerEventsMode === 'foreground'}
        toggleGameState={toggleGameState}
        generateRandomPairs={generateRandomPairs}
        gameMode={gameMode}
      />
    </div>
  );
};

export default GameContainer;