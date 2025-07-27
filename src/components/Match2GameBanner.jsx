'use client';
import React, { useRef } from 'react';
import StandaloneMatch2Game from "@/app/test-match2/components/StandaloneMatch2Game";

export default function Match2GameBanner() {
  const gameRef = useRef(null);

  const handleGameWon = (data) => {
    console.log('🎉 Game won!', data);
    
    // Log session data khi game thắng
    if (gameRef.current) {
      const sessionData = gameRef.current.getSessionData();
      console.log('📊 Session data:', sessionData);
    }
  };

  const handleGameStarted = (data) => {
    console.log('🚀 Game started!', data);
  };

  const handleGamePaused = (data) => {
    console.log('⏸️ Game paused!', data);
  };

  return (
    <section className=" bg-white flex items-center justify-center pt-16">
      <div className="w-full px-16">
        <div className="flex justify-center">
          <StandaloneMatch2Game
            ref={gameRef}
            configId="banner"
            onGameWon={handleGameWon}
            onGameStarted={handleGameStarted}
            onGamePaused={handleGamePaused}
            // className=" "
            containerStyle={{
              transform: 'scale(1.1)',
              transformOrigin: 'center'
            }}
          />
        </div>
      </div>
    </section>
  );
} 