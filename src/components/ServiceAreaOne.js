'use client'
import React, { useState } from "react";
import { FaPlus, FaEnvelope } from "react-icons/fa";
import serviceList from "../scripts/serviceList";
import Link from "next/link";
import BasicInfoForm from "./BasicInfoForm";

const ServiceAreaOne = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };
  
  return (
    <>
      {/*=================== service area start ===================*/}
      <div className='relative pt-24 pb-16 bg-gray-50'>
        <img
          className='absolute bottom-0 left-0 animate-bounce opacity-20'
          src='assets/img/icon/4.png'
          alt='img'
        />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            {/* <h6 className='text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2'>CREATIVE SERVICES</h6> */}
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
              Flexible - Strategic - Ready to scale
            </h2>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {serviceList.slice(0, 3).map((data, index) => (
              <div key={index} className='group'>
                <div className='bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center h-full'>
                  <div className='mb-6'>
                    <img 
                      src={data.img} 
                      alt='img' 
                      className='w-16 h-16 mx-auto object-contain'
                    />
                  </div>
                  <div className='space-y-4'>
                    <h5 className='text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300'>
                      <Link href='/service-details' className='hover:underline'>
                        {data.title}
                      </Link>
                    </h5>
                    <p className='text-gray-600 leading-relaxed'>
                      {data.des}
                    </p>
                    {/* <Link className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium' href='/service-details'>
                      Touch More <FaPlus className='text-sm' />
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact Button */}
          <div className='text-center mt-12'>
            <button 
              onClick={openForm}
              className='inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300'
            >
              <FaEnvelope className='text-lg' />
              Liên hệ với chúng tôi
            </button>
          </div>
        </div>
      </div>
      
      {/* Basic Info Form Modal */}
      <BasicInfoForm isOpen={isFormOpen} onClose={closeForm} />
      {/* =================== service area end ===================*/}
    </>
  );
};

export default ServiceAreaOne;
