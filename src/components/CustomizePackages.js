import React from "react";

const CustomizePackages = () => {
  return (
    <div
      className="relative w-full h-[400px] flex items-start justify-center text-center bg-[url('/assets/img/bg/CustomPackages.png')] bg-contain bg-center"
    >
      <div className="absolute inset-0"></div>
      <div className="relative z-10 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-2">
          <span className= "text-2xl text-yellow-400 "> CUSTOMIZE </span> PACKAGE DÀNH CHO AI</h2>
        <p className="text-base font-medium md:text-base text-blue-900 max-w-5xl mx-auto">
        Nếu mục tiêu của doanh nghiệp là trải nghiệm game hoá được "đo ni đóng giày", không trùng lặp – thì Customize là lựa chọn phù hợp nhất.</p>
      </div>
    </div>
  );
};

export default CustomizePackages;
