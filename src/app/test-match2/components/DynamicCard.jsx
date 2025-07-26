'use client';
import React from 'react';
import { 
  useRive, 
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceNumber,
  useViewModelInstanceBoolean,
  useViewModelInstanceImage,
  Layout,
  Fit,
  Alignment,
  decodeImage
} from '@rive-app/react-webgl2';

// Dynamic Card Component
const DynamicCard = React.memo(({ 
  cardIndex, 
  onValueChange, 
  onOpenChange, 
  mode = 'display', 
  cardState = {}, 
  isGameStarted = false, 
  cardStates = {}, 
  pointerEventsEnabled = true,
  twoCardOpenNoMatch = false, // Thêm prop mới
  twoCardOpenAndMatch = false, // Thêm prop mới
  startRestartAnimation = false, // Thêm prop mới cho START/RESTART animation
  label = null, // Thêm prop mới cho image URL
  labelOn = false, // Thêm prop mới cho boolean
  valueImg = null, // Thêm prop mới cho image URL
  valueImgOn = false, // Thêm prop mới cho boolean
  style = {}
}) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/match_2_card.riv',
    stateMachines: ['State Machine 1'],
    autoplay: true,
    // fit: 'contain',
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onLoad: () => console.log(`Match 2 Card Rive ${cardIndex} loaded`),
  });

  const cardViewModel = useViewModel(rive, { name: 'card' });
  const cardInstance = useViewModelInstance(cardViewModel, { useNew: true, rive });
  
  const { value: cardValue, setValue: setCardValue } = useViewModelInstanceNumber('cardValue', cardInstance);
  const { value: cardOpen, setValue: setCardOpen } = useViewModelInstanceBoolean('cardOpen', cardInstance);
  const { value: matched, setValue: setMatched } = useViewModelInstanceBoolean('matched', cardInstance);
  const { value: gameStarted, setValue: setGameStarted } = useViewModelInstanceBoolean('gameStarted', cardInstance);
  
  // Thêm các trạng thái mới cho Rive
  const { setValue: setTwoCardOpenNoMatch } = useViewModelInstanceBoolean('twoCardOpenNoMatch', cardInstance);
  const { setValue: setTwoCardOpenAndMatch } = useViewModelInstanceBoolean('twoCardOpenAndMatch', cardInstance);
  const { setValue: setStartRestartAnimation } = useViewModelInstanceBoolean('startRestartAnimation', cardInstance);
  const { setValue: setLabel } = useViewModelInstanceImage('label', cardInstance);
  const { setValue: setLabelOn } = useViewModelInstanceBoolean('labelOn', cardInstance);
  const { setValue: setValueImg } = useViewModelInstanceImage('valueImg', cardInstance);
  const { setValue: setValueImgOn } = useViewModelInstanceBoolean('valueImgOn', cardInstance);
  
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
  
  // Đồng bộ twoCardOpenNoMatch từ React state vào Rive
  React.useEffect(() => {
    if (twoCardOpenNoMatch !== undefined && setTwoCardOpenNoMatch) {
      setTwoCardOpenNoMatch(twoCardOpenNoMatch);
    }
  }, [twoCardOpenNoMatch, setTwoCardOpenNoMatch]);
  
  // Đồng bộ twoCardOpenAndMatch từ React state vào Rive
  React.useEffect(() => {
    if (twoCardOpenAndMatch !== undefined && setTwoCardOpenAndMatch) {
      setTwoCardOpenAndMatch(twoCardOpenAndMatch);
    }
  }, [twoCardOpenAndMatch, setTwoCardOpenAndMatch]);
  
  // Đồng bộ startRestartAnimation từ React state vào Rive
  React.useEffect(() => {
    if (startRestartAnimation !== undefined && setStartRestartAnimation) {
      setStartRestartAnimation(startRestartAnimation);
    }
  }, [startRestartAnimation, setStartRestartAnimation]);
  
  // Đồng bộ label từ React state vào Rive - chỉ khi labelOn = true
  React.useEffect(() => {
    const loadAndSetLabel = async () => {
      if (label !== null && setLabel && labelOn) {
        try {
          console.log(`🎯 DynamicCard[${cardIndex}] loading label: ${label} (labelOn: ${labelOn})`);
          
          // Fetch image and convert to arrayBuffer
          const response = await fetch(label);
          if (!response.ok) {
            throw new Error(`Failed to fetch label image: ${response.status}`);
          }
          
          const imageBuffer = await response.arrayBuffer();
          
          // Decode the image from the response
          const decodedImage = await decodeImage(new Uint8Array(imageBuffer));
          setLabel(decodedImage);
          
          // Clean up the decoded image
          decodedImage.unref();
          
          console.log(`✅ DynamicCard[${cardIndex}] successfully set label`);
        } catch (error) {
          console.error(`❌ DynamicCard[${cardIndex}] Failed to load label:`, error);
          // Set null on error
          setLabel(null);
        }
      } else if (setLabel && !labelOn) {
        console.log(`🎯 DynamicCard[${cardIndex}] clearing label because labelOn is false`);
        setLabel(null);
      }
    };
    
    loadAndSetLabel();
  }, [label, setLabel, cardIndex, labelOn]);
  
  // Đồng bộ labelOn từ React state vào Rive
  React.useEffect(() => {
    if (labelOn !== undefined && setLabelOn) {
      setLabelOn(labelOn);
    }
  }, [labelOn, setLabelOn]);
  
  // Đồng bộ valueImg từ React state vào Rive - chỉ khi valueImgOn = true
  React.useEffect(() => {
    console.log(`🔍 DynamicCard[${cardIndex}] valueImg effect: valueImg=${valueImg}, valueImgOn=${valueImgOn}`);
    
    const loadAndSetImage = async () => {
      if (valueImg !== null && setValueImg && valueImgOn) {
        try {
          console.log(`🎯 DynamicCard[${cardIndex}] loading valueImg: ${valueImg} (valueImgOn: ${valueImgOn})`);
          
          // Fetch image and convert to arrayBuffer
          const response = await fetch(valueImg);
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
          }
          
          const imageBuffer = await response.arrayBuffer();
          
          // Decode the image from the response
          const decodedImage = await decodeImage(new Uint8Array(imageBuffer));
          setValueImg(decodedImage);
          
          // Clean up the decoded image
          decodedImage.unref();
          
          console.log(`✅ DynamicCard[${cardIndex}] successfully set valueImg`);
        } catch (error) {
          console.error(`❌ DynamicCard[${cardIndex}] Failed to load valueImg:`, error);
          // Set null on error
          setValueImg(null);
        }
      } else if (setValueImg && !valueImgOn) {
        console.log(`🎯 DynamicCard[${cardIndex}] clearing valueImg because valueImgOn is false`);
        setValueImg(null);
      }
    };
    
    loadAndSetImage();
  }, [valueImg, setValueImg, cardIndex, valueImgOn]);
  
  // Đồng bộ valueImgOn từ React state vào Rive
  React.useEffect(() => {
    if (valueImgOn !== undefined && setValueImgOn) {
      setValueImgOn(valueImgOn);
    }
  }, [valueImgOn, setValueImgOn]);
  
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
      <div className={`flex items-center gap-1 rounded text-xs`}>
        <span className="font-medium w-8">C{cardIndex + 1}:</span>
        <input
          type="number"
          value={cardState.value ?? 1}
          onChange={(e) => handleValueChange(Number(e.target.value))}
          className="w-8 p-0.5 border border-gray-300 rounded text-xs"
        />
        <input
          type="checkbox"
          checked={cardState.open ?? false}
          onChange={(e) => handleOpenChange(e.target.checked)}
          className="w-6 h-6"
        />
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center relative overflow-hidden rounded-lg ${
        pointerEventsEnabled ? 'cursor-pointer' : 'pointer-events-none'
      }`}
      style={{ 
        width: '100%',
        height: '100%',
        ...style
      }}
      onClick={() => {
        // Ngăn click khi pointer events bị tắt
        if (!pointerEventsEnabled) return;
        
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
        style={{ pointerEvents: pointerEventsEnabled ? 'auto' : 'none' }}
      />
    </div>
  );
});

DynamicCard.displayName = 'DynamicCard';

export default DynamicCard;