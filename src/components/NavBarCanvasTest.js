'use client'
import React, { useEffect, useRef } from 'react';
import { Rive, EventType, RiveEventType } from '@rive-app/canvas';

const NavBarCanvasTest = () => {
  const canvasRef = useRef(null);
  const riveRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log('🎨 Starting Rive Canvas Test...');
    
    try {
      const rive = new Rive({
        src: '/assets/animation/navbar.riv',
        canvas: canvasRef.current,
        stateMachines: ['State Machine 1'],
        autoplay: true,
        onLoad: () => {
          console.log('✅ Rive Canvas loaded successfully');
          riveRef.current = rive;
          
          // Log all available information
          console.log('📋 Artboard names:', rive.artboardNames);
          console.log('🎮 State machine names:', rive.stateMachineNames);
          console.log('📊 View model names:', rive.viewModelNames);
          
          if (rive.stateMachines && rive.stateMachines.length > 0) {
            const sm = rive.stateMachines[0];
            console.log('⚙️ State machine inputs:', sm.inputNames);
            console.log('🎯 State machine states:', sm.stateNames);
          }
          
          // Setup event listeners
          rive.on(EventType.RiveEvent, (event) => {
            console.log('🎯 RIVE EVENT:', event.data);
          });
          
          rive.on(EventType.StateChange, (event) => {
            console.log('🔄 STATE CHANGE:', event);
          });
          
          rive.on(EventType.Play, () => {
            console.log('▶️ PLAY EVENT');
          });
          
          rive.on(EventType.Pause, () => {
            console.log('⏸️ PAUSE EVENT');
          });
          
          rive.on(EventType.Stop, () => {
            console.log('⏹️ STOP EVENT');
          });
          
          rive.on(EventType.Loop, () => {
            console.log('🔁 LOOP EVENT');
          });
          
          // Test click events
          canvasRef.current.addEventListener('click', (e) => {
            console.log('🖱️ CANVAS CLICK:', {
              x: e.clientX,
              y: e.clientY,
              rect: canvasRef.current.getBoundingClientRect()
            });
          });
          
        },
        onLoadError: (error) => {
          console.error('❌ Rive Canvas load error:', error);
        },
      });
      
    } catch (error) {
      console.error('💥 Rive initialization error:', error);
    }
    
    return () => {
      if (riveRef.current) {
        console.log('🧹 Cleaning up Rive instance');
        riveRef.current.cleanup();
      }
    };
  }, []);

  return (
    <div className="w-full h-20 border-2 border-green-500 bg-green-100 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-green-600 font-bold">NavBar Canvas Test</h3>
          <p className="text-green-500">Using direct Rive canvas</p>
        </div>
        <div className="w-32 h-16 border border-gray-300">
          <canvas 
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBarCanvasTest; 