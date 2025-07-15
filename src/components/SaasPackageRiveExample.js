'use client';
import React, { useRef } from 'react';
import SaasPackageRive from './SaasPackageRive';

const SaasPackageRiveExample = () => {
  const riveRef = useRef(null);

  // Example functions to change instances
  const switchToSaaSPackage = () => {
    // Change productCard to SaaS instance
    SaasPackageRive.changeInstance(riveRef, 'productCard', 'SaaS');
  };

  const switchToCustomPackage = () => {
    // Change productCard to Custom instance
    SaasPackageRive.changeInstance(riveRef, 'productCard', 'Custom');
  };

  const switchToYellowButton = () => {
    // Change Button to yellow instance
    SaasPackageRive.changeInstance(riveRef, 'Button', 'yellow');
  };

  const switchToBlueButton = () => {
    // Change Button to blue instance
    SaasPackageRive.changeInstance(riveRef, 'Button', 'blue');
  };

  return (
    <div style={{ position: 'relative' }}>
      <SaasPackageRive 
        ref={riveRef}
        className="example-rive" 
        width="100%" 
        height="600px" 
      />
      
      {/* Control buttons */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1001
      }}>
        <div>
          <h4 style={{ color: 'white', margin: '0 0 5px 0' }}>Package Type:</h4>
          <button onClick={switchToSaaSPackage} style={buttonStyle}>
            SaaS Package
          </button>
          <button onClick={switchToCustomPackage} style={buttonStyle}>
            Custom Package
          </button>
        </div>
        
        <div>
          <h4 style={{ color: 'white', margin: '0 0 5px 0' }}>Button Color:</h4>
          <button onClick={switchToYellowButton} style={buttonStyle}>
            Yellow Button
          </button>
          <button onClick={switchToBlueButton} style={buttonStyle}>
            Blue Button
          </button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  display: 'block',
  width: '120px',
  padding: '8px 12px',
  margin: '2px 0',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

export default SaasPackageRiveExample;