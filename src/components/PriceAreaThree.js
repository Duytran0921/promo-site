import Link from 'next/link';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const PriceAreaThree = () => {
  return (
    <>
      {/* pricing-area start */}
      <div className="pricing-area pricing-area_3 pd-top-90 pd-bottom-90">
        <div className="container">
          <div className="section-title text-center">
            <h6 className="sub-title">Pricing plan</h6>
            <h2 className="title">
              Best plane to get our <span>Services</span>
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-pricing-inner">
                <h2 className="mb-3">
                  $19 <sub>/mo</sub>
                </h2>
                <h5>Started</h5>
                <ul>
                  <li>
                    <FaCheck />
                    Mobile App Development
                  </li>
                  <li>
                    <FaCheck />
                    Branding &amp; Identity
                  </li>
                  <li>
                    <FaCheck />
                    Email Marketing &amp; Automation
                  </li>
                  <li>
                    <FaCheck />
                    E-commerce Solutions
                  </li>
                  <li className="hide">
                    <FaCheck />
                    Social Media Management
                  </li>
                  <li className="hide">
                    <FaCheck />
                    Video &amp; Animation Production{' '}
                  </li>
                </ul>
                <Link
                  className="btn btn-black border-radius border-radius-0 w-100"
                  href="#"
                >
                  Started
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-pricing-inner price-active">
                <h2 className="mb-3">
                  $19 <sub>/mo</sub>
                </h2>
                <h5>Started</h5>
                <ul>
                  <li>
                    <FaCheck />
                    Mobile App Development
                  </li>
                  <li>
                    <FaCheck />
                    Branding &amp; Identity
                  </li>
                  <li>
                    <FaCheck />
                    Email Marketing &amp; Automation
                  </li>
                  <li>
                    <FaCheck />
                    E-commerce Solutions
                  </li>
                  <li className="hide">
                    <FaCheck />
                    Social Media Management
                  </li>
                  <li className="hide">
                    <FaCheck />
                    Video &amp; Animation Production{' '}
                  </li>
                </ul>
                <Link
                  className="btn btn-black border-radius border-radius-0 w-100"
                  href="#"
                >
                  Started
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-pricing-inner">
                <h2 className="mb-3">
                  $19 <sub>/mo</sub>
                </h2>
                <h5>Started</h5>
                <ul>
                  <li>
                    <FaCheck />
                    Mobile App Development
                  </li>
                  <li>
                    <FaCheck />
                    Branding &amp; Identity
                  </li>
                  <li>
                    <FaCheck />
                    Email Marketing &amp; Automation
                  </li>
                  <li>
                    <FaCheck />
                    E-commerce Solutions
                  </li>
                  <li className="hide">
                    <FaCheck />
                    Social Media Management
                  </li>
                  <li className="hide">
                    <FaCheck />
                    Video &amp; Animation Production{' '}
                  </li>
                </ul>
                <Link
                  className="btn btn-black border-radius border-radius-0 w-100"
                  href="#"
                >
                  Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pricing-area start */}
    </>
  );
};

export default PriceAreaThree;
