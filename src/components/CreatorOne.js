'use client'
import Link from 'next/link';
import React from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import Slider from 'react-slick';

const CreatorOne = () => {
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaAngleRight className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaAngleLeft className={className} onClick={onClick} />;
  }
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        dots: false,
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        dots: false,
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <>
      {/*====================== creator start ======================*/}
      <div className="creator-area creator-area_1 pd-top-115">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center">
                <h2 className="title">Connect with your favorite creators</h2>
              </div>
            </div>
          </div>
          <div className="creator-slider owl-carousel slider-control-dots">
            <Slider {...settings}>
              <div className="item">
                <div className="single-creator-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-8/52.png" alt="img" />
                  </div>
                  <div className="details">
                    <ul className="social-media">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaYoutube />
                        </Link>
                      </li>
                    </ul>
                    <h5>Dianne Russell</h5>
                    <p className="mb-0">Python Developer</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-creator-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-8/53.png" alt="img" />
                  </div>
                  <div className="details">
                    <ul className="social-media">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaYoutube />
                        </Link>
                      </li>
                    </ul>
                    <h5>Kathryn Murphy</h5>
                    <p className="mb-0">Php Developer</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-creator-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-8/54.png" alt="img" />
                  </div>
                  <div className="details">
                    <ul className="social-media">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaYoutube />
                        </Link>
                      </li>
                    </ul>
                    <h5>Marvin McKinney</h5>
                    <p className="mb-0">Wordpress Developer</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-creator-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-8/55.png" alt="img" />
                  </div>
                  <div className="details">
                    <ul className="social-media">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaYoutube />
                        </Link>
                      </li>
                    </ul>
                    <h5>Cameron Williamson</h5>
                    <p className="mb-0">Joomla Developer</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-creator-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-8/52.png" alt="img" />
                  </div>
                  <div className="details">
                    <ul className="social-media">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaYoutube />
                        </Link>
                      </li>
                    </ul>
                    <h5>Dianne Russell</h5>
                    <p className="mb-0">Python Developer</p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-creator-inner text-center">
                  <div className="thumb">
                    <img src="assets/img/home-8/53.png" alt="img" />
                  </div>
                  <div className="details">
                    <ul className="social-media">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaYoutube />
                        </Link>
                      </li>
                    </ul>
                    <h5>Kathryn Murphy</h5>
                    <p className="mb-0">Php Developer</p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* ====================== team area end ======================*/}
    </>
  );
};

export default CreatorOne;
