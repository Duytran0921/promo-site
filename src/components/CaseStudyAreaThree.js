'use client'
import Link from 'next/link';
import React from 'react';
import { FaAngleLeft, FaAngleRight, FaPlus } from 'react-icons/fa';
import Slider from 'react-slick';

const CaseStudyAreaThree = () => {
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaAngleRight className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaAngleLeft className={className} onClick={onClick} />;
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
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
      {/*================== case-study area start ==================*/}
      <div
        className="gallery-area bg-relative pd-top-120 pd-bottom-90"
        style={{ backgroundImage: 'url("./assets/img/bg/15.png")' }}
      >
        <div className="container ">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-title style-white">
                <h6 className="bg-none color-base">Best gallery</h6>
                <h2 className="title">Securing Your Company Online Presence</h2>
              </div>
            </div>
          </div>
          <div className="team-slider owl-carousel slider-control-round white slider-control-right-top">
            <Slider {...settings}>
              <div className="item">
                <div className="single-project-inner img-fit-container style-2">
                  <img src="assets/img/gallery/1.png" alt="img" />
                  <div className="details">
                    <span>
                      <FaPlus />
                    </span>
                    <Link className="read-more-text" href="#">
                      Vegas It Park
                    </Link>
                    <p>
                      Lorem is Ipsum is simply is design designer isthe text
                      Lorem Ipsum{' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-project-inner img-fit-container style-2">
                  <img src="assets/img/gallery/1.png" alt="img" />
                  <div className="details">
                    <span>
                      <FaPlus />
                    </span>
                    <Link className="read-more-text" href="#">
                      Vegas It Park
                    </Link>
                    <p>
                      Lorem is Ipsum is simply is design designer isthe text
                      Lorem Ipsum{' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-project-inner img-fit-container style-2">
                  <img src="assets/img/gallery/1.png" alt="img" />
                  <div className="details">
                    <span>
                      <FaPlus />
                    </span>
                    <Link className="read-more-text" href="#">
                      Vegas It Park
                    </Link>
                    <p>
                      Lorem is Ipsum is simply is design designer isthe text
                      Lorem Ipsum{' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="single-project-inner img-fit-container style-2">
                  <img src="assets/img/gallery/1.png" alt="img" />
                  <div className="details">
                    <span>
                      <FaPlus />
                    </span>
                    <Link className="read-more-text" href="#">
                      Vegas It Park
                    </Link>
                    <p>
                      Lorem is Ipsum is simply is design designer isthe text
                      Lorem Ipsum{' '}
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      {/* ================== case-study area end ==================*/}
    </>
  );
};

export default CaseStudyAreaThree;
