'use client';
import React from 'react';
import StandaloneMatch2Game from '../components/StandaloneMatch2Game';
import { getGameConfig } from '../configs/gameConfig';

/**
 * Test page để kiểm tra score và topScore có được truyền vào Rive không
 */
export default function TestRiveScoringPage() {
  const gameConfig = getGameConfig('easy');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Test Rive Scoring Integration
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="text-gray-700 space-y-2">
            <p>1. Bắt đầu game bằng cách click vào nút Start Game</p>
            <p>2. Chơi game để tạo ra điểm số</p>
            <p>3. Kiểm tra console để xem score và topScore có được sync vào Rive không</p>
            <p>4. Trong Rive animation, score sẽ được truyền vào "property of sideBar/score"</p>
            <p>5. Top score sẽ được truyền vào "property of sideBar/topScore"</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Game</h2>
          <StandaloneMatch2Game gameConfig={gameConfig} />
        </div>
      </div>
    </div>
  );
}