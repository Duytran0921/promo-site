import React from "react";

const FaqAreaOne = () => {
  return (
    <>
      {/*==================== Faq area start ====================*/}
      <div className='faq-area faq-area-margin-top bg-cover pt-[90px] pb-[50px]'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap mb-8'>
            <div
              className='w-full lg:w-1/2 xl:w-7/12 h-[200px] bg-white/20 backdrop-blur-sm rounded-lg p-2'
            >
              <div className='section-title mb-0 mt-4 lg:mt-0'>
                <h6 className='sub-title'>Highlight Platform</h6> 
                <h2 className='title p-0'>
                  <span>Gamified Promotion</span> Platform
                </h2>
                <p className='content p-0'>
                B2B-ready platform designed for CDPs, MiniApp providers, and marketing agencies to launch gamified marketing campaigns at scale
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap relative overflow-hidden h-[600px] rounded-lg shadow-xl'>
            <video
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1
              }}
              src='assets/video/Demo 1.mp4'
              autoPlay
              muted
              loop
            />
          </div>
        </div>
      </div>
      {/* ==================== Faq area end ====================*/}
    </>
  );
};

export default FaqAreaOne;
