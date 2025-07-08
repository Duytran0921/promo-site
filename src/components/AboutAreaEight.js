'use client'
import React from 'react';
import TrackVisibility from 'react-on-screen';
import CountUp from 'react-countup';
const AboutAreaEight = () => {
  return (
    <>
      {/* =============== About Area End ===============*/}
      <div className="about-area pd-top-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div
                className="about-thumb-inner pe-xl-5 me-xl-5 wow animated fadeInLeft"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <img
                  className="main-img"
                  src="assets/img/home-8/7.png"
                  alt="img"
                />
              </div>
            </div>
            <div
              className="col-lg-6 wow animated fadeInRight"
              data-wow-duration="1.5s"
              data-wow-delay="0.3s"
            >
              <div className="section-title mt-5 mt-lg-0">
                <h2 className="title">Your unique piece of the blockchain</h2>
                <p className="content mb-4 mb-xl-5">
                  Lorem ipsum dolor sit amet consectetur. Gravida vulputate vel
                  nec nisi sit nunc. Hendrerit sagittis donec eleifend ipsum
                  quam
                </p>
                <div className="box-shadow p-4 pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single-counter-inner media">
                        <div className="thumb media-left pe-4">
                          <img src="assets/img/home-8/3.png" alt="img" />
                        </div>
                        <div className="media-body">
                          <h2 className="mb-1">
                            <TrackVisibility once>
                              {({ isVisible }) =>
                                isVisible && (
                                  <span className="counter">
                                    <CountUp delay={0} start={0} end={2540} /> +
                                  </span>
                                )
                              }
                            </TrackVisibility>
                          </h2>
                          <p className="mb-0">Project Done</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-counter-inner media">
                        <div className="thumb media-left pe-4">
                          <img src="assets/img/home-8/4.png" alt="img" />
                        </div>
                        <div className="media-body">
                          <h2 className="mb-1">
                            <TrackVisibility once>
                              {({ isVisible }) =>
                                isVisible && (
                                  <span className="counter">
                                    <CountUp delay={0} start={0} end={100} /> +
                                  </span>
                                )
                              }
                            </TrackVisibility>
                          </h2>
                          <p className="mb-0">Project Win</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-counter-inner media">
                        <div className="thumb media-left pe-4">
                          <img src="assets/img/home-8/5.png" alt="img" />
                        </div>
                        <div className="media-body">
                          <h2 className="mb-1">
                            <TrackVisibility once>
                              {({ isVisible }) =>
                                isVisible && (
                                  <span className="counter">
                                    <CountUp delay={0} start={0} end={10} /> +
                                  </span>
                                )
                              }
                            </TrackVisibility>
                          </h2>
                          <p className="mb-0">Glorious Years</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-counter-inner media">
                        <div className="thumb media-left pe-4">
                          <img src="assets/img/home-8/6.png" alt="img" />
                        </div>
                        <div className="media-body">
                          <h2 className="mb-1">
                            <TrackVisibility once>
                              {({ isVisible }) =>
                                isVisible && (
                                  <span className="counter">
                                    <CountUp delay={0} start={0} end={6540} /> +
                                  </span>
                                )
                              }
                            </TrackVisibility>
                          </h2>
                          <p className="mb-0">Active Clients</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =============== About Area Five End ===============*/}
    </>
  );
};

export default AboutAreaEight;
