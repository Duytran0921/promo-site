import Link from 'next/link';
import React from 'react';

const ServiceAreaSix = () => {
  return (
    <>
      {/*=================== service area six start ===================*/}
      <div
        className="service-area bg-cover pd-top-120 pd-bottom-90 pd-top-110 pd-bottom-90"
        style={{ backgroundImage: 'url("./assets/img/bg/3.png")' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-8">
              <div className="section-title text-center">
                <h6 className="bg-none color-base mb-3">Our Best service</h6>
                <h2 className="title">
                  Protecting Your Data, One Byte At A Time
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb-img text-end">
                  <img src="assets/img/home-6/1.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Network Security</Link>
                  </h5>
                  <p className="mb-0">
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb-img text-end">
                  <img src="assets/img/home-6/2.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Data Encryption</Link>
                  </h5>
                  <p className="mb-0">
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb-img text-end">
                  <img src="assets/img/home-6/3.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Malware Removal</Link>
                  </h5>
                  <p className="mb-0">
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb-img text-end">
                  <img src="assets/img/home-6/4.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Web Security</Link>
                  </h5>
                  <p className="mb-0">
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb-img text-end">
                  <img src="assets/img/home-6/5.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Data Encryption</Link>
                  </h5>
                  <p className="mb-0">
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb-img text-end">
                  <img src="assets/img/home-6/6.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Email Security</Link>
                  </h5>
                  <p className="mb-0">
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== service area end ===================*/}
    </>
  );
};

export default ServiceAreaSix;
