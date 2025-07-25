'use client';
import React, { useState, useEffect } from 'react';
import { useMatch2GameWithConfig } from '../test-match2/hooks/useMatch2GameWithConfig';
import { defaultConfig } from '../test-match2/configs/gameConfig';
import ImageConfigDemo from '../test-match2/components/ImageConfigDemo';

function OptimizationTest() {
  const [renderCount, setRenderCount] = useState(0);
  const gameHook = useMatch2GameWithConfig(defaultConfig);
  
  useEffect(() => {
    setRenderCount(prev => prev + 1);
    console.log('🔄 OptimizationTest rendered:', renderCount + 1);
  });
  
  return (
    <div style={{ 
      padding: '15px', 
      border: '2px solid #007bff', 
      borderRadius: '8px', 
      margin: '20px 0',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ color: '#007bff', marginTop: '0' }}>🧪 Optimization Test</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Render Count:</strong> 
        <span style={{ 
          backgroundColor: renderCount > 3 ? '#dc3545' : '#28a745', 
          color: 'white', 
          padding: '2px 8px', 
          borderRadius: '4px', 
          marginLeft: '8px' 
        }}>
          {renderCount}
        </span>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Cards with URLs:</strong> 
        <span style={{ marginLeft: '8px' }}>
          {Object.keys(gameHook.cardStates).length}
        </span>
      </div>
      
      <button 
        onClick={() => gameHook.generateRandomPairs()}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#ffc107', 
          color: '#000', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        🎲 Generate Random Pairs
      </button>
      
      <button 
        onClick={() => gameHook.startGame()}
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        🎮 Start Game
      </button>
      
      <div style={{ 
        marginTop: '15px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '12px'
      }}>
        <strong>🃏 Sample URLs:</strong>
        {Object.entries(gameHook.cardStates).slice(0, 2).map(([index, state]) => (
          <div key={index} style={{ marginTop: '5px' }}>
            <code>Card {index}: {state.label} | {state.valueImg}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestImageConfigPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🧪 Test Image Config Optimization</h1>
      <p>Mở Console (F12) để xem logs. Nếu tối ưu hóa thành công, sẽ không thấy log liên tục.</p>
      
      <OptimizationTest />
      <ImageConfigDemo />
    </div>
  );
}