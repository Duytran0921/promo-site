'use client';
import React from 'react';
import { 
  useRive, 
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceBoolean,
  Layout,
  Fit,
  Alignment,
} from '@rive-app/react-webgl2';

// Background Rive Component
const Match2Background = React.memo(({ isGameWon, pointerEventsEnabled = false, onPointerActivity = null }) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/match_2_bg.riv',
    stateMachines: ['State Machine 1'],
    layout : new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
    onLoad: () => console.log('Match 2 Background Rive loaded'),
  });

  // Kết nối với viewmodel "gameBG"
  const gameBGViewModel = useViewModel(rive, { name: 'gameBG' });
  const gameBGInstance = useViewModelInstance(gameBGViewModel, { useNew: true, rive });
  
  // Truyền isGameWon vào Rive
  const { setValue: setGameWon } = useViewModelInstanceBoolean('isGameWon', gameBGInstance);
  
  // Đồng bộ isGameWon từ React state vào Rive
  React.useEffect(() => {
    if (isGameWon !== undefined && setGameWon) {
      setGameWon(isGameWon);
    }
  }, [isGameWon, setGameWon]);

  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden rounded-lg ${
        pointerEventsEnabled ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onPointerDown={() => {
        if (pointerEventsEnabled && onPointerActivity) {
          onPointerActivity();
        }
      }}
    >
      {RiveComponent && (
        <RiveComponent 
        />
      )}
    </div>
  );
});

Match2Background.displayName = 'Match2Background';

export default Match2Background;