'use client';
import React, { useState } from 'react';
import StandaloneMatch2Game from '../components/StandaloneMatch2Game';

export default function TestStandalonePage() {
  const [selectedConfig, setSelectedConfig] = useState('easy');
  const [gameResults, setGameResults] = useState([]);

  const handleGameWon = (data) => {
    console.log('🎉 Game won!', data);
    setGameResults(prev => [...prev, {
      timestamp: new Date().toISOString(),
      config: data.config.id,
      totalCards: data.totalCards,
      cardStates: data.cardStates
    }]);
  };

  const handleGameStarted = (data) => {
    console.log('🚀 Game started!', data);
  };

  const handleGamePaused = (data) => {
    console.log('⏸️ Game paused!', data);
  };

  const configs = [
    { id: 'easy', name: 'Dễ (2x3)' },
    { id: 'medium', name: 'Trung bình (3x4)' },
    { id: 'hard', name: 'Khó (4x5)' },
    { id: 'default', name: 'Mặc định (2x2)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Test Standalone Match-2 Game
          </h1>
          <p className="text-lg text-gray-600">
            Demo component StandaloneMatch2Game có thể chạy độc lập
          </p>
        </div>

        {/* Config Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Chọn cấu hình game</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {configs.map((config) => (
              <button
                key={config.id}
                onClick={() => setSelectedConfig(config.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedConfig === config.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-semibold">{config.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Game Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Game: {configs.find(c => c.id === selectedConfig)?.name}
          </h2>
          
          <div className="flex justify-center">
            <StandaloneMatch2Game
              configId={selectedConfig}
              onGameWon={handleGameWon}
              onGameStarted={handleGameStarted}
              onGamePaused={handleGamePaused}
              className="bg-gray-50 rounded-lg p-4"
              containerStyle={{
                transform: 'scale(0.9)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>

        {/* Custom Config Demo */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Custom Config Demo</h2>
          <div className="flex justify-center">
            <StandaloneMatch2Game
              customConfig={{
                id: 'custom-demo',
                name: 'Custom Demo',
                rows: 2,
                cols: 2,
                minValue: 1,
                maxValue: 2,
                autoPauseTimer: 10000,
                cardWidth: 120,
                cardHeight: 160,
                cardGap: 4,
                autoStart: false,
                showTimer: true,
                enablePointerEvents: true,
                gameMode: 'Default'
              }}
              onGameWon={(data) => {
                console.log('🎉 Custom game won!', data);
                setGameResults(prev => [...prev, {
                  timestamp: new Date().toISOString(),
                  config: 'custom-demo',
                  totalCards: data.totalCards,
                  cardStates: data.cardStates
                }]);
              }}
              className="bg-gray-50 rounded-lg p-4"
              containerStyle={{
                transform: 'scale(0.8)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>

        {/* Game Results */}
        {gameResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Kết quả game</h2>
            <div className="space-y-4">
              {gameResults.map((result, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-blue-600">
                      {result.config}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(result.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Tổng thẻ: {result.totalCards} | 
                    Thẻ đã mở: {Object.values(result.cardStates).filter(card => card.open).length} |
                    Thẻ đã match: {Object.values(result.cardStates).filter(card => card.matched).length}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setGameResults([])}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Xóa kết quả
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">
            Hướng dẫn sử dụng
          </h3>
          <ul className="space-y-2 text-blue-700">
            <li>• Chọn cấu hình game từ các preset có sẵn</li>
            <li>• Click nút Start để bắt đầu game</li>
            <li>• Click vào các thẻ để lật và ghép cặp</li>
            <li>• Ghép tất cả cặp để hoàn thành game</li>
            <li>• Kết quả sẽ được hiển thị bên dưới</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 