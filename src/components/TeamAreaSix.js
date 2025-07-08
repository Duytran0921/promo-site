import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const TeamAreaSix = () => {
  return (
    <>
      {/* team-area start */}
      <div className="team-area bg-black-2-ico pd-top-115 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center">
                <h6 className="sub-title line-double text-white">Our Team</h6>
                <h2 className="title text-white">
                  Join The Cryptocurrency Revolution
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-creator-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/home-9/21.png" alt="img" />
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
                  <h5 className="text-white">Dianne Russell</h5>
                  <p className="mb-0 text-white">Python Developer</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-creator-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/home-9/22.png" alt="img" />
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
                  <h5 className="text-white">Kathryn Murphy</h5>
                  <p className="mb-0 text-white">Php Developer</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-creator-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/home-9/23.png" alt="img" />
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
                  <h5 className="text-white">Marvin McKinney</h5>
                  <p className="mb-0 text-white">Wordpress Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* team-area start */}
    </>
  );
};

export default TeamAreaSix;
