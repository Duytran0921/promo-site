import Link from 'next/link';
import React from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaCalendarAlt,
  FaRegUser,
  FaRegComments,
} from 'react-icons/fa';

const BlogGroupTwo = () => {
  return (
    <>
      {/* blog area start */}
      <div className="blog-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img src="assets/img/blog/4.png" alt="img" />
                </div>
                <div className="details">
                  <p className="date mb-3">
                    <FaCalendarAlt className="mb-1" />
                    October 19, 2023
                  </p>
                  <h5>
                    <Link href="/blog-details">
                      Transforming businesses, one pixel at a time
                    </Link>
                  </h5>
                  <div className="meta">
                    <div className="row">
                      <div className="col-6">
                        <p>
                          <FaRegUser className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                      <div className="col-6 text-end">
                        <p>
                          <FaRegComments className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img src="assets/img/blog/5.png" alt="img" />
                </div>
                <div className="details">
                  <p className="date mb-3">
                    <FaCalendarAlt className="mb-1" />
                    June 19, 2023
                  </p>
                  <h5>
                    <Link href="/blog-details">
                      The Importance of a Strong Digital for Strategy
                    </Link>
                  </h5>
                  <div className="meta">
                    <div className="row">
                      <div className="col-6">
                        <p>
                          <FaRegUser className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                      <div className="col-6 text-end">
                        <p>
                          <FaRegComments className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img src="assets/img/blog/6.png" alt="img" />
                </div>
                <div className="details">
                  <p className="date mb-3">
                    <FaCalendarAlt className="mb-1" />
                    October 19, 2023
                  </p>
                  <h5>
                    <Link href="/blog-details">
                      Creating Engaging Content: A Guide for Digital
                    </Link>
                  </h5>
                  <div className="meta">
                    <div className="row">
                      <div className="col-6">
                        <p>
                          <FaRegUser className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                      <div className="col-6 text-end">
                        <p>
                          <FaRegComments className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img src="assets/img/blog/7.png" alt="img" />
                </div>
                <div className="details">
                  <p className="date mb-3">
                    <FaCalendarAlt className="mb-1" />
                    October 19, 2023
                  </p>
                  <h5>
                    <Link href="/blog-details">
                      Transforming businesses, one pixel at a time
                    </Link>
                  </h5>
                  <div className="meta">
                    <div className="row">
                      <div className="col-6">
                        <p>
                          <FaRegUser className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                      <div className="col-6 text-end">
                        <p>
                          <FaRegComments className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img src="assets/img/blog/8.png" alt="img" />
                </div>
                <div className="details">
                  <p className="date mb-3">
                    <FaCalendarAlt className="mb-1" />
                    June 19, 2023
                  </p>
                  <h5>
                    <Link href="/blog-details">
                      The Importance of a Strong Digital for Strategy
                    </Link>
                  </h5>
                  <div className="meta">
                    <div className="row">
                      <div className="col-6">
                        <p>
                          <FaRegUser className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                      <div className="col-6 text-end">
                        <p>
                          <FaRegComments className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img src="assets/img/blog/9.png" alt="img" />
                </div>
                <div className="details">
                  <p className="date mb-3">
                    <FaCalendarAlt className="mb-1" />
                    October 19, 2023
                  </p>
                  <h5>
                    <Link href="/blog-details">
                      Creating Engaging Content: A Guide for Digital
                    </Link>
                  </h5>
                  <div className="meta">
                    <div className="row">
                      <div className="col-6">
                        <p>
                          <FaRegUser className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                      <div className="col-6 text-end">
                        <p>
                          <FaRegComments className="mb-1" />
                          Sam Curren
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pagination">
            <Link className="prev page-numbers" href="#">
              <FaAngleLeft />
            </Link>
            <Link className="page-numbers" href="#">
              1
            </Link>
            <span className="page-numbers current">2</span>
            <Link className="page-numbers" href="#">
              3
            </Link>
            <Link className="page-numbers" href="#">
              4
            </Link>
            <Link className="next page-numbers" href="#">
              <FaAngleRight />
            </Link>
          </div>
        </div>
      </div>
      {/* blog area end */}
    </>
  );
};

export default BlogGroupTwo;
