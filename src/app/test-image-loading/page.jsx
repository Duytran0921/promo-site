'use client';
import React from 'react';
import SimpleMatch2Game from '../test-match2/components/SimpleMatch2Game';
import { testImageConfig } from '../test-match2/configs/gameConfig';

const TestImageLoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Test Image Loading in Rive
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Test Config: {testImageConfig.name}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div>Grid: {testImageConfig.rows}x{testImageConfig.cols}</div>
            <div>Values: {testImageConfig.minValue}-{testImageConfig.maxValue}</div>
            <div>Label On: {testImageConfig.labelOn ? 'Yes' : 'No'}</div>
            <div>Value Image On: {testImageConfig.valueImgOn ? 'Yes' : 'No'}</div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <SimpleMatch2Game 
              customConfig={testImageConfig}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Testing Instructions:
          </h3>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>Check browser console for image loading logs</li>
            <li>Look for "🎯 DynamicCard loading valueImg" messages</li>
            <li>Look for "✅ DynamicCard successfully set valueImg" messages</li>
            <li>Check for any "❌ Failed to load" error messages</li>
            <li>Verify that images appear on the cards when flipped</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestImageLoadingPage;