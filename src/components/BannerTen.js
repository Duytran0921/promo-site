'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import ModalVideo from 'react-modal-video';
const BannerTen = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {/* page title start */}
      <div className="banner-area bg-relative banner-area-2 bg-cover">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="banner-inner pe-xl-5">
                <h6
                  className="subtitle wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.3s"
                >
                  elcome To Seofest SEO Agency
                </h6>
                <h2
                  className="title wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.4s"
                >
                  {' '}
                  Smarter Way To Serve <span>Digital Product </span>SEO
                </h2>
                <Link
                  className="btn btn-border-base wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.6s"
                  href="/about"
                >
                  Contact Us
                </Link>
                <div
                  className="d-inline-block align-self-center wow animated fadeInLeft"
                  data-wow-duration="1.5s"
                  data-wow-delay="0.7s"
                >
                  <span
                    onClick={() => setOpen(true)}
                    className="video-play-btn-hover"
                  >
                    <img src="assets/img/video.svg" alt="img" />{' '}
                    <h6 className="d-inline-block">how we work</h6>
                  </span>
                </div>
              </div>
              <div className="hero-conversion-wrap">
                <div className="single-con-wraper">
                  <div className="single-conversion-wrap">
                    <div className="single-conversion">
                      <div className="left-content">
                        <h2>93%</h2>
                      </div>
                      <div className="right-content">
                        <h6>
                          Average <br />
                          Conversion
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="single-conversion-wrap">
                    <div className="single-conversion">
                      <div className="left-content">
                        <h2>87%</h2>
                      </div>
                      <div className="right-content">
                        <h6>
                          Traffic <br />
                          Generated
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-9 wow animated fadeInRight"
              data-wow-duration="1.5s"
              data-wow-delay="0.3s"
            >
              <div className="banner-thumb-2 mt-4 mt-lg-0">
                <img
                  className="banner-animate-img banner-animate-img-4"
                  src="assets/img/home-11/hero-thumb-2.png"
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* banner end */}

      <>
        {/* start brand logo */}
        <div className="about-area about-area_marquee about-area_ten bg-gray pt-5 pb-5">
          <div className="container">
            <div className="client-slider owl-carousel">
              <Marquee gradient={false}>
                <div className="thumb">
                  <img src="assets/img/client/7.svg" alt="img" />
                </div>
                <div className="thumb">
                  <img src="assets/img/client/8.svg" alt="img" />
                </div>
                <div className="thumb">
                  <img src="assets/img/client/9.svg" alt="img" />
                </div>
                <div className="thumb">
                  <img src="assets/img/client/11.svg" alt="img" />
                </div>
                <div className="thumb">
                  <img src="assets/img/client/8.svg" alt="img" />
                </div>
                <div className="thumb">
                  <img src="assets/img/client/9.svg" alt="img" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
        {/* end brand logo */}
      </>

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

export default BannerTen;
