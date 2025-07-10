"use client";
import React from "react";

const CounterAreaOne = () => {
  const imageData = [
    {
      src: "assets/img/icon/5.svg",
      alt: "Feature 1",
      title: "Innovation"
    },
    {
      src: "assets/img/icon/6.svg",
      alt: "Feature 2", 
      title: "Quality"
    },
    {
      src: "assets/img/icon/7.svg",
      alt: "Feature 3",
      title: "Excellence"
    },
    {
      src: "assets/img/icon/8.svg",
      alt: "Feature 4",
      title: "Success"
    },
    {
      src: "assets/img/icon/5.svg",
      alt: "Feature 5",
      title: "Growth"
    },
    {
      src: "assets/img/icon/6.svg",
      alt: "Feature 6",
      title: "Trust"
    },
    {
      src: "assets/img/icon/7.svg",
      alt: "Feature 7",
      title: "Performance"
    },
    {
      src: "assets/img/icon/8.svg",
      alt: "Feature 8",
      title: "Leadership"
    }
  ];

  return (
    <>
      {/* animated images area start */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 px-4 mb-8"
        style={{ backgroundImage: 'url("./assets/img/bg/5.png")' }}
      >
        {/* Overlay for better visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-0 max-w-full">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Our Features
            </h2>
            <p className="text-white text-lg opacity-90 max-w-2xl mx-auto">
              Discover what makes us unique through our innovative solutions
            </p>
          </div>

          {/* Infinite Horizontal Scrolling Container */}
          <div className="relative">
            {/* First Row - Left to Right */}
            <div className="flex animate-scroll-left mb-8" style={{ willChange: 'transform' }}>
              {/* Duplicate items for seamless loop */}
              {[...imageData, ...imageData].map((item, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 mx-4 group"
                >
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-500 transform hover:scale-105 hover:rotate-1 min-w-[260px] max-w-[260px]">
                    {/* Image Container */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                        <img 
                          src={item.src} 
                          alt={item.alt}
                          className="w-8 h-8 filter brightness-0 invert group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-white text-lg font-bold text-center group-hover:text-blue-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - Right to Left */}
            <div className="flex animate-scroll-right" style={{ willChange: 'transform' }}>
              {/* Duplicate items for seamless loop */}
              {[...imageData, ...imageData].map((item, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 mx-4 group"
                >
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 min-w-[260px] max-w-[260px]">
                    {/* Image Container */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500">
                        <img 
                          src={item.src} 
                          alt={item.alt}
                          className="w-8 h-8 filter brightness-0 invert group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-white text-lg font-bold text-center group-hover:text-pink-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom CSS for smooth animations */}
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @keyframes scroll-right {
            0% {
              transform: translate3d(-50%, 0, 0);
            }
            100% {
              transform: translate3d(0, 0, 0);
            }
          }

          .animate-scroll-left {
            animation: scroll-left 30s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
          }

          .animate-scroll-right {
            animation: scroll-right 25s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
          }

          /* Pause animation on hover */
          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }

          /* Additional smoothing */
          .animate-scroll-left,
          .animate-scroll-right {
            transform-style: preserve-3d;
          }
        `}</style>
      </div>
      {/* animated images area end */}
    </>
  );
};

export default CounterAreaOne;
