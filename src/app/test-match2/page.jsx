'use client';
import React, { useCallback } from 'react';
import { 
  useRive, 
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceString,
  useViewModelInstanceNumber,
  useViewModelInstanceBoolean,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
  Layout,
  Fit,
  Alignment,
} from '@rive-app/react-webgl2';
import { useMatch2Game } from './useMatch2Game';

// Background Rive Component
const Match2Background = React.memo(({ isGameWon }) => {
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
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg pointer-events-none">
      {RiveComponent && (
        <RiveComponent 
        />
      )}
    </div>
  );
});

Match2Background.displayName = 'Match2Background';

// Dynamic Card Component
const DynamicCard = React.memo(({ cardIndex, onValueChange, onOpenChange, mode = 'display', cardState = {}, isGameStarted = false, cardStates = {} }) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/match_2_card.riv',
    stateMachines: ['State Machine 1'],
    autoplay: true,
    fit: 'contain',
    onLoad: () => console.log(`Match 2 Card Rive ${cardIndex} loaded`),
  });

  const cardViewModel = useViewModel(rive, { name: 'card' });
  const cardInstance = useViewModelInstance(cardViewModel, { useNew: true, rive });
  
  const { value: cardValue, setValue: setCardValue } = useViewModelInstanceNumber('cardValue', cardInstance);
  const { value: cardOpen, setValue: setCardOpen } = useViewModelInstanceBoolean('cardOpen', cardInstance);
  const { value: matched, setValue: setMatched } = useViewModelInstanceBoolean('matched', cardInstance);
  const { value: gameStarted, setValue: setGameStarted } = useViewModelInstanceBoolean('gameStarted', cardInstance);
  
  // Chỉ đồng bộ một chiều: external state -> Rive (single source of truth)
  React.useEffect(() => {
    if (cardState.value !== undefined && setCardValue) {
      setCardValue(cardState.value);
    }
  }, [cardState.value, setCardValue]);
  
  React.useEffect(() => {
    if (cardState.open !== undefined && setCardOpen) {
      setCardOpen(cardState.open);
    }
  }, [cardState.open, setCardOpen]);
  
  React.useEffect(() => {
    if (cardState.matched !== undefined && setMatched) {
      setMatched(cardState.matched);
    }
  }, [cardState.matched, setMatched]);
  
  React.useEffect(() => {
    if (isGameStarted !== undefined && setGameStarted) {
      setGameStarted(isGameStarted);
    }
  }, [isGameStarted, setGameStarted]);
  
  // Chỉ khởi tạo state ban đầu từ Rive một lần duy nhất
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    if (!initialized && cardValue !== undefined && cardOpen !== undefined && 
        cardState.value === undefined && cardState.open === undefined) {
      if (onValueChange && onOpenChange) {
        onValueChange(cardIndex, cardValue || 0);
        onOpenChange(cardIndex, cardOpen || false);
        setInitialized(true)
      }
    }
  }, [cardValue, cardOpen, cardState.value, cardState.open, cardIndex, onValueChange, onOpenChange, initialized]);

  // Handle value changes - chỉ cập nhật external state (single source of truth)
  const handleValueChange = React.useCallback((newValue) => {
    if (onValueChange) {
      onValueChange(cardIndex, newValue);
    }
  }, [cardIndex, onValueChange]);

  const handleOpenChange = React.useCallback((newOpen) => {
    if (onOpenChange) {
      onOpenChange(cardIndex, newOpen);
    }
  }, [cardIndex, onOpenChange]);
  
  // Tắt hoàn toàn tương tác trực tiếp với Rive - chỉ điều khiển qua React state
  React.useEffect(() => {
    if (mode === 'display' && rive && rive.canvas) {
      // Tắt pointer events để ngăn user click trực tiếp vào Rive
      rive.canvas.style.pointerEvents = 'none';
      
      return () => {
        // Cleanup: khôi phục pointer events nếu cần
        if (rive.canvas) {
          rive.canvas.style.pointerEvents = 'auto';
        }
      };
    }
  }, [mode, rive]);

  if (mode === 'control') {
    return (
      <div className={`flex items-center gap-1 p-1 rounded text-xs`}>
        <span className="font-medium w-8">C{cardIndex + 1}:</span>
        <input
          type="number"
          value={cardState.value || 0}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          className="w-8 p-0.5 border border-gray-300 rounded text-xs"
        />
        <input
          type="checkbox"
          checked={cardState.open}
          onChange={(e) => handleOpenChange(e.target.checked)}
          className="w-3 h-3"
        />
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center relative cursor-pointer overflow-hidden rounded-lg`}
      style={{ 
        width: '100%',
        height: '100%'
      }}
      onClick={() => {
        // Ngăn click khi game chưa bắt đầu
        if (!isGameStarted) return;
        
        // Ngăn click vào thẻ đã matched
        if (cardState.matched) return;
        
        // Chỉ cho phép thay đổi open state qua React logic
        const currentOpen = cardState.open;
        handleOpenChange(!currentOpen);
      }}
    >
      {RiveComponent && (
        <RiveComponent 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'block',
            objectFit: 'contain'
          }} 
        />
      )}
      {/* Overlay để bắt click events */}
      <div 
        className="absolute inset-0 z-10"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
});

DynamicCard.displayName = 'DynamicCard';

const TestMatch2Page = () => {
  // Sử dụng custom hook để quản lý toàn bộ logic game
  const {
    // Game configuration
    rows,
    cols,
    setRows,
    setCols,
    totalCards,
    cardIndices,
    
    // Random value configuration
    minValue,
    maxValue,
    setMinValue,
    setMaxValue,
    
    // Game state
    cardStates,
    isGameStarted,
    isGameWon,   
    twoCardOpen,
    
    // Card handlers
    handleCardValueChange,
    handleCardOpenChange,
    
    // Game control
    generateRandomPairs,
    toggleGameState,
    
    // Quick actions
    setSequentialValues,
    openAllCards,
    closeAllCards,
    resetAllValues,
    
    // Debug
    copyDebugData,
    
    // Auto-pause function
    resetAutoPauseTimer
  } = useMatch2Game(2, 2);

  
  // Handle pointer enter để reset auto-pause timer
  const handlePointerEnter = useCallback(() => {
    if (isGameStarted) {
      resetAutoPauseTimer();
    }
  }, [isGameStarted, resetAutoPauseTimer]);

  return (
    <div className="min-h-screen">
      {/* Main container div */}
       <div className="flex flex-col gap-4 w-full p-4">


         {/* Match-2 Game Container - Optimized Responsive Design */}
          <div 
            className="w-full py-20 bg-gray-100 flex flex-col items-center relative overflow-hidden"
            onPointerEnter={handlePointerEnter}
          >
           {/* Rive Background với isGameWon */}
           <Match2Background isGameWon={isGameWon} />
           
           {/* Content Layer */}
           <div className="relative z-10 w-full flex flex-col items-center">
            
             <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
               <div 
                 className="grid gap-1"
                 style={{ 
                   gridTemplateColumns: `repeat(${cols}, 1fr)`,
                   gridTemplateRows: `repeat(${rows}, 1fr)`,
                   width: `${120 * cols + 4 * (cols - 1)}px`,
                   height: `${160 * rows + 4 * (rows - 1)}px`,
                   maxWidth: '90vw',
                   maxHeight: '80vh'
                 }}
               >
                 {cardIndices.map((cardIndex) => (
                   <DynamicCard
                     key={cardIndex}
                     cardIndex={cardIndex}
                     onValueChange={handleCardValueChange}
                     onOpenChange={handleCardOpenChange}
                     cardState={cardStates[cardIndex] || {}}
                     isGameStarted={isGameStarted}
                     cardStates={cardStates}
                   />
                 ))}
               </div>
             </div>
           </div>
           
           {/* Rive Foreground với isGameWon và gameStarted */}
           <Match2Foreground isGameWon={isGameWon} gameStarted={isGameStarted} />
           </div>
        
        {/* Control Panel - Dynamic */}
         <div className="w-full border-2 border-blue-500 rounded-lg bg-blue-50">
           {/* Sticky Header */}
           <div className="sticky top-0 bg-blue-100 border-b border-blue-300 p-2 z-10">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-sm font-bold">Control Panel ({totalCards} Cards)</h3>
               <button
                 onClick={toggleGameState}
                 className={`px-4 py-1 text-white text-sm rounded font-medium ${
                   isGameStarted 
                     ? 'bg-red-500 hover:bg-red-600' 
                     : 'bg-green-500 hover:bg-green-600'
                 }`}
               >
                 {isGameStarted ? 'Pause' : 'Reset'}
               </button>
             </div>
             {/* Grid Configuration */}
             <div className="flex items-center gap-4 text-xs flex-wrap">
               <div className="flex items-center gap-2">
                 <label className="font-medium">Rows:</label>
                 <input
                   type="number"
                   min="1"
                   max="6"
                   value={rows}
                   onChange={(e) => setRows(Number(e.target.value))}
                   className="w-12 p-1 border border-gray-300 rounded"
                 />
               </div>
               <div className="flex items-center gap-2">
                 <label className="font-medium">Cols:</label>
                 <input
                   type="number"
                   min="1"
                   max="6"
                   value={cols}
                   onChange={(e) => setCols(Number(e.target.value))}
                   className="w-12 p-1 border border-gray-300 rounded"
                 />
               </div>
               <div className="flex items-center gap-2">
                 <label className="font-medium">Min:</label>
                 <input
                   type="number"
                   min="1"
                   max="100"
                   value={minValue}
                   onChange={(e) => {
                     const newMin = Number(e.target.value);
                     if (newMin <= maxValue) {
                       setMinValue(newMin);
                     }
                   }}
                   className="w-12 p-1 border border-gray-300 rounded"
                 />
               </div>
               <div className="flex items-center gap-2">
                 <label className="font-medium">Max:</label>
                 <input
                   type="number"
                   min="1"
                   max="100"
                   value={maxValue}
                   onChange={(e) => {
                     const newMax = Number(e.target.value);
                     if (newMax >= minValue) {
                       setMaxValue(newMax);
                     }
                   }}
                   className="w-12 p-1 border border-gray-300 rounded"
                 />
               </div>
               <div className="text-gray-600">
                 Total Cards: {totalCards} | Range: {minValue}-{maxValue}
               </div>
             </div>
           </div>
           
           {/* Content */}
           <div className="p-2">
           
           {/* Individual Card Controls - Dynamic Grid */}
           <div className="w-full max-w-6xl mx-auto flex items-center justify-center mb-3">
             <div 
               className="grid gap-2"
               style={{ 
                 gridTemplateColumns: `repeat(${cols}, 1fr)`,
                 gridTemplateRows: `repeat(${rows}, 1fr)`,
                 width: `${120 * cols + 8 * (cols - 1)}px`,
                 height: `${50 * rows + 8 * (rows - 1)}px`,
                 maxWidth: '90vw'
               }}
             >
             {cardIndices.map((cardIndex) => (
                 <DynamicCard
                   key={`control-${cardIndex}`}
                   cardIndex={cardIndex}
                   onValueChange={handleCardValueChange}
                   onOpenChange={handleCardOpenChange}
                   mode="control"
                   cardState={cardStates[cardIndex] || {}}
                 />
               ))}
             </div>
           </div>
         </div>
         </div>
         
         {/* Quick Actions */}
         <div className="w-full border-2 border-green-500 rounded-lg p-2 bg-green-50">
           <h3 className="text-sm font-bold mb-2">Quick Actions</h3>
           <div className="flex flex-wrap gap-2">
             <button
               onClick={setSequentialValues}
               className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
             >
               Set Sequential Values
             </button>
             <button
               onClick={generateRandomPairs}
               className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
             >
               Random Pairs
             </button>
             <button
               onClick={openAllCards}
               className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
             >
               Open All
             </button>
             <button
               onClick={closeAllCards}
               className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
             >
               Close All
             </button>
             <button
               onClick={resetAllValues}
               className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
             >
               Reset Values
             </button>
           </div>
           
           {/* Debug Info */}
           <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
             <div className="flex items-center justify-between mb-1">
               <div className="font-medium">Debug - Game Status:</div>
               <button
                 onClick={copyDebugData}
                 className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
               >
                 Copy
               </button>
             </div>
             <div className="text-gray-600 mb-2">
               <div className="flex items-center gap-4 flex-wrap">
                 <span>Two-Card Open: <span className={`font-bold ${twoCardOpen ? 'text-green-600' : 'text-red-600'}`}>{twoCardOpen ? 'TRUE' : 'FALSE'}</span></span>
                 <span>Game Started: <span className={`font-bold ${isGameStarted ? 'text-green-600' : 'text-red-600'}`}>{isGameStarted ? 'TRUE' : 'FALSE'}</span></span>
                 <span>Game Won: <span className={`font-bold ${isGameWon ? 'text-green-600' : 'text-red-600'}`}>{isGameWon ? 'TRUE' : 'FALSE'}</span></span>
                 <span>Game Started (Rive): <span className={`font-bold ${isGameStarted ? 'text-green-600' : 'text-red-600'}`}>{isGameStarted ? 'TRUE' : 'FALSE'}</span></span>
                 <span>Matched Cards: <span className="font-bold text-blue-600">{Object.values(cardStates).filter(state => state.matched).length}</span></span>
                 <span>Total Pairs: <span className="font-bold text-purple-600">{Math.floor(totalCards / 2)}</span></span>
               </div>
             </div>
             <div className="font-medium mb-1">Debug - Card States (Checkbox Display):</div>
             <div className="text-gray-600 font-mono text-xs">
               <div className="space-y-1">
                 {Object.entries(cardStates).map(([key, state]) => (
                   <div key={key} className="flex items-center gap-2">
                     <span className="text-gray-500">Card {key}:</span>
                     <span>value: {state.value || 0},</span>
                     <span>open: <span className={state.open ? 'text-green-600' : 'text-red-600'}>{state.open ? 'true' : 'false'}</span>,</span>
                     <span>matched: <span className={state.matched ? 'text-blue-600' : 'text-gray-400'}>{state.matched ? 'true' : 'false'}</span>,</span>
                     <span>gameStarted: <span className={isGameStarted ? 'text-green-600' : 'text-red-600'}>{isGameStarted ? 'true' : 'false'}</span></span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default TestMatch2Page;

// Foreground Rive Component
const Match2Foreground = React.memo(({ isGameWon, gameStarted }) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/match_2_fg.riv',
    stateMachines: ['State Machine 1'],
    layout: new Layout({
      fit:Fit.Layout,
    }),
    autoplay: true,
    // fit: 'cover',
    onLoad: () => console.log('Match 2 Foreground Rive loaded'),
  });

  // Kết nối với viewmodel "gameFG"
  const gameFGViewModel = useViewModel(rive, { name: 'gameFG' });
  const gameFGInstance = useViewModelInstance(gameFGViewModel, { useNew: true, rive });
  
  // Truyền isGameWon và gameStarted vào Rive
  const { setValue: setGameWon } = useViewModelInstanceBoolean('isGameWon', gameFGInstance);
  const { setValue: setGameStarted } = useViewModelInstanceBoolean('gameStarted', gameFGInstance);
  
  // Đồng bộ isGameWon từ React state vào Rive
  React.useEffect(() => {
    if (isGameWon !== undefined && setGameWon) {
      setGameWon(isGameWon);
    }
  }, [isGameWon, setGameWon]);
  
  // Đồng bộ gameStarted từ React state vào Rive
  React.useEffect(() => {
    if (gameStarted !== undefined && setGameStarted) {
      setGameStarted(gameStarted);
    }
  }, [gameStarted, setGameStarted]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg pointer-events-none z-20" style={{ left: 0, right: 0, top: 0, bottom: 0 }}>
      {RiveComponent && (
        <RiveComponent 
          
        />
      )}
    </div>
  );
});

Match2Foreground.displayName = 'Match2Foreground';