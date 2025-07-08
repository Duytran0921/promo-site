import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SolutionOne = () => {
  return (
    <>
      {/* solution area start */}
      <div className="solution-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div
            className="p-4 p-xl-5"
            style={{ backgroundImage: 'url("./assets/img/home-7/14.png")' }}
          >
            <div className="row">
              <div
                className="col-lg-6 align-self-center wow animated fadeInRight"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <div className="section-title style-white mb-0">
                  <h6 className="bg-none color-base mb-3">Our Solution</h6>
                  <h2 className="title">
                    We Are Expert in All Plumber Solution
                  </h2>
                  <p className="content mb-4">
                    Business Consulting is a type of service that provides
                    expert advice to businesses and organizations to improve
                    their overall performance and achieve their goals. Business
                    is consultants analyze a company's operations, identify a
                    areas for strategies to optimize efficiency, productivity,
                    and profitability.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="single-list-inner style-check style-heading style-check mb-3">
                        <li className="text-white">
                          <FaCheckCircle /> Mistakes To Avoid
                        </li>
                        <li className="text-white">
                          <FaCheckCircle /> Knew About Fonts
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="single-list-inner style-check style-heading style-check mb-3">
                        <li className="text-white">
                          <FaCheckCircle /> Your Startup
                        </li>
                        <li className="text-white">
                          <FaCheckCircle /> Winning for Your Startup
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 solution-area-style">
                <div className="section-title mb-0 bg-white p-xl-5 p-4 box-shadow">
                  <h2 className="title">Online Consultancy</h2>
                  <form className="mt-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Name" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Email" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Phone" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Subject" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="single-input-inner style-border">
                          <textarea placeholder="Message" defaultValue={''} />
                        </div>
                      </div>
                      <div className="col-12">
                        <Link
                          className="btn btn-black mt-0 w-100 border-radius-5"
                          href="#"
                        >
                          Submit now
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* solution area end */}
    </>
  );
};

export default SolutionOne;
