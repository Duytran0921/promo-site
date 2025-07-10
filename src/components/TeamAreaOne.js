import React from 'react';

const TeamAreaOne = () => {
  return (
    <>
      {/*====================== team area start ======================*/}
      <div className="relative py-20 px-4 bg-[url('/assets/img/banner/3.jpg')]  bg-center bg-cover shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h6 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Why Us ?</h6>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Trust is earned through <span className="text-blue-600">caution and care</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-blue-200/20 backdrop-blur-sm border border-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center h-80 w-full max-w-sm flex flex-col justify-center">
                <h5 className="text-xl font-bold text-gray-900 mb-4">Your Reputation Comes First</h5>
                <p className="text-gray-800 leading-relaxed">
                  Every campaign goes through strict checks 
                  to ensure your brand shows up exactly as intended — polished, 
                  trustworthy, and on point.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-blue-200/20 backdrop-blur-sm border border-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center h-80 w-full max-w-sm flex flex-col justify-center">
                <h5 className="text-xl font-bold text-gray-900 mb-4">Your Data Is Treated Like an Asset</h5>
                <p className="text-gray-800 leading-relaxed">
                  Anti-cheat systems, access control, and strict privacy protocols.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-blue-200/20 backdrop-blur-sm border border-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center h-80 w-full max-w-sm flex flex-col justify-center">
                <h5 className="text-xl font-bold text-gray-900 mb-4">Transparent Operations</h5>
                <p className="text-gray-00 leading-relaxed">
                  Real-time reporting, clear metrics, and full visibility into campaign performance and results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== team area end ======================*/}
    </>
  );
};

export default TeamAreaOne;
