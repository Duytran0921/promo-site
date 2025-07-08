import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const TeamAreaFour = () => {
  return (
    <>
      {/*====================== team area start ======================*/}
      <div
        className='team-area bg-relative pd-top-115 pd-bottom-100'
        style={{ backgroundImage: 'url("./assets/img/home-6/17.png")' }}
      >
        <div className='container'>
          <div className='section-title text-center style-white'>
            <h6 className='text-white mb-3 bg-none'>Dedicated team</h6>
            <h2 className='title'>Data Security is Our Top Priority</h2>
          </div>
          <div className='row'>
            <div className='col-lg-4 col-md-6'>
              <div className='single-team-inner style-3 text-center'>
                <div className='thumb'>
                  <img src='assets/img/team/1.png' alt='img' />
                  <ul className='team-social-inner'>
                    <li>
                      <Link href='#'>
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link href='#'>
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link href='#'>
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='details'>
                  <h5>
                    <Link href='/team-details'>Kathryn Murphy</Link>
                  </h5>
                  <p>Merketing Department</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='single-team-inner style-3 text-center'>
                <div className='thumb'>
                  <img src='assets/img/team/2.png' alt='img' />
                  <ul className='team-social-inner'>
                    <li>
                      <Link href='#'>
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link href='#'>
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link href='#'>
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='details'>
                  <h5>
                    <Link href='/team-details'>Kathryn Murphy</Link>
                  </h5>
                  <p>Merketing Department</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='single-team-inner style-3 text-center'>
                <div className='thumb'>
                  <img src='assets/img/team/3.png' alt='img' />
                  <ul className='team-social-inner'>
                    <li>
                      <Link href='#'>
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link href='#'>
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link href='#'>
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className='details'>
                  <h5>
                    <Link href='/team-details'>Kathryn Murphy</Link>
                  </h5>
                  <p>Merketing Department</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== team area end ======================*/}
    </>
  );
};

export default TeamAreaFour;
