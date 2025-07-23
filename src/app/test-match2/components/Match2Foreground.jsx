'use client';
import React from 'react';
import { 
  useRive, 
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceBoolean,
  useViewModelInstanceTrigger,
  useViewModelInstanceNumber,
  useViewModelInstanceString,
  Layout,
  Fit,
  Alignment,
} from '@rive-app/react-webgl2';

// Foreground Rive Component
const Match2Foreground = React.memo(({ 
  isGameWon, 
  isGameLose, 
  gameStarted, 
  isUpdatingCardStates = false,
  pointerEventsEnabled = false, 
  toggleGameState, 
  generateRandomPairs, 
  gameMode = 'Default' 
}) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/match_2_fg.riv',
    stateMachines: ['State Machine 1'],
    layout: new Layout({
      fit:Fit.Layout,
      alignment: Alignment.CenterLeft,
    }),
    autoplay: true,
    // fit: 'cover',
    onLoad: () => console.log('Match 2 Foreground Rive loaded'),
  });

  // Kết nối với viewmodel "gameFG"
  const gameFGViewModel = useViewModel(rive, { name: 'gameFG' });
  const gameFGInstance = useViewModelInstance(gameFGViewModel, { useNew: true, rive });
  
  // Truyền isGameWon, isGameLose, gameStarted và gameMode vào Rive
  const { setValue: setGameWon } = useViewModelInstanceBoolean('isGameWon', gameFGInstance);
  const { setValue: setGameLose } = useViewModelInstanceBoolean('isGameLose', gameFGInstance);
  const { setValue: setGameStarted } = useViewModelInstanceBoolean('gameStarted', gameFGInstance);
  const { setValue: setGameMode } = useViewModelInstanceNumber('gameMode', gameFGInstance);
  
  // Truyền button label động vào Rive
  const { setValue: setButtonLabel } = useViewModelInstanceString('property of Button/label', gameFGInstance);
  
  // Tính toán button label dựa trên trạng thái game
  const getButtonLabel = () => {
    if (isGameWon) {
      return 'Restart';
    } else if (gameStarted) {
      return 'Pause';
    } else {
      return 'Start';
    }
  };
  
  // Kết nối onClick với toggleGameState thông qua trigger - Logic giống hệt Control Panel
  useViewModelInstanceTrigger('property of Button/btnClk', gameFGInstance, {
    onTrigger: () => {
      console.log('🔄 Rive Button clicked!');
      console.log('📊 Current state:', {
        isGameWon,
        gameStarted,
        isUpdatingCardStates,
        gameMode
      });
      
      // Không cho phép click button khi đang cập nhật cardStates
      if (isUpdatingCardStates) {
        console.warn('❌ Button click ignored - card states are being updated');
        return;
      }
      
      // Logic giống hệt Control Panel button
      if (toggleGameState) {
        console.log('✅ Calling toggleGameState from Rive button');
        
        // Thêm delay nhỏ để đảm bảo state được cập nhật đúng cách
        setTimeout(() => {
          console.log('🚀 Executing toggleGameState after delay');
          toggleGameState();
        }, 10); // Delay nhỏ để tránh race condition
      } else {
        console.warn('❌ toggleGameState function not available');
      }
    },
  });
  
  // Đồng bộ isGameWon từ React state vào Rive
  React.useEffect(() => {
    if (isGameWon !== undefined && setGameWon) {
      console.log('🔄 Syncing isGameWon to Rive:', isGameWon);
      setGameWon(isGameWon);
    }
  }, [isGameWon, setGameWon]);
  
  // Đồng bộ isGameLose từ React state vào Rive
  React.useEffect(() => {
    if (isGameLose !== undefined && setGameLose) {
      setGameLose(isGameLose);
    }
  }, [isGameLose, setGameLose]);
  
  // Đồng bộ gameStarted từ React state vào Rive
  React.useEffect(() => {
    if (gameStarted !== undefined && setGameStarted) {
      console.log('🔄 Syncing gameStarted to Rive:', gameStarted);
      setGameStarted(gameStarted);
    }
  }, [gameStarted, setGameStarted]);



  // Đồng bộ gameMode từ React state vào Rive
  React.useEffect(() => {
    if (gameMode !== undefined && setGameMode) {
      setGameMode(gameMode);
    }
  }, [gameMode, setGameMode]);
  
  // Đồng bộ button label từ React state vào Rive
  React.useEffect(() => {
    if (setButtonLabel) {
      const label = getButtonLabel();
      console.log('🔄 Syncing button label to Rive:', label);
      setButtonLabel(label);
    }
  }, [isGameWon, gameStarted, setButtonLabel]);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden rounded-lg z-20 ${
      pointerEventsEnabled && !isUpdatingCardStates ? 'pointer-events-auto' : 'pointer-events-none'
    }`} style={{ left: 0, right: 0, top: 0, bottom: 0 }}>
      {RiveComponent && (
        <RiveComponent 
          
        />
      )}
    </div>
  );
});

Match2Foreground.displayName = 'Match2Foreground';

export default Match2Foreground;