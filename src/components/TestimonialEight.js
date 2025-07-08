import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialEight = () => {
  return (
    <>
      {/* testimonial-area start */}
      <div className="testimonial-area testimonial-area_8 bg-black-2-ico position-relative pd-top-120 pd-bottom-100">
        <div className="container pd-top-110">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title style-white text-center">
                <h6 className="sub-title line-double text-white">
                  Clients Talk
                </h6>
                <h2 className="title">Investing Made Simple With Blockchain</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="mobile-media-block media bg-white-4 border-radius-5 p-4 mb-4">
                <div className="media-left pe-4 pb-4 pb-md-0">
                  <img src="assets/img/home-9/13.png" alt="img" />
                </div>
                <div className="media-body">
                  <h5 className="text-white">Michle Smith</h5>
                  <h6 className="text-white mb-3">Business Manager</h6>
                  <p className="mb-3 text-white">
                    Lorem ipsum dolor sit amet consectetur. Purus consequat
                    pulvinar tincid unt metus nibh pulvinar purus. Feugiat mi
                    ridiculus ac ac habitasse.
                  </p>
                  <div className="ratting-inner">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mobile-media-block media bg-white-4 border-radius-5 p-4 mb-4">
                <div className="media-left pe-4 pb-4 pb-md-0">
                  <img src="assets/img/home-9/14.png" alt="img" />
                </div>
                <div className="media-body">
                  <h5 className="text-white">Jessica Lee</h5>
                  <h6 className="text-white mb-3">Business Manager</h6>
                  <p className="mb-3 text-white">
                    Lorem ipsum dolor sit amet consectetur. Purus consequat
                    pulvinar tincid unt metus nibh pulvinar purus. Feugiat mi
                    ridiculus ac ac habitasse.
                  </p>
                  <div className="ratting-inner">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* testimonial-area start */}
    </>
  );
};

export default TestimonialEight;
