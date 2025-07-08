import Link from 'next/link';
import React from 'react';
import {
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const FooterSix = () => {
  return (
    <>
      {/* ================== Footer  Start ==================*/}
      <footer className="footer-area footer-area_6 footer-area-2 bg-gray mt-0 pd-top-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 ps-xl-5">
              <div className="widget widget_nav_menu">
                <h4 className="widget-title">
                  <img
                    className="me-1"
                    src="assets/img/home-8/59.png"
                    alt="img"
                  />{' '}
                  Our Service
                </h4>
                <ul>
                  <li>
                    <Link href="/service">Ui Design</Link>
                  </li>
                  <li>
                    <Link href="/service">Web design</Link>
                  </li>
                  <li>
                    <Link href="/service">Digital marketing </Link>
                  </li>
                  <li>
                    <Link href="/service">Video Editing</Link>
                  </li>
                  <li>
                    <Link href="/service">Pc Repairs</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 ps-xl-5">
              <div className="widget widget_nav_menu">
                <h4 className="widget-title">
                  <img
                    className="me-1"
                    src="assets/img/home-8/59.png"
                    alt="img"
                  />{' '}
                  Pay links
                </h4>
                <ul>
                  <li>
                    <Link href="/service">
                      <img
                        className="me-1"
                        src="assets/img/home-8/60.png"
                        alt="img"
                      />{' '}
                      Credit industrys
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <img
                        className="me-1"
                        src="assets/img/home-8/60.png"
                        alt="img"
                      />{' '}
                      Reasearch sector
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <img
                        className="me-1"
                        src="assets/img/home-8/60.png"
                        alt="img"
                      />{' '}
                      Finance Sector{' '}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <img
                        className="me-1"
                        src="assets/img/home-8/60.png"
                        alt="img"
                      />{' '}
                      Credit industrys
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <img
                        className="me-1"
                        src="assets/img/home-8/60.png"
                        alt="img"
                      />{' '}
                      Reasearch sector
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-recent-post">
                <h4 className="widget-title">
                  <img
                    className="me-1"
                    src="assets/img/home-8/59.png"
                    alt="img"
                  />{' '}
                  Contact us
                </h4>
                <div className="widget widget_contact">
                  <ul className="details">
                    <li>
                      <img
                        className="me-1"
                        src="assets/img/home-8/61.png"
                        alt="img"
                      />{' '}
                      4517 Washington Ave. Manchester, Kentucky 39495
                    </li>
                    <li className="mt-3">
                      <img
                        className="me-1"
                        src="assets/img/home-8/62.png"
                        alt="img"
                      />{' '}
                      (+888) 123 456 765
                    </li>
                    <li className="mt-2">
                      <img
                        className="me-1"
                        src="assets/img/home-8/63.png"
                        alt="img"
                      />{' '}
                      infoname@mail.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="widget widget_about p-0 ps-xl-4"
                style={{ backgroundColor: 'transparent' }}
              >
                <h4 className="widget-title">
                  <img
                    className="me-1"
                    src="assets/img/home-8/59.png"
                    alt="img"
                  />{' '}
                  Subscribe
                </h4>
                <div className="details">
                  <div className="subscribe mt-4">
                    <input type="text" placeholder="E-mail" />
                    <button className="pink-bg-color">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 align-self-center">
                <Link href="index-1">
                  <img src="assets/img/home-8/PromoLogo2.png" alt="img" />
                </Link>
              </div>
              <div className="col-lg-4 align-self-center">
                <ul className="social-media text-lg-center mt-lg-0 mt-3 mb-lg-0 mb-3">
                  <li>
                    <Link className="border-radius-50 bg-white" href="#">
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link className="border-radius-50 bg-white" href="#">
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link className="border-radius-50 bg-white" href="#">
                      <FaInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link className="border-radius-50 bg-white" href="#">
                      <FaYoutube />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4  align-self-center text-lg-end">
                <p className="mb-0">© AglieTech 2024 | All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================== Footer Two  end ==================*/}
    </>
  );
};

export default FooterSix;
