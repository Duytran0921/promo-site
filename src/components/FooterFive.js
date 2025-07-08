import Link from 'next/link';
import React from 'react';
import {
  FaCalendarAlt,
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

const FooterFive = () => {
  return (
    <>
      {/* ================== Footer Four Start ==================*/}
      <footer className="footer-area footer-area_5 bg-black mt-0">
        <div className="container">
          <div className="footer-top-2 bg-base p-5 border-radius-bottom-20">
            <div className="row">
              <div className="col-lg-4">
                <div className="media">
                  <div className="media-left me-3">
                    <img src="assets/img/home-6/18.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <h5 className="text-white">Contacts Info</h5>
                    <p className="text-white mb-0">
                      willie.jennings@example.com
                    </p>
                    <p className="text-white mb-0">
                      willie.jennings@example.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="media">
                  <div className="media-left me-3">
                    <img src="assets/img/home-6/19.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <h5 className="text-white">Opening Hour</h5>
                    <p className="text-white mb-0">Mon-Fri: 9:30AM - 6:30PM</p>
                    <p className="text-white mb-0">Sat-Sun: 1:30AM - 3:30PM</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="media">
                  <div className="media-left me-3">
                    <img src="assets/img/home-6/20.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <h5 className="text-white">Contacts Info</h5>
                    <p className="text-white mb-0">
                      2715 Ash Dr. San Jose, South <br /> Dakota 83475
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pd-top-100">
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="widget widget_about">
                <div className="thumb">
                  <img src="assets/img/PromoLogo.png" alt="img" />
                </div>
                <div className="details">
                  <p>
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <div className="subscribe mt-4">
                    <input
                      className="pe-2 border-radius-0"
                      type="text"
                      placeholder="E-mail"
                    />
                  </div>
                  <ul className="social-media">
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
                    <li>
                      <Link href="#">
                        <FaYoutube />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_nav_menu ps-xl-5">
                <h4 className="widget-title">All LINKS</h4>
                <ul>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Credit industrys
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Reasearch sector
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Finance Sector{' '}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Credit industrys
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Reasearch sector
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Finance Sector
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_nav_menu">
                <h4 className="widget-title">Our Service</h4>
                <ul>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Ui Design
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Web design
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Digital marketing{' '}
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Video Editing
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Pc Repairs
                    </Link>
                  </li>
                  <li>
                    <Link href="/service">
                      <FaChevronRight /> Web Development
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-recent-post">
                <h4 className="widget-title">Recent Blog</h4>
                <ul>
                  <li>
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/widget/1.png" alt="blog" />
                      </div>
                      <div className="media-body align-self-center">
                        <div className="post-info mb-2">
                          <FaCalendarAlt />
                          <span>january 11, 2023</span>
                        </div>
                        <h6 className="title mb-0">
                          <Link href="/blog-details">
                            Social Media For Promote Business.
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/widget/2.png" alt="blog" />
                      </div>
                      <div className="media-body align-self-center">
                        <div className="post-info mb-2">
                          <FaCalendarAlt />
                          <span>january 11, 2023</span>
                        </div>
                        <h6 className="title mb-0">
                          <Link href="/blog-details">
                            Marketing For Base market watch
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom bg-base">
          <div className="container">
            <div className="row">
              <div className="col-md-6 align-self-center">
                <p>© AglieTech 2024 | All Rights Reserved</p>
              </div>
              <div className="col-md-6 text-lg-end">
                <Link href="#">Trams &amp; Condition</Link>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================== Footer Two  end ==================*/}
    </>
  );
};

export default FooterFive;
