import Link from 'next/link';
import React from 'react';
import { FaChevronRight, FaStar } from 'react-icons/fa';

const TestimonialSix = () => {
  return (
    <>
      {/* =================== Testimonial  Start ===================*/}
      <div
        className="testimonial-area testimonial-area_6 pd-top-120 pd-bottom-100"
        style={{ backgroundImage: 'url("./assets/img/home-8/51.png")' }}
      >
        <div className="container">
          <div className="section-title style-white">
            <div className="row">
              <div className="col-lg-5 align-self-center">
                <h2 className="title">Elevating Digital Art To New Height</h2>
              </div>
              <div className="col-lg-7 text-lg-end d-lg-block d-none">
                <Link className="btn btn-base-blue" href="/about">
                  All Digital <FaChevronRight className="mt-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mobile-media-block media bg-white border-radius-5 p-4 mb-4">
                <div className="media-left pe-4 pb-4 pb-md-0">
                  <img src="assets/img/home-8/49.png" alt="img" />
                </div>
                <div className="media-body">
                  <div className="ratting-inner mb-3 star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur. Purus consequat
                    pulvinar tincid unt metus nibh pulvinar purus. Feugiat mi
                    ridiculus ac ac habitasse.
                  </p>
                  <h5>Michle Smith</h5>
                  <h6>Business Manager</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mobile-media-block media bg-white border-radius-5 p-4 mb-4">
                <div className="media-left pe-4 pb-4 pb-md-0">
                  <img src="assets/img/home-8/50.png" alt="img" />
                </div>
                <div className="media-body">
                  <div className="ratting-inner mb-3 star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur. Purus consequat
                    pulvinar tincid unt metus nibh pulvinar purus. Feugiat mi
                    ridiculus ac ac habitasse.
                  </p>
                  <h5>Jessica Lee</h5>
                  <h6>Business Manager</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================== Testimonial Five End ===================*/}
    </>
  );
};

export default TestimonialSix;
