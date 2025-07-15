'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import BasicInfoForm from './BasicInfoForm';

const PricingAreaTwo = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      {/* Pricing Area Two start */}
      <div className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-sm font-semibold text-blue-600 uppercase mb-2">Pricing plan</h6>
            <h2 className="text-3xl font-bold mb-6">
              Best plane to get our <span className="text-blue-600">Services</span>
            </h2>
          </div>
          <div className="flex flex-wrap -mx-4 items-end">
            {/* Started Plan */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex">
              <div className="bg-gradient-to-b from-green-200/80 via-green-200/50 to-transparent rounded-3xl shadow-lg p-8 flex flex-col h-80 w-full">
                <div className="text-center mb-6">
                  <h5 className="text-xl font-semibold mb-4">Basic</h5>
                  <button
                    className="w-full mb-3 border border-gray-300 rounded-none py-2 px-4 font-semibold hover:bg-gray-100 transition"
                    onClick={openForm}
                  >
                    Liên hệ
                  </button>
                </div>
                <ul className="mb-0">
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Mở rộng dịch vụ
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Branding &amp; Identity
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Email Marketing &amp; Automation
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    E-commerce Solutions
                  </li>
                  <li className="hidden">
                    <FaCheck className="text-green-500 mr-2" />
                    Social Media Management
                  </li>
                  <li className="hidden">
                    <FaCheck className="text-green-500 mr-2" />
                    Video &amp; Animation Production{' '}
                  </li>
                </ul>
              </div>
            </div>
            {/* Professional Plan */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex">
              <div className="bg-gradient-to-b from-blue-200/80 via-blue-200/50 to-transparent rounded-3xl shadow-lg p-8 flex flex-col h-96 w-full">
                <div className="text-center mb-6">
                  <h5 className="text-xl font-semibold mb-4">Professional</h5>
                  <button
                    className="w-full mb-3 border border-gray-300 rounded-none py-2 px-4 font-semibold hover:bg-gray-100 transition"
                    onClick={openForm}
                  >
                    Liên hệ
                  </button>
                </div>
                <ul className="mb-0">
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Mobile App Development
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Branding &amp; Identity
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Email Marketing &amp; Automation
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    E-commerce Solutions
                  </li>
                  <li className="hidden">
                    <FaCheck className="text-green-500 mr-2" />
                    Social Media Management
                  </li>
                  <li className="hidden">
                    <FaCheck className="text-green-500 mr-2" />
                    Video &amp; Animation Production{' '}
                  </li>
                </ul>
              </div>
            </div>
            {/* Enterprise Plan */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 flex">
              <div className="bg-gradient-to-b from-orange-200/80 via-orange-200/50 to-transparent rounded-3xl shadow-lg p-8 flex flex-col h-[28rem] w-full">
                <div className="text-center mb-6">
                  <h5 className="text-xl font-semibold mb-4">Enterprise</h5>
                  <button
                    className="w-full mb-3 border border-gray-300 rounded-none py-2 px-4 font-semibold hover:bg-gray-100 transition"
                    onClick={openForm}
                  >
                    Liên hệ
                  </button>
                </div>
                <ul className="mb-0">
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Mobile App Development
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Branding &amp; Identity
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    Email Marketing &amp; Automation
                  </li>
                  <li className="flex items-center mb-3 last:mb-0">
                    <FaCheck className="text-green-500 mr-2" />
                    E-commerce Solutions
                  </li>
                  <li className="hidden">
                    <FaCheck className="text-green-500 mr-2" />
                    Social Media Management
                  </li>
                  <li className="hidden">
                    <FaCheck className="text-green-500 mr-2" />
                    Video &amp; Animation Production{' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BasicInfoForm isOpen={isFormOpen} onClose={closeForm} />
      {/* Pricing Area Two end */}
    </>
  );
};

export default PricingAreaTwo;
