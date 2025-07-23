'use client'
import React, { useEffect, useState } from 'react';
import { useRive } from '@rive-app/react-webgl2';

const NavBarSimpleTest = () => {
  const [riveState, setRiveState] = useState('loading');
  const [error, setError] = useState(null);

  const { rive, RiveComponent } = useRive({
    src: '/assets/animation/navbar.riv',
    stateMachines: ['State Machine 1'],
    autoplay: true,
    onLoad: () => {
      console.log('✅ Rive loaded successfully');
      setRiveState('loaded');
    },
    onLoadError: (error) => {
      console.error('❌ Rive load error:', error);
      setError(error);
      setRiveState('error');
    },
  });

  useEffect(() => {
    console.log('🔄 Rive state changed:', riveState);
    console.log('📦 Rive instance:', rive);
    
    if (rive) {
      console.log('📋 Artboard names:', rive.artboardNames);
      console.log('🎮 State machine names:', rive.stateMachineNames);
      console.log('📊 View model names:', rive.viewModelNames);
      
      if (rive.stateMachines && rive.stateMachines.length > 0) {
        const sm = rive.stateMachines[0];
        console.log('⚙️ State machine inputs:', sm.inputNames);
        console.log('🎯 State machine states:', sm.stateNames);
      }
    }
  }, [rive, riveState]);

  if (error) {
    return (
      <div className="w-full h-20 border-2 border-red-500 bg-red-100 p-4">
        <h3 className="text-red-600 font-bold">Rive Load Error:</h3>
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-20 border-2 border-blue-500 bg-blue-100 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-blue-600 font-bold">NavBar Test</h3>
          <p className="text-blue-500">Status: {riveState}</p>
        </div>
        <div className="w-32 h-16 border border-gray-300">
          <RiveComponent 
            style={{ width: '100%', height: '100%', display: 'block' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default NavBarSimpleTest; 