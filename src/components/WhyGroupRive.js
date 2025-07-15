'use client';
import React, { useRef, useEffect } from 'react';

const WhyGroupRive = ({ className = '', width = '100%', height = '600px' }) => {
  const canvasRef = useRef(null);
  const riveInstanceRef = useRef(null);

  useEffect(() => {
    let rive;
    
    const loadRive = async () => {
      try {
        // Dynamically import Rive
        const { Rive } = await import('@rive-app/react-canvas');
        
        if (canvasRef.current) {
          rive = new Rive({
            src: '/assets/animation/whygrp.riv',
            canvas: canvasRef.current,
            autoplay: true,
            stateMachines: 'State Machine 1', // Default state machine name
            fit: 'cover',
            alignment: 'center',
            onLoad: () => {
              rive.resizeDrawingSurfaceToCanvas();
            },
          });
          
          riveInstanceRef.current = rive;
        }
      } catch (error) {
        console.error('Error loading Why Group Rive animation:', error);
      }
    };

    loadRive();

    return () => {
      if (riveInstanceRef.current) {
        riveInstanceRef.current.cleanup();
      }
    };
  }, []);

  return (
    <div className={`why-group-rive-container ${className}`} style={{ width, height }}>
      <canvas 
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default WhyGroupRive;