import React from 'react';

const TestMatch2Page = () => {
  return (
    <div className="min-h-screen">
      {/* Main container div */}
      <div className="flex flex-col gap-4 w-full p-4  ">
        {/* rive div - 500px height */}
        <div 
          className="w-full border-2 border-red-500 rounded-lg"
          style={{ height: '500px' }}
        >
          {/* Empty div */}
        </div>
        
        {/* control panel div - 500px height */}
        <div 
          className="w-full border-2 border-blue-500 rounded-lg"
          style={{ height: '500px' }}
        >
          {/* Empty div */}
        </div>
      </div>
    </div>
  );
};

export default TestMatch2Page; 