'use client'
import React from 'react';
import TrackVisibility from 'react-on-screen';
import CountUp from 'react-countup';
const CounterAreaSix = () => {
  return (
    <>
      {/* counter area start */}
      <div className="counter-area bg-black-ico bg-relative pd-top-110">
        <div className="container">
          <div className="bg-base-9 border-radius-5 pt-xl-5 pt-4 position-relative z-index-2 mg-bottom---120">
            <div className="row">
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.1s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-9/9.png" alt="img" />
                  </div>
                  <h2 className="text-white mt-4 mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp delay={0} start={0} end={200} /> +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p className="text-white">Team member</p>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-9/10.png" alt="img" />
                  </div>
                  <h2 className="text-white mt-4 mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp delay={0} start={0} end={10} /> K+
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p className="text-white">Team member</p>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.4s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-9/11.png" alt="img" />
                  </div>
                  <h2 className="text-white mt-4 mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp delay={0} start={0} end={200} /> +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p className="text-white">Team member</p>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow animated fadeInUp"
                data-wow-duration="1.5s"
                data-wow-delay="0.5s"
              >
                <div className="single-counter-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-9/12.png" alt="img" />
                  </div>
                  <h2 className="text-white mt-4 mb-2">
                    <TrackVisibility once>
                      {({ isVisible }) =>
                        isVisible && (
                          <span className="counter">
                            <CountUp delay={0} start={0} end={200} /> +
                          </span>
                        )
                      }
                    </TrackVisibility>
                  </h2>
                  <p className="text-white">Team member</p>
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

export default CounterAreaSix;
