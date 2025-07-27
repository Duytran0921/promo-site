'use client';
import React from 'react';

function SimpleMatch2Game({ customConfig, className }) {
  return (
    <div className={`p-4 border rounded-lg ${className || ''}`}>
      <h3 className="text-lg font-semibold mb-4">🎮 Simple Match2 Game</h3>
      
      {customConfig && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <h4 className="font-medium mb-2">Game Configuration:</h4>
          <div className="text-sm space-y-1">
            <div>Name: {customConfig.name}</div>
            <div>Grid: {customConfig.rows}x{customConfig.cols}</div>
            <div>Values: {customConfig.minValue}-{customConfig.maxValue}</div>
            <div>Label: {customConfig.labelOn ? 'On' : 'Off'}</div>
            <div>Value Images: {customConfig.valueImgOn ? 'On' : 'Off'}</div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-4 gap-2 max-w-md">
        {Array.from({ length: 8 }, (_, i) => (
          <div 
            key={i}
            className="aspect-square bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
          >
            <span className="text-lg font-bold text-blue-600">{i + 1}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>This is a placeholder component for SimpleMatch2Game.</p>
        <p>Check console for loading logs and functionality.</p>
      </div>
    </div>
  );
}

// EasyMatch2Game component for simple page
function EasyMatch2Game({ className, onGameWon }) {
  return (
    <div className={`p-8 ${className || ''}`}>
      <h1 className="text-3xl font-bold text-center mb-8">🎮 Easy Match2 Game</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 12 }, (_, i) => (
            <div 
              key={i}
              className="aspect-square bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-200 transition-colors"
              onClick={() => {
                if (i === 11 && onGameWon) {
                  onGameWon({ score: 100, time: 30 });
                }
              }}
            >
              <span className="text-xl font-bold text-green-600">{i + 1}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center text-gray-600">
          <p>Click on cards to play! (Click card 12 to trigger game won)</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleMatch2Game;
export { EasyMatch2Game };