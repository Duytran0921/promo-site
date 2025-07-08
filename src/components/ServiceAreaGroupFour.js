import Link from 'next/link';
import React from 'react';
const ServiceAreaGroupFour = () => {
  return (
    <>
      {/* service area start */}
      <div className="service-area bg-relative pd-top-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pe-5">
              <div className="single-service-inner-3 single-service-inner-3-left">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/7.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link href="/service-details">AI Consult</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-left">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/8.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link href="/service-details">Data Mind</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-left mb-0">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/9.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link href="/service-details">IntelliSense</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-md-5 pe-5 pe-md-0 mt-4 mt-md-0">
              <div className="single-service-inner-3 single-service-inner-3-right">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/10.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link href="/service-details">Neural Solutions</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-right">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/11.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link href="/service-details">Wise Logic</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
              <div className="single-service-inner-3 single-service-inner-3-right mb-0">
                <div className="thumb">
                  <div className="thumb-inner">
                    <img src="assets/img/service-icon/12.svg" alt="img" />
                  </div>
                </div>
                <div className="details">
                  <h5 className="mb-3">
                    <Link href="/service-details">Smart Vision</Link>
                  </h5>
                  <p className="mb-0">
                    Aliquam eros justo, posuere loborti inh thi viverra coin
                    design here laoreet min ouimatti posuere lorem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* service area end */}
    </>
  );
};

export default ServiceAreaGroupFour;
