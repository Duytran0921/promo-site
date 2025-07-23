'use client'
import React, { useState } from 'react';
import BasicInfoForm from './BasicInfoForm';

const BannerTwo = () => {
  const [isOpen, setOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {/* ================== BannerTwo Start ==================*/}
      <div
        className="relative mt-16 bg-cover bg-center bg-no-repeat min-h-[300px] max-h-[600px] h-screen bg-[url('/assets/img/bg/banner2.png')]"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-between py-8">
            {/* Content area - can be expanded later */}
            <div className="">
              {/* <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Chào mừng đến với PromoGame
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  Nền tảng tạo và quản lý minigame hàng đầu cho Zalo Mini-app và Web-app
                </p>
              </div> */}
            </div>
            
            {/* Contact Button - positioned at bottom */}
            <div className="absolute right-[45%] bottom-[-50px] text-center text-white pb-8">
              <div className="">
                <button
                  onClick={openForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Liên Hệ Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <BasicInfoForm isOpen={isFormOpen} onClose={closeForm} />
    </>
  );
};

export default BannerTwo;
