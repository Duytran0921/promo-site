'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import ModalVideo from 'react-modal-video';

const BannerEight = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {/* ================== Banner Start ==================*/}
      <div
        className="banner-area bg-relative banner-area-2 bg-cover mt-0"
        style={{ backgroundImage: 'url("./assets/img/home-7/1.png")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pb-xl-5 align-self-center">
              <div className="banner-inner pe-xl-4 pb-5">
                <h6
                  className="bg-none text-white wow animated fadeInLeft mb-4"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.3s"
                >
                  Be Natural
                </h6>
                <h2
                  className="title text-white wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.4s"
                >
                  Get Quality Leads In Single Click
                </h2>
                <p
                  className="content text-white pe-xl-4 wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.5s"
                >
                  And In Order To Make A Business, Brand Advertising And
                  Marketing Plays An Important Role. Similarly, In Making
                  Cultivation Business A Brand, Good Slogans Are Necessary.
                </p>
                <Link
                  className="btn btn-base  border-radius-0 wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.6s"
                  href="/about"
                >
                  Free Consulting <FaArrowAltCircleRight className="mt-4" />
                </Link>
                <div
                  className="d-inline-block align-self-center wow animated fadeInLeft mt-4 mt-md-0"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.7s"
                >
                  <Link
                    onClick={() => setOpen(true)}
                    className="video-play-btn-hover"
                    href="#"
                  >
                    <img src="assets/img/video.svg" alt="img" />{' '}
                    <h6 className="d-inline-block text-white">Watch Video</h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== Banner End ==================*/}
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="XM6kTQPzzpQ"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default BannerEight;
