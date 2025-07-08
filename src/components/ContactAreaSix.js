'use client'
import React from 'react';
import CountUp from 'react-countup';
import TrackVisibility from 'react-on-screen';
const ContactAreaSix = () => {
  return (
    <>
      {/* counter area start */}
      <div className="counter-area counter-area_6 bg-relative bg-cover pd-top-110">
        <div className="container">
          <div className="bg-base p-4 p-xl-5">
            <div className="row">
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.1s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-7/19.png" alt="img" />
                  </div>
                  <h2 className="mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp
                              duration={1}
                              delay={0}
                              start={0}
                              end={200}
                            />{' '}
                            +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p>Team member</p>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-7/20.png" alt="img" />
                  </div>
                  <h2 className="mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp
                              duration={1}
                              delay={0}
                              start={0}
                              end={10}
                            />{' '}
                            K+
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p>Team member</p>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.4s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-7/21.png" alt="img" />
                  </div>
                  <h2 className="mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp
                              duration={1}
                              delay={0}
                              start={0}
                              end={200}
                            />{' '}
                            +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p>Team member</p>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.5s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-7/22.png" alt="img" />
                  </div>
                  <h2 className="mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp
                              duration={1}
                              delay={0}
                              start={0}
                              end={100}
                            />{' '}
                            +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p>Team member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* counter area end */}
    </>
  );
};

export default ContactAreaSix;
