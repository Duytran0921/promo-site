import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const TeamAreaGroupTwo = () => {
  return (
    <>
      {/* team area start */}
      <div className="team-area bg-relative pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-team-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/team/4.png" alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h5>
                      <Link href="/team-details">Devon Lane</Link>
                    </h5>
                    <p>Merketing Department</p>
                    <ul className="team-social-inner mt-3 mb-1">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-team-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/team/5.png" alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h5>
                      <Link href="/team-details">Falcon Lane</Link>
                    </h5>
                    <p>Merketing Department</p>
                    <ul className="team-social-inner mt-3 mb-1">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-team-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/team/6.png" alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h5>
                      <Link href="/team-details">Wilson Jac</Link>
                    </h5>
                    <p>Merketing Department</p>
                    <ul className="team-social-inner mt-3 mb-1">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-team-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/team/4.png" alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h5>
                      <Link href="/team-details">Devon Lane</Link>
                    </h5>
                    <p>Merketing Department</p>
                    <ul className="team-social-inner mt-3 mb-1">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-team-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/team/5.png" alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h5>
                      <Link href="/team-details">Falcon Lane</Link>
                    </h5>
                    <p>Merketing Department</p>
                    <ul className="team-social-inner mt-3 mb-1">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-team-inner style-2 text-center">
                <div className="thumb">
                  <img src="assets/img/team/6.png" alt="img" />
                </div>
                <div className="details">
                  <div className="details-inner">
                    <h5>
                      <Link href="/team-details">Wilson Jac</Link>
                    </h5>
                    <p>Merketing Department</p>
                    <ul className="team-social-inner mt-3 mb-1">
                      <li>
                        <Link href="#">
                          <FaFacebookF />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaTwitter />
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <FaInstagram />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* team area end */}
    </>
  );
};

export default TeamAreaGroupTwo;
