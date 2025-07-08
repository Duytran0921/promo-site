import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const ServiceAreaNine = () => {
  return (
    <>
      {/* start service area */}
      <div className="service-area service-area_9 pd-top-120">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-title">
                <h6 className="sub-title">Our Feature Service</h6>
                <h2 className="title">
                  We Specialize In The <br /> Features Services
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner text-center">
                <div className="thumb">
                  <img src="assets/img/home-11/service-1.svg" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">CloudCRM</Link>
                  </h5>
                  <p>SaaS stands for Software as a Service. It is a software</p>
                  <Link className="read-more-text" href="/blog-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner text-center">
                <div className="thumb">
                  <img src="assets/img/home-11/service-2.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">SmartBiz</Link>
                  </h5>
                  <p>SaaS stands for Software as a Service. It is a software</p>
                  <Link className="read-more-text" href="/blog-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner text-center">
                <div className="thumb">
                  <img src="assets/img/home-11/service-3.svg" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">AppGenius</Link>
                  </h5>
                  <p>SaaS stands for Software as a Service. It is a software</p>
                  <Link className="read-more-text" href="/blog-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner text-center">
                <div className="thumb">
                  <img src="assets/img/home-11/service-4.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Content Marketing</Link>
                  </h5>
                  <p>SaaS stands for Software as a Service. It is a software</p>
                  <Link className="read-more-text" href="/blog-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner text-center">
                <div className="thumb">
                  <img src="assets/img/home-11/service-5.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Mobile App Development</Link>
                  </h5>
                  <p>SaaS stands for Software as a Service. It is a software</p>
                  <Link className="read-more-text" href="/blog-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner text-center">
                <div className="thumb">
                  <img src="assets/img/home-11/service-6.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Design Solutions</Link>
                  </h5>
                  <p>SaaS stands for Software as a Service. It is a software</p>
                  <Link className="read-more-text" href="/blog-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end service area */}
    </>
  );
};

export default ServiceAreaNine;
