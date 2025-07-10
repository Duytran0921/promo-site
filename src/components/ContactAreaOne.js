import Link from 'next/link';
import React from 'react';

const ContactAreaOne = () => {
  return (
    <>
      {/* ========================= contact Area One start =========================*/}
      <div className="relative mt-16 pt-8 py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 ">
        {/* Background decorative images */}
        <div className="absolute top-10 left-10 animate-bounce opacity-20">
          <img
            className="w-16 h-16 md:w-24 md:h-24"
            src="assets/img/banner/2.png"
            alt="Decorative element"
          />
        </div>
        <div className="absolute top-20 right-10 animate-pulse opacity-20">
          <img
            className="w-20 h-20 md:w-32 md:h-32"
            src="assets/img/about/6.png"
            alt="Decorative element"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative">
            {/* Background Image - Full Width */}
            <div
              className="w-full"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="1500"
            >
              <div className="relative rounded-2xl shadow-2xl">
                <img 
                  className="w-full h-[600px] lg:h-[700px] object-cover" 
                  src="assets/img/bg/4.png" 
                  alt="Contact illustration" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-blue-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Overlapping Contact Form */}
            <div
              className="absolute top-1/2 right-4 lg:right-8 transform -translate-y-1/2 w-full max-w-md lg:max-w-lg z-20"
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="1500"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-gray-100/50">
                {/* Section Header */}
                <div className="mb-8">
                  <h6 className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-3">
                    GET IN TOUCH
                  </h6>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    Bringing Your <span className="text-blue-600 relative">
                      Vision
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-200 rounded"></span>
                    </span> To Life
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Transform your ideas into reality with our expert team. We provide comprehensive solutions tailored to your unique needs and vision.
                  </p>
                </div>

                {/* Contact Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="group">
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:border-blue-300"
                      />
                    </div>
                    
                    {/* Email Input */}
                    <div className="group">
                      <input 
                        type="email" 
                        placeholder="Your Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:border-blue-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone Input */}
                    <div className="group">
                      <input 
                        type="tel" 
                        placeholder="Your Phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:border-blue-300"
                      />
                    </div>
                    
                    {/* Subject Input */}
                    <div className="group">
                      <input 
                        type="text" 
                        placeholder="Your Subject"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:border-blue-300"
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="group">
                    <textarea 
                      placeholder="Your Message"
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 resize-none group-hover:border-blue-300"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Link
                      className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      href="#"
                    >
                      <span>Submit Now</span>
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </Link>
                  </div>
                </form>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      Quick Response
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Secure & Private
                    </div>
               </div>
             </div>
           </div>
         </div>
       </div>
        </div>
      </div>
      {/*========================= contact-inner One end =========================*/}
    </>
  );
};

export default ContactAreaOne;
