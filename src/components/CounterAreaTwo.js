"use client"
import React from "react";
import TrackVisibility from "react-on-screen";
import CountUp from "react-countup";
const CounterAreaTwo = () => {
  return (
    <>
      {/*================= counter area start {/*=================*/}
      <div
        className='relative bg-blue-500 bg-cover pt-6 pb-6 bg-[url("/assets/img/bg/6.png")] flex items-center'
      >
        <div className='container mx-auto px-4 w-full'>
          <div className='text-center mb-12'>
            <h2 className='text-xl md:text-xl font-bold text-white mb-4'>
              Từ 2024 <span className='text-white bg-blue-800 p-2 m-2 rounded-sm'> GAMIFIED PROMOTION PLATFORM </span> đã tạo ra
            </h2>
          </div>
          <div className='flex flex-wrap translate-x-[6%] -mx-4 w-full'>
            <div
              className='w-full lg:w-1/3 md:w-1/2 px-4'
              data-aos='fade-up'
              data-aos-delay='100'
              data-aos-duration='1500'
            >
              <div className='flex items-center'>
               
                <div className='flex-1'>
                  <h4 className='mb-1 text-4xl font-bold text-white'>
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className='counter'>
                            <CountUp delay={0.5} start={0} end={30} duration={3} /> +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h4>
                  <p className='mb-0 text-white'>Chiến Dịch Online/Offline</p>
                </div>
              </div>
            </div>
            <div
              className='w-full lg:w-1/3 md:w-1/2 px-4'
              data-aos='fade-up'
              data-aos-delay='150'
              data-aos-duration='1500'
            >
              <div className='flex items-center'>
                
                <div className='flex-1'>
                  <h4 className='mb-1 text-4xl font-bold text-white'>
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className='counter'>
                            <CountUp delay={0.5} start={0} end={100.000} /> k+
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h4>
                  <p className='mb-0 text-white'>Người Chơi</p> 
                </div>
              </div>
            </div>
            <div
              className='w-full lg:w-1/3 md:w-1/2 px-4'
              data-aos='fade-up'
              data-aos-delay='200'
              data-aos-duration='1500'
            >
              <div className='flex items-center'>
              
                <div className='flex-1'>
                  <h4 className='mb-1 text-4xl font-bold text-white'>
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className='counter'>
                            <CountUp delay={0.5} start={0} end={200000} /> +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h4>
                  <p className='mb-0 text-white'>Lượt Chơi</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
   

      {/*{/*================= counter area end {/*=================*/}
    </>
  );
};

export default CounterAreaTwo;
