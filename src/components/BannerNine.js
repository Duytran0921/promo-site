import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const BannerNine = () => {
  return (
    <>
      {/* page title start */}
      <div
        className="banner-area bg-relative banner-area-1 banner-area-8 pd-bottom-100 bg-cover"
        style={{ backgroundImage: 'url("./assets/img/home-9/2.png")' }}
      >
        <div className="container pt-xl-5 pb-xl-5">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="banner-inner pe-xl-5 pt-4 pt-lg-0">
                <h2
                  className="title text-white wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.4s"
                >
                  Secure Your Financial Future With Our ICO
                </h2>
                <p
                  className="content pe-xl-5 wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.5s"
                >
                  And In Order To Make A Business, Brand Advertising And
                  Marketing Plays An Important Role. Similarly, In Making
                  Cultivation Business Are Necessary Brand Advertising.
                </p>
                <Link
                  className="btn btn-base bg-base-9 wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.6s"
                  href="/about"
                >
                  Discover More <FaPlus className="mt-4" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="mt-5 margin-right--150 mt-lg-0 wow animated fadeInRight"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <img
                  className="main-img"
                  src="assets/img/home-9/02.png"
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banner end */}
    </>
  );
};

export default BannerNine;
