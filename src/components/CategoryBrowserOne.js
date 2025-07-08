import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";

const CategoryBrowserOne = () => {
  return (
    <div className='brows-cat-area bg-relative pd-top-100 pd-bottom-90'>
      <div className='container'>
        <div className='section-title'>
          <div className='row'>
            <div className='col-md-8'>
              <h2 className='title'>Browse by category</h2>
            </div>
            <div className='col-md-4 text-md-end'>
              <Link className='btn btn-base-pink mt-lg-0' href='about'>
                All Category <FaPlus />
              </Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-3 col-sm-6'>
            <div className='row g-2 mb-4'>
              <div className='col-6'>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/8.png'
                    alt='img'
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='thumb mb-2'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/9.png'
                    alt='img'
                  />
                </div>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/10.png'
                    alt='img'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-sm-6'>
            <div className='row g-2 mb-4'>
              <div className='col-6'>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/11.png'
                    alt='img'
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='thumb mb-2'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/12.png'
                    alt='img'
                  />
                </div>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/13.png'
                    alt='img'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-sm-6'>
            <div className='row g-2 mb-4'>
              <div className='col-6'>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/14.png'
                    alt='img'
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='thumb mb-2'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/15.png'
                    alt='img'
                  />
                </div>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/16.png'
                    alt='img'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-sm-6'>
            <div className='row g-2 mb-4'>
              <div className='col-6'>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/17.png'
                    alt='img'
                  />
                </div>
              </div>
              <div className='col-6'>
                <div className='thumb mb-2'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/18.png'
                    alt='img'
                  />
                </div>
                <div className='thumb'>
                  <img
                    className='w-100'
                    src='assets/img/home-8/19.png'
                    alt='img'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBrowserOne;
