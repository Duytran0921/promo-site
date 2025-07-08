import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaAnglesRight } from 'react-icons/fa6';

const GalleryOne = () => {
  return (
    <>
      {/* gallery area start */}
      <div className="gallery-area gallery-area_1 bg-black-ico bg-relative pd-top-110">
        <div className="container">
          <div className="section-title style-white">
            <div className="row">
              <div className="col-md-8">
                <h6 className="sub-title text-white">GALLERY HERE</h6>
                <h2 className="title">Leading The Digital Revolution</h2>
              </div>
              <div className="col-md-4 text-md-end align-self-center">
                <Link className="btn btn-base bg-base-9 mt-lg-0" href="/about">
                  All Category <FaPlus />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-case-study-inner style-3">
                <div className="thumb  img-fit-container">
                  <img src="assets/img/home-9/15.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow " href="#">
                    <FaAnglesRight />
                  </Link>
                </div>
              </div>
              <div className="single-case-study-inner style-3">
                <div className="thumb  img-fit-container">
                  <img src="assets/img/home-9/16.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow " href="#">
                    <FaAnglesRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-case-study-inner style-3">
                <div className="thumb  img-fit-container">
                  <img src="assets/img/home-9/17.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow" href="#">
                    <FaAnglesRight />
                  </Link>
                </div>
              </div>
              <div className="single-case-study-inner style-3">
                <div className="thumb  img-fit-container">
                  <img src="assets/img/home-9/18.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow" href="#">
                    <FaAnglesRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-case-study-inner style-3">
                <div className="thumb  img-fit-container">
                  <img src="assets/img/home-9/19.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow" href="#">
                    <FaAnglesRight />
                  </Link>
                </div>
              </div>
              <div className="single-case-study-inner style-3">
                <div className="thumb  img-fit-container">
                  <img src="assets/img/home-9/20.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow" href="#">
                    <FaAnglesRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* gallery area end */}
    </>
  );
};

export default GalleryOne;
