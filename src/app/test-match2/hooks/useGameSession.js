'use client';
import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Hook quản lý Game Session Storage
 * Lưu trữ lịch sử phiên chơi với giới hạn 10 session
 */
export const useGameSession = () => {
  // Session hiện tại
  const [currentSession, setCurrentSession] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  // Session history
  const [sessionHistory, setSessionHistory] = useState([]);
  const sessionHistoryRef = useRef([]); // Add ref for session history
  
  // Refs để track realtime data
  const clickCountRef = useRef(0);
  const matchTimesRef = useRef([]);
  const startTimeRef = useRef(null);
  const currentSessionRef = useRef(null); // Add ref to track current session
  
  // Validate và clean up session data
  const validateSession = (session) => {
    if (!session || typeof session !== 'object') return null;
    if (!session.sessionId || !session.scoring) return null;
    
    // Đảm bảo scoring có các field cần thiết
    const scoring = {
      totalScore: session.scoring.totalScore || 0,
      finalScore: session.scoring.finalScore || 0,
      matchScore: session.scoring.matchScore || 0
    };
    
    // Nếu session completed nhưng không có finalScore, tính lại
    if (session.completed && scoring.finalScore === 0 && scoring.totalScore > 0) {
      scoring.finalScore = Math.floor(scoring.totalScore * 1.2); // 20% bonus
    }
    
    return {
      ...session,
      scoring,
      completed: Boolean(session.completed)
    };
  };

  // Load session history từ localStorage
  const loadSessionHistory = useCallback(() => {
    try {
      const saved = localStorage.getItem('match2GameSessions');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate và clean up mỗi session
        const validated = parsed
          .map(validateSession)
          .filter(session => session !== null);
        // Giới hạn chỉ lưu 10 session gần nhất
        const limited = validated.slice(-10);
        
        // Nếu có thay đổi, save lại
        if (validated.length !== parsed.length) {
          localStorage.setItem('match2GameSessions', JSON.stringify(limited));
          console.log('🔧 Cleaned up invalid sessions from localStorage');
        }
        
        setSessionHistory(limited);
        sessionHistoryRef.current = limited;
      }
    } catch (error) {
      console.error('Failed to load session history:', error);
      // Nếu localStorage bị corrupt, clear nó
      localStorage.removeItem('match2GameSessions');
      setSessionHistory([]);
      sessionHistoryRef.current = [];
    }
  }, []);

  // Save session history to localStorage
  const saveSessionHistory = useCallback((history) => {
    try {
      // Giới hạn tối đa 10 session
      const limitedHistory = history.slice(-10);
      localStorage.setItem('match2GameSessions', JSON.stringify(limitedHistory));
      setSessionHistory(limitedHistory);
      sessionHistoryRef.current = limitedHistory;
    } catch (error) {
      console.error('Failed to save session history:', error);
    }
  }, []);

  // Update session trong history
  const updateSessionInHistory = useCallback((updatedSession) => {
    try {
      const currentHistory = sessionHistoryRef.current;
      const sessionIndex = currentHistory.findIndex(session => session.sessionId === updatedSession.sessionId);
      
      if (sessionIndex !== -1) {
        // Update session trong history
        const updatedHistory = [...currentHistory];
        updatedHistory[sessionIndex] = updatedSession;
        
        // Lưu vào localStorage
        const limitedHistory = updatedHistory.slice(-10);
        localStorage.setItem('match2GameSessions', JSON.stringify(limitedHistory));
        sessionHistoryRef.current = limitedHistory;
        setSessionHistory(limitedHistory);
      }
    } catch (error) {
      console.error('Failed to update session in history:', error);
    }
  }, []);

  // Tạo session ID duy nhất
  const generateSessionId = useCallback(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `session_${timestamp}_${random}`;
  }, []);

  // Tính điểm cho một match dựa trên thời gian
  const calculateMatchScore = useCallback((matchTime, totalPairs) => {
    // Base score: 100 điểm cho mỗi match
    const baseScore = 100;
    
    // Time bonus: giảm điểm theo thời gian (tối đa 50 điểm bonus)
    // Nếu match trong 2 giây: full bonus
    // Nếu match trong 10 giây: không có bonus
    const timeBonus = Math.max(0, Math.min(50, 50 - (matchTime - 2) * 6.25));
    
    // Efficiency score: bonus dựa trên tổng số cặp (game khó hơn = điểm cao hơn)
    const efficiencyScore = Math.floor(totalPairs / 2);
    
    return Math.round(baseScore + timeBonus + efficiencyScore);
  }, []);

  // Tính tổng điểm cuối game
  const calculateFinalScore = useCallback((session) => {
    if (!session || !session.scoring) return 0;
    
    const { matchScores, totalScore } = session.scoring;
    const { completionTime, startTime } = session.timestamps;
    const totalPairs = Math.floor(session.config.totalCards / 2);
    
    // Completion bonus: 20% của total score nếu hoàn thành game
    let completionBonus = 0;
    if (session.completed && completionTime) {
      completionBonus = Math.round(totalScore * 0.2);
    }
    
    return totalScore + completionBonus;
  }, []);

  // Bắt đầu session mới
  const startSession = useCallback((gameConfig) => {
    const sessionId = generateSessionId();
    const startTime = Date.now();
    
    const newSession = {
      sessionId,
      config: {
        gameMode: gameConfig.gameMode || 'Default',
        rows: gameConfig.rows,
        cols: gameConfig.cols,
        totalCards: gameConfig.rows * gameConfig.cols,
        minValue: gameConfig.minValue,
        maxValue: gameConfig.maxValue
      },
      timestamps: {
        startTime,
        firstMatchTime: null,
        completionTime: null
      },
      gameplay: {
        totalClicks: 0,
        matchedPairs: 0,
        matchTimes: []
      },
      scoring: {
        matchScores: [],
        totalScore: 0,
        finalScore: 0,
        averageMatchScore: 0
      },
      completed: false
    };

    setCurrentSession(newSession);
    currentSessionRef.current = newSession; // Update ref
    setIsSessionActive(true);
    clickCountRef.current = 0;
    matchTimesRef.current = [];
    startTimeRef.current = startTime;
    
    // Lưu session ngay khi bắt đầu
    const newHistory = [...sessionHistoryRef.current, newSession];
    saveSessionHistory(newHistory);
    
    console.log('🎮 New game session started and saved:', sessionId);
    return sessionId;
  }, [generateSessionId, saveSessionHistory]);

  // Track click
  const trackClick = useCallback(() => {
    if (isSessionActive && currentSessionRef.current) {
      clickCountRef.current += 1;
      
      // Update session real-time
      const updatedSession = {
        ...currentSessionRef.current,
        gameplay: {
          ...currentSessionRef.current.gameplay,
          totalClicks: clickCountRef.current
        }
      };
      
      // Update ref và state
      currentSessionRef.current = updatedSession;
      setCurrentSession(updatedSession);
      
      // Update trong localStorage
      updateSessionInHistory(updatedSession);
      
      console.log(`🖱️ Click tracked: ${clickCountRef.current} clicks`);
    }
  }, [isSessionActive, updateSessionInHistory, calculateFinalScore]);

  // Track match
  const trackMatch = useCallback((pairIndex) => {
    if (isSessionActive && currentSessionRef.current) {
      const matchTime = Date.now();
      const timeFromStart = (matchTime - startTimeRef.current) / 1000; // seconds
      
      matchTimesRef.current.push(timeFromStart);
      
      // Tính điểm cho match này
      const totalPairs = Math.floor(currentSessionRef.current.config.totalCards / 2);
      const matchScore = calculateMatchScore(timeFromStart, totalPairs);
      
      // Update scoring data
      const newMatchScores = [...currentSessionRef.current.scoring.matchScores, matchScore];
      const newTotalScore = newMatchScores.reduce((sum, score) => sum + score, 0);
      const newAverageScore = Math.round(newTotalScore / newMatchScores.length);
      
      // Update session với match mới
      const updatedSession = {
        ...currentSessionRef.current,
        gameplay: {
          ...currentSessionRef.current.gameplay,
          matchedPairs: pairIndex + 1,
          matchTimes: [...matchTimesRef.current]
        },
        scoring: {
          ...currentSessionRef.current.scoring,
          matchScores: newMatchScores,
          totalScore: newTotalScore,
          averageMatchScore: newAverageScore
        }
      };
      
      // Lưu thời điểm match đầu tiên
      if (pairIndex === 0) {
        updatedSession.timestamps.firstMatchTime = matchTime;
      }
      
      // Update ref và state
      currentSessionRef.current = updatedSession;
      setCurrentSession(updatedSession);
      
      // Update trong localStorage
      updateSessionInHistory(updatedSession);
      
      console.log(`🎯 Match ${pairIndex + 1} tracked at ${timeFromStart.toFixed(2)}s - Score: ${matchScore}`);
    }
  }, [isSessionActive, updateSessionInHistory, calculateMatchScore]);

  // Kết thúc session
  const endSession = useCallback((isCompleted = false) => {
    if (currentSessionRef.current && isSessionActive) {
      const endTime = Date.now();
      
      // Tính final score
      const tempSession = {
        ...currentSessionRef.current,
        completed: isCompleted,
        timestamps: {
          ...currentSessionRef.current.timestamps,
          completionTime: endTime
        }
      };
      
      const finalScore = calculateFinalScore(tempSession);
      
      const finalSession = {
        ...tempSession,
        gameplay: {
          ...currentSessionRef.current.gameplay,
          totalClicks: clickCountRef.current,
          matchTimes: [...matchTimesRef.current]
        },
        scoring: {
          ...currentSessionRef.current.scoring,
          finalScore: finalScore
        }
      };

      // Update session cuối cùng trong history
      updateSessionInHistory(finalSession);

      setCurrentSession(null);
      currentSessionRef.current = null; // Clear ref
      setIsSessionActive(false);
      clickCountRef.current = 0;
      matchTimesRef.current = [];
      startTimeRef.current = null;

      console.log('🏁 Game session ended:', finalSession.sessionId, isCompleted ? '(completed)' : '(incomplete)', `Final Score: ${finalScore}`);
      return finalSession;
    }
  }, [isSessionActive, updateSessionInHistory]);

  // Clear session history
  const clearSessionHistory = useCallback(() => {
    try {
      localStorage.removeItem('match2GameSessions');
      setSessionHistory([]);
      sessionHistoryRef.current = [];
      console.log('🗑️ Session history cleared');
    } catch (error) {
      console.error('Failed to clear session history:', error);
    }
  }, []);

  // Get session statistics
  const getSessionStats = useCallback(() => {
    if (!currentSessionRef.current) return null;

    const now = Date.now();
    const startTime = currentSessionRef.current.timestamps.startTime;
    const elapsedTime = (now - startTime) / 1000; // seconds

    return {
      sessionId: currentSessionRef.current.sessionId,
      elapsedTime: elapsedTime.toFixed(2),
      totalClicks: clickCountRef.current, // Use ref for real-time data
      matchedPairs: matchTimesRef.current.length, // Use ref for real-time data
      totalPairs: Math.floor(currentSessionRef.current.config.totalCards / 2),
      completionRate: (matchTimesRef.current.length / Math.floor(currentSessionRef.current.config.totalCards / 2)) * 100,
      averageTimePerMatch: matchTimesRef.current.length > 0 
        ? (matchTimesRef.current.reduce((a, b) => a + b, 0) / matchTimesRef.current.length).toFixed(2)
        : 0
    };
  }, []); // No dependencies needed since we use refs

  // Load history on mount
  useEffect(() => {
    loadSessionHistory();
  }, []); // Remove loadSessionHistory from dependencies to prevent infinite loop

  return {
    // Current session
    currentSession,
    isSessionActive,
    
    // Session management
    startSession,
    endSession,
    trackClick,
    trackMatch,
    
    // History management
    sessionHistory,
    clearSessionHistory,
    
    // Statistics
    getSessionStats,
    
    // Scoring
    calculateMatchScore,
    calculateFinalScore
  };
};