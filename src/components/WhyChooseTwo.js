import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const WhyChooseTwo = () => {
  return (
    <>
      {/* start why choose us */}
      <div className="why-choose-us-area why-choose-us-area_2 pd-top-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <div className="section-title mb-0 text-center">
                <h6 className="sub-title">Why Choose Us</h6>
                <h2 className="title">Empowering Investors Worldwide</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className=" bg-relative border-radius-5 mb-4 p-4 pb-0 text-center">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/home-11/why-1.png"
                    alt="img"
                  />
                </div>
                <div className="details p-3">
                  <h5 className="mb-2">24/7 Support</h5>
                  <p className="mb-0 ">
                    Lorem is Ipsum is simply is design iomyi is text Lorem Ipsum
                    is simply is our busi Lorem is Ipsum is is
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className=" bg-relative border-radius-5 mb-4 p-4 pb-0 text-center">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/home-11/why-2.png"
                    alt="img"
                  />
                </div>
                <div className="details p-3">
                  <h5 className="mb-2">Free Withdraw</h5>
                  <p className="mb-0">
                    Lorem is Ipsum is simply is design iomyi is text Lorem Ipsum
                    is simply is our busi Lorem is Ipsum is is
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className=" bg-relative border-radius-5 mb-4 p-4 pb-0 text-center">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/home-11/why-3.png"
                    alt="img"
                  />
                </div>
                <div className="details p-3">
                  <h5 className="mb-2">Crypto Support</h5>
                  <p className="mb-0">
                    Lorem is Ipsum is simply is design iomyi is text Lorem Ipsum
                    is simply is our busi Lorem is Ipsum is is
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <img src="assets/img/home-11/w.png" alt="" />
            </div>
            <div className="col-lg-6">
              <h2>
                Increasing Conversion With Organic Search Engine Optimisation
              </h2>
              <p className="pt-4">
                Since 1999. For millions of users. We transform businesses with
                powerful and adaptable digital solutions.
              </p>
              <p className="pt-2">
                Psum dolor sit amet, consectetur adipiscing elit. Pellentesque
                viverra purus imperdiet a. Ut nisl est at ultricies neque ornare
                tellus tellus enim.
              </p>
              <Link
                className="btn btn-border-base wow  fadeInLeft animated mt-4"
                data-wow-duration="1.5s"
                data-wow-delay="0.6s"
                href="/about"
                style={{
                  visibility: 'visible',
                  animationDuration: '1.5s',
                  animationDelay: '0.6s',
                  animationName: 'fadeInLeft',
                }}
              >
                Discover More <FaPlus />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end why choose us */}
    </>
  );
};

export default WhyChooseTwo;
