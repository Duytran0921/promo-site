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
  gameMode = 'Default',
  twoCardOpenNoMatch = false, // Thêm prop mới
  twoCardOpenAndMatch = false, // Thêm prop mới
  timer = 0,
  score = 0, // Điểm số hiện tại
  topScore = 0, // Điểm cao nhất
  onPointerActivity = null
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
  
  // Thêm các trạng thái mới cho Rive
  const { setValue: setTwoCardOpenNoMatch } = useViewModelInstanceBoolean('twoCardOpenNoMatch', gameFGInstance);
  const { setValue: setTwoCardOpenAndMatch } = useViewModelInstanceBoolean('twoCardOpenAndMatch', gameFGInstance);
  const { setValue: setTimer } = useViewModelInstanceNumber('timer', gameFGInstance);
  
  // Truyền score và topScore vào Rive
  const { setValue: setScore } = useViewModelInstanceNumber('property of sideBar/score', gameFGInstance);
  const { setValue: setTopScore } = useViewModelInstanceNumber('property of sideBar/topScore', gameFGInstance);
  
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
      // Không cho phép click button khi đang cập nhật cardStates
      if (isUpdatingCardStates) {
        return;
      }
      
      // Kiểm tra pointer events
      if (!pointerEventsEnabled) {
        return;
      }
      
      // Track pointer activity
      if (onPointerActivity) {
        onPointerActivity();
      }
      
      // Logic giống hệt Control Panel
      if (gameMode === 'timeUp') {
        // TimeUp mode: chỉ cho phép start game khi chưa bắt đầu
        if (!gameStarted) {
          toggleGameState();
        }
      } else {
        // Normal mode: cho phép toggle bình thường
        toggleGameState();
      }
    }
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
  
  // Đồng bộ twoCardOpenNoMatch từ React state vào Rive
  React.useEffect(() => {
    if (twoCardOpenNoMatch !== undefined && setTwoCardOpenNoMatch) {
      console.log('🔄 Syncing twoCardOpenNoMatch to Rive:', twoCardOpenNoMatch);
      setTwoCardOpenNoMatch(twoCardOpenNoMatch);
    }
  }, [twoCardOpenNoMatch, setTwoCardOpenNoMatch]);
  
  // Đồng bộ twoCardOpenAndMatch từ React state vào Rive
  React.useEffect(() => {
    if (twoCardOpenAndMatch !== undefined && setTwoCardOpenAndMatch) {
      console.log('🔄 Syncing twoCardOpenAndMatch to Rive:', twoCardOpenAndMatch);
      setTwoCardOpenAndMatch(twoCardOpenAndMatch);
    }
  }, [twoCardOpenAndMatch, setTwoCardOpenAndMatch]);
  
  // Đồng bộ timer từ React state vào Rive
  React.useEffect(() => {
    if (timer !== undefined && setTimer) {
      console.log('🔄 Syncing timer to Rive:', timer);
      setTimer(timer);
    }
  }, [timer, setTimer]);
  
  // Đồng bộ score từ React state vào Rive - chỉ khi game đã bắt đầu hoặc có điểm số
  React.useEffect(() => {
    if (score !== undefined && setScore) {
      // Chỉ sync score khi game đã bắt đầu hoặc khi có điểm số thực tế (> 0)
      if (gameStarted || score > 0) {
        console.log('🔄 Syncing score to Rive:', score);
        setScore(score);
      } else {
        // Khi chưa bắt đầu game và score = 0, không sync hoặc sync giá trị âm để ẩn
        console.log('🔄 Not syncing score to Rive (game not started and score = 0)');
        setScore(-1); // Có thể dùng -1 để báo hiệu cho Rive ẩn score
      }
    }
  }, [score, setScore, gameStarted]);
  
  // Đồng bộ topScore từ React state vào Rive
  React.useEffect(() => {
    if (topScore !== undefined && setTopScore) {
      console.log('🔄 Syncing topScore to Rive:', topScore);
      setTopScore(topScore);
    }
  }, [topScore, setTopScore]);

  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden z-20 ${
        pointerEventsEnabled && !isUpdatingCardStates ? 'pointer-events-auto' : 'pointer-events-none'
      }`} 
      style={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onPointerDown={() => {
        if (pointerEventsEnabled && !isUpdatingCardStates && onPointerActivity) {
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

Match2Foreground.displayName = 'Match2Foreground';

export default Match2Foreground;