'use client';
import React, { useState, useEffect } from 'react';
import { useGameSession } from '../hooks/useGameSession';

/**
 * Simple test page để kiểm tra scoring functions
 */
export default function TestScoringSimplePage() {
  const {
    currentSession,
    startSession,
    trackMatch,
    endSession,
    calculateMatchScore,
    calculateFinalScore,
    getSessionStats
  } = useGameSession();
  
  const [testResults, setTestResults] = useState([]);
  const [sessionStats, setSessionStats] = useState(null);
  
  // Test scoring functions
  const runScoringTests = () => {
    const results = [];
    
    // Test 1: calculateMatchScore function
    if (calculateMatchScore) {
      const score1 = calculateMatchScore(2.0, 6); // Fast match
      const score2 = calculateMatchScore(5.0, 6); // Slow match
      const score3 = calculateMatchScore(1.0, 6); // Very fast match
      
      results.push({
        test: 'calculateMatchScore',
        cases: [
          { input: '2.0s, 6 pairs', output: score1 },
          { input: '5.0s, 6 pairs', output: score2 },
          { input: '1.0s, 6 pairs', output: score3 }
        ]
      });
    }
    
    // Test 2: calculateFinalScore function
    if (calculateFinalScore) {
      const mockSession = {
        scoring: {
          matchScores: [150, 120, 100, 80, 60],
          totalScore: 510
        },
        gameConfig: { totalPairs: 5 },
        completedAt: Date.now(),
        startedAt: Date.now() - 30000, // 30 seconds ago
        totalClicks: 15
      };
      
      const finalScore = calculateFinalScore(mockSession);
      
      results.push({
        test: 'calculateFinalScore',
        cases: [
          { 
            input: 'Mock session (5 pairs, 30s, 15 clicks)', 
            output: finalScore 
          }
        ]
      });
    }
    
    setTestResults(results);
  };
  
  // Start a test game session
  const startTestSession = () => {
    const testConfig = {
      rows: 3,
      cols: 4,
      totalPairs: 6,
      gameId: 'test-scoring'
    };
    
    startSession(testConfig);
  };
  
  // Simulate a match
  const simulateMatch = () => {
    if (currentSession) {
      const currentMatches = currentSession.matchedPairs || 0;
      trackMatch(currentMatches);
    }
  };
  
  // End test session
  const endTestSession = () => {
    endSession(true);
  };
  
  // Update session stats
  useEffect(() => {
    const interval = setInterval(() => {
      const stats = getSessionStats();
      setSessionStats(stats);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [getSessionStats]);
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Simple Scoring Test</h1>
        
        {/* Function Tests */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Scoring Function Tests</h2>
          <button
            onClick={runScoringTests}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            Run Scoring Tests
          </button>
          
          {testResults.map((result, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-medium mb-2">{result.test}</h3>
              <div className="space-y-2">
                {result.cases.map((testCase, caseIndex) => (
                  <div key={caseIndex} className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">Input: {testCase.input}</div>
                    <div className="font-medium">Output: {JSON.stringify(testCase.output)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Session Tests */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Scoring Tests</h2>
          
          <div className="flex gap-4 mb-4">
            <button
              onClick={startTestSession}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              disabled={!!currentSession}
            >
              Start Test Session
            </button>
            <button
              onClick={simulateMatch}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              disabled={!currentSession}
            >
              Simulate Match
            </button>
            <button
              onClick={endTestSession}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              disabled={!currentSession}
            >
              End Session
            </button>
          </div>
          
          {/* Current Session Info */}
          {currentSession && (
            <div className="bg-blue-50 p-4 rounded mb-4">
              <h3 className="font-medium mb-2">Current Session</h3>
              <div className="text-sm space-y-1">
                <div>Session ID: {currentSession.sessionId}</div>
                <div>Started: {new Date(currentSession.startedAt).toLocaleTimeString()}</div>
                <div>Matched Pairs: {currentSession.matchedPairs || 0}</div>
                <div>Total Clicks: {currentSession.totalClicks || 0}</div>
                
                {currentSession.scoring && (
                  <div className="mt-2">
                    <div className="font-medium">Scoring Data:</div>
                    <div>Total Score: {currentSession.scoring.totalScore}</div>
                    <div>Final Score: {currentSession.scoring.finalScore}</div>
                    <div>Match Scores: [{currentSession.scoring.matchScores.join(', ')}]</div>
                    <div>Average: {currentSession.scoring.averageMatchScore}</div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Session Stats */}
          {sessionStats && (
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-medium mb-2">Real-time Stats</h3>
              <div className="text-sm space-y-1">
                <div>Elapsed Time: {sessionStats.elapsedTime}s</div>
                <div>Total Clicks: {sessionStats.totalClicks}</div>
                <div>Matched Pairs: {sessionStats.matchedPairs}/{sessionStats.totalPairs}</div>
                <div>Completion Rate: {sessionStats.completionRate.toFixed(1)}%</div>
                <div>Avg Time/Match: {sessionStats.averageTimePerMatch}s</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Scoring Formula Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Scoring Formula</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium">Match Score Formula:</h3>
              <code className="bg-gray-100 p-2 rounded block mt-1">
                baseScore (100) + timeBonus + efficiencyScore
              </code>
              <ul className="mt-2 ml-4 space-y-1">
                <li>• Time Bonus: max(0, 50 - matchTime * 10)</li>
                <li>• Efficiency Score: (totalPairs - currentMatches) * 5</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium">Final Score Bonuses:</h3>
              <ul className="ml-4 space-y-1">
                <li>• Completion Bonus: 200 points (if completed)</li>
                <li>• Time Bonus: max(0, 300 - totalTime * 2)</li>
                <li>• Efficiency Bonus: max(0, (totalPairs * 2 - totalClicks) * 10)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}