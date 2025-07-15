'use client'
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const NavBar = () => {
  const [active, setActive] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const menuActive = () => {
    setActive(!active);
  };
  const searchActive = () => {
    setSearchShow(!searchShow);
  };

  // Control sidebar navigation
  useEffect(() => {
    const items = document.querySelectorAll('.menu-item-has-children > a');

    const handleClick = (event) => {
      const href = event.currentTarget.getAttribute('href');
      
      // Only prevent default if href is # (placeholder link)
      if (href === '#') {
        event.preventDefault();
      }
      
      const subMenu = event.currentTarget.parentElement.querySelector('.sub-menu');
      if (subMenu) {
        subMenu.classList.toggle('active');
        event.currentTarget.classList.toggle('open');
      }
    };

    items.forEach(item => {
      item.addEventListener('click', handleClick);
    });

    // Cleanup function to remove event listeners
    return () => {
      items.forEach(item => {
        item.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <>
      {/* search popup start*/}
      <div
        className={searchShow ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-100 visible' : 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 opacity-0 invisible'}
        id="td-search-popup"
      >
        <form action="/" className="bg-transparent p-8 w-full max-w-md mx-4">
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search....."
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
            <FaSearch />
          </button>
        </form>
      </div>
      {/* search popup end*/}
      <div
        onClick={searchActive}
        className={searchShow ? 'fixed inset-0 z-40 bg-black bg-opacity-50 opacity-100 visible' : 'fixed inset-0 z-40 bg-black bg-opacity-50 opacity-0 invisible pointer-events-none'}
        id="body-overlay"
      ></div>
      {/* navbar start */}
      <nav className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="lg:hidden">
              <button
                onClick={menuActive}
                className={
                  active
                    ? 'flex flex-col justify-center items-center w-8 h-8 space-y-1 transform transition-all duration-300 rotate-45'
                    : 'flex flex-col justify-center items-center w-8 h-8 space-y-1 transform transition-all duration-300'
                }
                data-target="#itech_main_menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className={active ? 'w-6 h-0.5 bg-gray-800 transform rotate-90 translate-y-1.5' : 'w-6 h-0.5 bg-gray-800'} />
                <span className={active ? 'w-6 h-0.5 bg-gray-800 transform -rotate-90 -translate-y-1.5' : 'w-6 h-0.5 bg-gray-800'} />
              </button>
            </div>
            <div className="flex-shrink-0">
              <Link href="/">
                <img src="/assets/img/PromoLogo.png" alt="img" className="h-10 w-auto" />
              </Link>
            </div>
            <div className="lg:hidden">
              <span className="p-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200" onClick={searchActive}>
                <FaSearch className="w-5 h-5" />
              </span>
            </div>
            <div
              className={
                active
                  ? 'lg:flex lg:items-center lg:space-x-8 absolute lg:relative top-full lg:top-auto left-0 w-full lg:w-auto bg-white lg:bg-transparent  lg:shadow-none border-t lg:border-t-0 py-4 lg:py-0 px-4 lg:px-0 block'
                  : 'lg:flex lg:items-center lg:space-x-8 absolute lg:relative top-full lg:top-auto left-0 w-full lg:w-auto bg-white lg:bg-transparent  lg:shadow-none border-t lg:border-t-0 py-4 lg:py-0 px-4 lg:px-0 hidden'
              }
              id="itech_main_menu"
            >
              <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-4 lg:space-y-0">
                <li className="relative group">
                  <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                    Home
                    <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <li>
                      {/* <Link href="/index-1" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">IT / Softwer Agency</Link> */}
                    </li>
                  </ul>
                </li>
                <li className="relative group">
                  <Link href="/GamificationPlatform" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                    Gamified Promotion Platform
                    <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <ul className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <li>
                      <Link href="/GamificationPlatform#saas-package" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">SaaS Package</Link>
                    </li>
                    <li>
                      <Link href="/GamificationPlatform#customize-package" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Customize Package</Link>
                    </li>
                    <li>
                      <Link href="/GamificationPlatform#enterprise-package" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Enterprise Package</Link>
                    </li>
                  </ul>
                </li>
                <li className="relative group">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                    Sản Phẩm
                    <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <li>
                      {/* <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">About Us</Link> */}
                    </li>         
                  </ul>
                </li>
                <li className="relative group">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                    Thư Viện Game
                    <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="mb-4 lg:mb-0">
                          <ul>
                            <li>
                              {/* <Link href="/index-1" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">IT / Softwer Agency</Link> */}
                            </li>                  
                          </ul>
                        </div>
                        {/* <div className="mb-4 lg:mb-0">
                          <ul>
                            <li>
                              <Link href="/service" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Service 01</Link>
                            </li>
                            <li>
                              <Link href="/service-2" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Service 02</Link>
                            </li>
                            <li>
                              <Link href="/service-3" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Service 03</Link>
                            </li>
                            <li>
                              <Link href="/service-4" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Service 04</Link>
                            </li>
                            <li>
                              <Link href="/service-5" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Service 05</Link>
                            </li>
                            <li>
                              <Link href="/service-details" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Service Single</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-4 lg:mb-0">
                          <ul>
                            <li>
                              <Link href="/project" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Project 01</Link>
                            </li>
                            <li>
                              <Link href="/project-2" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Project 02</Link>
                            </li>
                            <li>
                              <Link href="/project-3" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Project 03</Link>
                            </li>
                            <li>
                              <Link href="/project-details" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Case Study Details</Link>
                            </li>
                            <li>
                              <Link href="/pricing" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Pricing 01</Link>
                            </li>
                            <li>
                              <Link href="/pricing-2" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Pricing 02</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-4 lg:mb-0"> */}
                          {/* <ul>
                            <li>
                              <Link href="/about" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">About Us</Link>
                            </li>
                            <li>
                              <Link href="/team" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Team 01</Link>
                            </li>
                            <li>
                              <Link href="/team-2" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Team 02</Link>
                            </li>
                            <li>
                              <Link href="/team-3" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Team 03</Link>
                            </li>
                            <li>
                              <Link href="/team-details" className="block px-2 py-1 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded">Team Details</Link>
                            </li>
                          </ul> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </li>

                <li className="relative group">
                  <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                    Blog
                    <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <ul className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <li>
                      {/* <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Blog 01</Link> */}
                    </li>

                  </ul>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex items-center">
              <span className="p-2 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200" onClick={searchActive}>
                <FaSearch className="w-5 h-5" />
              </span>
              {/* <a className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200" href="tel:">
                <span className="flex-shrink-0">
                  <img src="assets/img/icon/1.png" alt="img" className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-sm text-gray-500">Need help?</span>
                  <h5 className="font-semibold">(808) 555-0111</h5>
                </div>
              </a> */}
            </div>
          </div>
        </div>
      </nav>
      {/* navbar end */}
    </>
  );
};

export default NavBar;
