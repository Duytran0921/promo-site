'use client';
import React, { useState, useEffect } from 'react';
import { useMatch2GameWithConfig } from '../hooks/useMatch2GameWithConfig';
import { getGameConfig } from '../configs/gameConfig';

/**
 * Test page để kiểm tra scoring mechanism
 */
export default function TestScoringPage() {
  const [selectedConfig, setSelectedConfig] = useState('easy');
  const gameConfig = getGameConfig(selectedConfig);
  
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
    twoCardOpen,
    handleCardOpenChange,
    startGame,
    pauseGame,
    toggleGameState,
    generateRandomPairs,
    currentSession,
    sessionHistory,
    isSessionActive,
    getSessionStats,
    calculateMatchScore,
    calculateFinalScore
  } = useMatch2GameWithConfig(gameConfig);
  
  // Real-time session stats
  const [sessionStats, setSessionStats] = useState(null);
  
  // Update session stats every second
  useEffect(() => {
    const interval = setInterval(() => {
      const stats = getSessionStats();
      setSessionStats(stats);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [getSessionStats]);
  
  // Handle card click
  const handleCardClick = (cardIndex) => {
    if (!isGameStarted || !cardStates[cardIndex]) return;
    
    const currentCard = cardStates[cardIndex];
    if (currentCard.matched || currentCard.open) return;
    
    handleCardOpenChange(cardIndex, true);
  };
  
  // Calculate example match score
  const exampleMatchScore = calculateMatchScore ? calculateMatchScore(3.5, Math.floor(totalCards / 2)) : 0;
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Test Scoring Mechanism</h1>
        
        {/* Config Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Game Configuration</h2>
          <div className="flex gap-4 mb-4">
            {['easy', 'medium', 'hard'].map(configId => (
              <button
                key={configId}
                onClick={() => setSelectedConfig(configId)}
                className={`px-4 py-2 rounded ${
                  selectedConfig === configId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {configId.charAt(0).toUpperCase() + configId.slice(1)}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Grid: {rows}x{cols} | Total Cards: {totalCards} | Pairs: {Math.floor(totalCards / 2)}
          </div>
        </div>
        
        {/* Game Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Game Controls</h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={toggleGameState}
              className={`px-6 py-2 rounded font-medium ${
                isGameStarted
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isGameWon ? 'Restart Game' : isGameStarted ? 'Pause Game' : 'Start Game'}
            </button>
            <button
              onClick={generateRandomPairs}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Generate New Pairs
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Status: {isGameWon ? '🎉 Game Won!' : isGameStarted ? '🎮 Playing' : '⏸️ Paused'}
            {twoCardOpen && ' | 🃏 Two cards open'}
          </div>
        </div>
        
        {/* Scoring Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Scoring Information</h2>
          
          {/* Current Session Scoring */}
          {currentSession && currentSession.scoring && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Current Session Scoring</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-medium text-blue-800">Total Score</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {currentSession.scoring.totalScore}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-medium text-green-800">Final Score</div>
                  <div className="text-2xl font-bold text-green-600">
                    {currentSession.scoring.finalScore}
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="font-medium text-purple-800">Avg Match Score</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {currentSession.scoring.averageMatchScore}
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="font-medium text-orange-800">Matches</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {currentSession.scoring.matchScores.length}
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <div className="font-medium text-yellow-800">Top Score</div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {sessionHistory && sessionHistory.length > 0 ? Math.max(...sessionHistory.map(s => s.scoring?.finalScore || s.scoring?.totalScore || 0)) : 0}
                  </div>
                </div>
              </div>
              
              {/* Match Scores History */}
              {currentSession.scoring.matchScores.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Match Scores History:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSession.scoring.matchScores.map((score, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded text-sm"
                      >
                        Match {index + 1}: {score}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Example Scoring Calculation */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Example Scoring Calculation</h3>
            <div className="bg-gray-50 p-4 rounded">
              <div className="text-sm text-gray-600 mb-2">
                Example: Match completed in 3.5 seconds with {Math.floor(totalCards / 2)} total pairs
              </div>
              <div className="font-medium">
                Score: {exampleMatchScore} points
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Formula: Base (100) + Time Bonus + Efficiency Score
              </div>
            </div>
          </div>
          
          {/* Real-time Session Stats */}
          {sessionStats && (
            <div>
              <h3 className="text-lg font-medium mb-2">Real-time Session Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Elapsed Time:</span> {sessionStats.elapsedTime}s
                </div>
                <div>
                  <span className="font-medium">Total Clicks:</span> {sessionStats.totalClicks}
                </div>
                <div>
                  <span className="font-medium">Matched Pairs:</span> {sessionStats.matchedPairs}/{sessionStats.totalPairs}
                </div>
                <div>
                  <span className="font-medium">Completion Rate:</span> {sessionStats.completionRate.toFixed(1)}%
                </div>
                <div>
                  <span className="font-medium">Avg Time/Match:</span> {sessionStats.averageTimePerMatch}s
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Game Board */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Game Board</h2>
          <div 
            className="grid gap-2 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              maxWidth: `${cols * 80}px`
            }}
          >
            {cardIndices.map(cardIndex => {
              const card = cardStates[cardIndex] || { value: 1, open: false, matched: false };
              return (
                <button
                  key={cardIndex}
                  onClick={() => handleCardClick(cardIndex)}
                  disabled={!isGameStarted || card.matched || card.open}
                  className={`
                    w-16 h-16 rounded-lg border-2 font-bold text-lg
                    transition-all duration-200
                    ${
                      card.matched
                        ? 'bg-green-200 border-green-400 text-green-800'
                        : card.open
                        ? 'bg-blue-200 border-blue-400 text-blue-800'
                        : 'bg-gray-200 border-gray-400 text-gray-600 hover:bg-gray-300'
                    }
                    ${
                      !isGameStarted || card.matched || card.open
                        ? 'cursor-not-allowed opacity-60'
                        : 'cursor-pointer hover:scale-105'
                    }
                  `}
                >
                  {card.open || card.matched ? card.value : '?'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}