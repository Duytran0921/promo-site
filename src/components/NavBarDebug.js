'use client'
import React, { useEffect } from 'react';
import { 
  useRive, 
  EventType,
  RiveEventType
} from '@rive-app/react-webgl2';

const NavBarDebug = () => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/navbar.riv',
    stateMachines: ['State Machine 1'],
    autoplay: true,
    onLoad: () => {
      console.log('=== NAVBAR DEBUG START ===');
      console.log('Rive loaded successfully');
    },
  });

  // Debug Rive instance sau khi đã load
  useEffect(() => {
    if (!rive) {
      console.log('Rive instance is null, waiting for load...');
      return;
    }

    console.log('=== NAVBAR DEBUG START ===');
    console.log('Rive instance:', rive);
    
    // Log artboards
    console.log('Artboards:', rive.artboardNames);
    console.log('Default artboard:', rive.defaultArtboard);
    
    // Log state machines
    console.log('State machines:', rive.stateMachineNames);
    if (rive.stateMachines && rive.stateMachines.length > 0) {
      const sm = rive.stateMachines[0];
      console.log('State machine inputs:', sm.inputNames);
      console.log('State machine states:', sm.stateNames);
    }
    
    // Log view models
    console.log('View models:', rive.viewModelNames);
    
    // Setup event listeners
    rive.on(EventType.RiveEvent, (event) => {
      console.log('=== RIVE EVENT ===');
      console.log('Event data:', event.data);
      console.log('Event type:', event.data.type);
      console.log('Event name:', event.data.name);
      console.log('Event properties:', event.data.properties);
    });
    
    rive.on(EventType.StateChange, (event) => {
      console.log('=== STATE CHANGE ===');
      console.log('State change:', event);
    });
    
    rive.on(EventType.Play, () => {
      console.log('=== PLAY EVENT ===');
    });
    
    rive.on(EventType.Pause, () => {
      console.log('=== PAUSE EVENT ===');
    });
    
    rive.on(EventType.Stop, () => {
      console.log('=== STOP EVENT ===');
    });
    
    rive.on(EventType.Loop, () => {
      console.log('=== LOOP EVENT ===');
    });

    // Test click events
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', (e) => {
        console.log('=== CANVAS CLICK ===');
        console.log('Click position:', { x: e.clientX, y: e.clientY });
        console.log('Canvas rect:', canvas.getBoundingClientRect());
      });
    }
    
    console.log('=== NAVBAR DEBUG END ===');
  }, [rive]);

  return (
    <div className="w-full h-20 border-2 border-red-500">
      <RiveComponent 
        style={{ width: '100%', height: '100%', display: 'block' }} 
      />
    </div>
  );
};

export default NavBarDebug; 