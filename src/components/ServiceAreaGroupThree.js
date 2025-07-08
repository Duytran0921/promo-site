import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
const ServiceAreaGroupThree = () => {
  return (
    <>
      {/* service area start */}
      <div className="service-area bg-relative pd-top-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-4">
                  <img src="assets/img/icon/18.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Web Development</h5>
                  <p className="content mb-3">
                    Research ipsum dolor sit consec tetur sed diam in the
                    aliquam tempor
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/16.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Big Data Analytics</h5>
                  <p className="content mb-3">
                    Create ipsum dolor sit consec tetur sed diam in the aliquam
                    tempor
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/17.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Cyber security</h5>
                  <p className="content mb-3">
                    Develope ipsum dolor sit consec tetur sed diam in the
                    aliquam tempor
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/20.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Mobile App</h5>
                  <p className="content mb-3">
                    Shop ipsum dolor sit consec tetur Malesuada sed diam in the
                    tempor
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-4">
                  <img src="assets/img/icon/18.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Web Development</h5>
                  <p className="content mb-3">
                    Research ipsum dolor sit consec tetur sed diam in the
                    aliquam
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner">
                <div className="thumb mb-3">
                  <img src="assets/img/icon/16.svg" alt="img" />
                </div>
                <div className="details">
                  <h5 className="mb-3">Big Data Analytics</h5>
                  <p className="content mb-3">
                    Create ipsum dolor sit consec tetur sed diam in the aliquam
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Read More <FaArrowRight />
                  </Link>
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

export default ServiceAreaGroupThree;
