import Link from 'next/link';
import React from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const FooterOne = () => {
  return (
    <>
      {/* ================== Footer One Start ==================*/}
      <footer className="bg-black bg-cover">
        {/* Newsletter Section - Currently commented out */}
        <div className="footer-subscribe">
          {/* <div className="max-w-7xl mx-auto px-4">
            <div
              className="bg-cover rounded-lg p-8"
              style={{ backgroundImage: 'url("./assets/img/bg/6.png")' }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-0">
                    Subscribe To Our Newsletter
                  </h2>
                </div>
                <div className="lg:w-1/2 flex items-center justify-end">
                  <input 
                    type="text" 
                    placeholder="Your e-mail address"
                    className="px-4 py-2 rounded-l-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Link 
                    className="bg-black text-white px-6 py-2 rounded-r-md hover:bg-gray-800 transition-colors duration-300" 
                    href="#"
                  >
                    Submit now
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            
            {/* Company Info Section */}
            <div className="space-y-6">
              <div className="mb-6">
                <img 
                  src="assets/img/PromoLogo2.png" 
                  alt="PromoGame Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  356/9 Bạch Đằng, Phường 14 Quận Bình Thạnh, Thành Phố Hồ Chí Minh
                </p>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm flex items-center gap-3">
                    <FaPhoneAlt className="text-blue-400" /> 
                    <span>(+84) 961 347 323</span>
                  </p>
                  <p className="text-gray-300 text-sm flex items-center gap-3">
                    <FaEnvelope className="text-blue-400" /> 
                    <span>info@promogame.com</span>
                  </p>
                </div>
                
                {/* Social Media Links */}
                <div className="flex gap-3 pt-4">
                  <Link 
                    href="https://www.facebook.com/promogame.vn" 
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    <FaFacebookF className="text-sm" />
                  </Link>
                  {/* <Link 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    <FaTwitter className="text-sm" />
                  </Link> */}
                  {/* <Link 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    <FaInstagram className="text-sm" />
                  </Link> */}
                  {/* <Link 
                    href="#" 
                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  >
                    <FaYoutube className="text-sm" />
                  </Link> */}
                </div>
              </div>
            </div>

            {/* Our Services Section */}
            <div className="space-y-6">
              <h4 className="text-white text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {[
                  'Gamify Website',
                  'Gamify Zalo MiniApp',
                  'Gamify Offline Event',
                  'Gamify Team Building',
                  'Gameify Your Business'
                ].map((service, index) => (
                  <li key={index}>
                    <Link 
                      href="/service"
                      className="text-gray-300 hover:text-blue-400 text-sm flex items-center gap-3 transition-colors duration-300 group"
                    >
                      <FaArrowRight className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>{service}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Section */}
            {/* <div className="space-y-6">
              <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  'Credit Industries',
                  'Research Sector',
                  'Finance Sector',
                  'Technology Solutions',
                  'Business Analytics',
                  'Market Research'
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href="/service"
                      className="text-gray-300 hover:text-blue-400 text-sm flex items-center gap-3 transition-colors duration-300 group"
                    >
                      <FaArrowRight className="text-xs text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Recent Posts Section */}
            {/* <div className="space-y-6">
              <h4 className="text-white text-lg font-semibold mb-6">Recent Posts</h4>
              <div className="space-y-6">
                {[
                  {
                    image: "assets/img/widget/1.png",
                    date: "January 11, 2024",
                    title: "Social Media For Promote Business."
                  },
                  {
                    image: "assets/img/widget/2.png",
                    date: "January 11, 2024",
                    title: "Marketing For Base Market Watch"
                  }
                ].map((post, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={post.image} 
                        alt="blog post" 
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCalendarAlt className="text-blue-400 text-xs" />
                        <span className="text-gray-400 text-xs">{post.date}</span>
                      </div>
                      <h6 className="text-sm">
                        <Link 
                          href="/blog-details"
                          className="text-gray-300 hover:text-white transition-colors duration-300 leading-relaxed"
                        >
                          {post.title}
                        </Link>
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © PromoGame 2024 | All Rights Reserved
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Terms &amp; Conditions
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
      {/* ================== Footer One  end ==================*/}
    </>
  );
};

export default FooterOne;
