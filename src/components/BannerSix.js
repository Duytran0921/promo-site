import Link from 'next/link';
import React from 'react';


const BannerSix = () => {
  return (
    <>
      {/* ================== BannerFive Start ==================*/}
      <div
        className="banner-area bg-relative banner-area-2 bg-cover mt-0"
        style={{ backgroundImage: 'url("./assets/img/banner-6/1.png")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5 pb-xl-5 align-self-center">
              <div className="banner-inner pe-xl-4 pb-5">
                <h6
                  className="bg-none text-white    mb-4"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="1500"
                >
                  Protecting your data
                </h6>
                <h2
                  className="title text-white   "
                  data-aos="fade-right"
                  data-aos-delay="200"
                  data-aos-duration="1500"
                >
                  Data Security is Our Top Priority
                </h2>
                <p
                  className="content pe-xl-4   "
                  data-aos="fade-right"
                  data-aos-delay="300"
                  data-aos-duration="1500"
                >
                  Lorem is Ipsum is simply design designer best isthe text Lorem
                  Ipsum this the is simply is our com best ourbe designer Lorem
                </p>
                <Link
                  className="btn btn-base text_inner_white "
                  data-aos="fade-right"
                  data-aos-delay="400"
                  data-aos-duration="1500"
                  href="/about"
                >
                  Explore now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================== BannerFive End ==================*/}
    </>
  );
};

export default BannerSix;
