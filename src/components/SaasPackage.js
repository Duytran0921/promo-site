import React from "react";

const SaasPackage = () => {
  return (
    <div
      className="relative w-full h-[400px] flex items-start justify-center text-center bg-[url('/assets/img/bg/SaaSpackage.png')] bg-contain bg-center"
    >
      <div className="absolute inset-0"></div>
      <div className="relative z-10 pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-2">
          <span className= "text-2xl text-blue-500 "> SAAS </span> PACKAGE DÀNH CHO AI</h2>
        <p className="text-base font-medium md:text-base text-blue-900 max-w-5xl mx-auto">
        SaaS Package phù hợp với các doanh nghiệp và tổ chức mong muốn phát triển thêm dịch vụ gamification dưới thương hiệu riêng,
        đồng thời tiết kiệm thời gian và chi phí phát triển. Phù hợp cho các đơn vị Agency, công ty công nghệ, đơn vị triển khai MiniApp/CDP….</p>
      </div>
    </div>
  );
};

export default SaasPackage;
