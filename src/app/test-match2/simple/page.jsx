'use client';
import { EasyMatch2Game } from '../components/SimpleMatch2Game';

export default function SimpleGamePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <EasyMatch2Game 
          className="w-full "
          onGameWon={(data) => {
            console.log('Game completed!', data);
          }}
        />
      </div>
    </div>
  );
}