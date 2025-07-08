import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const CollectiblesOne = () => {
  return (
    <div className="collectibs-area collectibles_one_1 bg-relative  bg-gray pd-top-100 pd-bottom-90">
      <div className="container">
        <div className="section-title">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <h2 className="title">Creating a new era of Collectibles</h2>
              <p className="content">
                Lorem ipsum dolor sit amet consectetur. Gravida vulputate vel
                nec nisi sit nunc. Hendrerit sagittis donec
              </p>
              <Link className="btn btn-base-pink" href="/about">
                Discover More <FaPlus />
              </Link>
            </div>
            <div className="col-lg-6 text-lg-end d-lg-block d-none">
              <img src="assets/img/home-8/23.png" alt="img" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="box-shadow bg-relative text-center border-radius-5 mb-4 bg-white">
              <div className="thumb">
                <img src="assets/img/home-8/20.png" alt="img" />
                <span className="position-top-left">
                  <img src="assets/img/home-8/24.png" alt="img" />
                </span>
              </div>
              <div className="details p-4">
                <h5 className="mb-4">NFT Market Tracker</h5>
                <Link className="btn  btn-base-pink" href="/about">
                  Discover More <FaPlus />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box-shadow bg-relative text-center border-radius-5 mb-4 bg-white">
              <div className="thumb">
                <img src="assets/img/home-8/21.png" alt="img" />
                <span className="position-top-left">
                  <img src="assets/img/home-8/25.png" alt="img" />
                </span>
              </div>
              <div className="details p-4">
                <h5 className="mb-4">Digital Authentication Services</h5>
                <Link className="btn  btn-base-pink" href="/about">
                  Discover More <FaPlus />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="box-shadow bg-relative text-center border-radius-5 mb-4 bg-white">
              <div className="thumb">
                <img src="assets/img/home-8/22.png" alt="img" />
                <span className="position-top-left">
                  <img src="assets/img/home-8/26.png" alt="img" />
                </span>
              </div>
              <div className="details p-4">
                <h5 className="mb-4">Auction House</h5>
                <Link className="btn  btn-base-pink" href="/about">
                  Discover More <FaPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectiblesOne;
