import Link from 'next/link';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

const ServiceAreaSeven = () => {
  return (
    <>
      {/*=================== service five start ===================*/}
      <div className="service-area ServiceAreaSeven bg-cover pd-top-120 pd-bottom-90 pd-top-110 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="section-title text-center">
                <h6 className="color-base bg-none mb-3">Our Services</h6>
                <h2 className="title">
                  We Provide the best Technology Services
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="single-service-inner style-4 text-center">
                <div className="thumb mb-4">
                  <img src="assets/img/home-7/2.png" alt="img" />
                </div>
                <div className="details">
                  <Link className="btn btn-black" href="/service-details">
                    <FaAngleRight className="mt-0" />
                  </Link>
                  <h5 className="mb-3">Website Development</h5>
                  <p className="content mb-0">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="single-service-inner style-4 text-center">
                <div className="thumb mb-4">
                  <img src="assets/img/home-7/3.png" alt="img" />
                </div>
                <div className="details">
                  <Link className="btn btn-black" href="/service-details">
                    <FaAngleRight className="mt-0" />
                  </Link>
                  <h5 className="mb-3">Website Development</h5>
                  <p className="content mb-0">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="single-service-inner style-4 text-center">
                <div className="thumb mb-4">
                  <img src="assets/img/home-7/4.png" alt="img" />
                </div>
                <div className="details">
                  <Link className="btn btn-black" href="/service-details">
                    <FaAngleRight className="mt-0" />
                  </Link>
                  <h5 className="mb-3">Website Development</h5>
                  <p className="content mb-0">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
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

export default ServiceAreaSeven;
