'use client';
import React from 'react';
import { 
  useRive, 
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceString,
  useViewModelInstanceNumber,
  useViewModelInstanceBoolean,
  useViewModelInstanceColor,
  useViewModelInstanceTrigger,
} from '@rive-app/react-webgl2';
import { useMatch2Game } from './useMatch2Game';

// Dynamic Card Component
const DynamicCard = React.memo(({ cardIndex, onValueChange, onOpenChange, mode = 'display', cardState = {}, isGameStarted = false, cardStates = {} }) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/match_2_card.riv',
    stateMachines: ['State Machine 1'],
    autoplay: true,
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

  const borderColors = [
    'border-purple-300', 'border-green-300', 'border-yellow-300', 'border-pink-300',
    'border-blue-300', 'border-red-300', 'border-indigo-300', 'border-orange-300',
    'border-teal-300', 'border-cyan-300', 'border-lime-300', 'border-rose-300'
  ];
  
  const bgColors = [
    'bg-purple-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50',
    'bg-blue-50', 'bg-red-50', 'bg-indigo-50', 'bg-orange-50',
    'bg-teal-50', 'bg-cyan-50', 'bg-lime-50', 'bg-rose-50'
  ];

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
      <div className={`flex items-center gap-1 p-1 ${bgColors[cardIndex % bgColors.length]} rounded text-xs`}>
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
      className={`border ${borderColors[cardIndex % borderColors.length]} rounded flex items-center justify-center bg-white relative cursor-pointer`}
      style={{ width: '153px', height: '226px' }}
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
            width: '153px', 
            height: '226px', 
            display: 'block' 
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
    
    // Game state
    cardStates,
    isGameStarted,
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
    copyDebugData
  } = useMatch2Game(2, 2);


  return (
    <div className="min-h-screen">
      {/* Main container div */}
       <div className="flex flex-col gap-4 w-full p-4">


         {/* Match-2 Game Container - Dynamic Layout */}
          <div 
            className="w-full border-2 border-red-500 rounded-lg p-3 bg-gray-100 flex flex-col items-center"
          >
           <h3 className="text-base font-bold mb-2 text-center">Match-2 Game ({rows}x{cols})</h3>
           <div 
             className="grid gap-2"
             style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
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
             <div className="flex items-center gap-4 text-xs">
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
               <div className="text-gray-600">
                 Total Cards: {totalCards}
               </div>
             </div>
           </div>
           
           {/* Content */}
           <div className="p-2">
           
           {/* Individual Card Controls - Dynamic Grid */}
           <div 
             className="grid gap-2 mb-3"
             style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
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