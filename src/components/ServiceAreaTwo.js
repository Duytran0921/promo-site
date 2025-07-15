import Link from 'next/link';
import React from 'react';

const ServiceAreaTwo = () => {
  return (
    <>
      {/*=================== service area start ===================*/}
      <div className="bg-gray-100 relative pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full lg:w-1/2">
              <div className="text-center">
                {/* <h6 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">ADVANCED SERVICES</h6> */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                  <span>Gói Sản Phẩm</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              
                
              </div>
            </div>
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">
                  <img src="assets/img/service/5.png" alt="img" className="w-full h-auto" />
                </div>
                <div className="">
                  <div className="mb-4">
                    <img src="assets/img/service/9.png" alt="img" className="w-12 h-12 mx-auto" />
                  </div>
                  <h5 className="text-xl font-semibold mb-3">
                    <Link href="/service-details" className="text-gray-900 hover:text-blue-600 transition-colors duration-200">CloudCRM</Link>
                  </h5>
                  <p className="text-gray-600 leading-relaxed">SaaS stands for Software as a Service. It is a software</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== service area end ===================*/}
    </>
  );
};

export default ServiceAreaTwo;
