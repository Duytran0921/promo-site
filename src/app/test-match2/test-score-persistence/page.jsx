'use client';
import React from 'react';
import StandaloneMatch2Game from '../components/StandaloneMatch2Game';

/**
 * Test page để kiểm tra tính năng giữ điểm số khi game thắng
 * Điểm số sẽ được giữ lại cho đến khi game restart (isGameWon chuyển về false)
 */
export default function TestScorePersistencePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Test Score Persistence
          </h1>
          <div className="text-center text-gray-600 mb-6">
            <p className="mb-2">
              <strong>Hướng dẫn test:</strong>
            </p>
            <ol className="text-left max-w-2xl mx-auto space-y-2">
              <li>1. Chơi game và quan sát điểm số tăng dần</li>
              <li>2. Khi game thắng (isGameWon = true), điểm số sẽ được giữ nguyên</li>
              <li>3. Click nút Restart để bắt đầu game mới</li>
              <li>4. Điểm số sẽ reset về 0 khi game restart</li>
              <li>5. Top Score sẽ được cập nhật nếu điểm mới cao hơn</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <StandaloneMatch2Game 
            configId="easy"
            className="w-full"
            onGameWon={(data) => {
              console.log('🎉 Game Won!', data);
              console.log('Score should persist until restart');
            }}
            onGameStarted={(data) => {
              console.log('🎮 Game Started!', data);
              console.log('Score should reset to 0');
            }}
          />
        </div>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Ghi chú kỹ thuật:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Điểm số được lưu trong state `lastWonScore` khi game thắng</li>
            <li>• `currentScore` sẽ hiển thị `lastWonScore` khi `isGameWon = true`</li>
            <li>• Khi game restart (`!isGameWon && !isGameStarted`), `lastWonScore` reset về 0</li>
            <li>• Top Score được tính từ `sessionHistory` và luôn được cập nhật</li>
          </ul>
        </div>
      </div>
    </div>
  );
}