import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaRegFolderOpen, FaRegUser } from 'react-icons/fa';

const BlogAreaEight = () => {
  return (
    <>
      {/* blog-area start */}
      <div className="blog-area pd-top-115">
        <div className="container">
          <div className="section-title text-center">
            <h6>Latest News</h6>
            <h2 className="title">Data Security is Our Top Priority</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/blog/4.png"
                    alt="img"
                  />
                </div>
                <div className="details">
                  <ul className="blog-meta ps-0">
                    <li>
                      <FaRegUser className="mb-1" /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen className="mb-1" /> Category
                    </li>
                  </ul>
                  <h5 className="mb-3">
                    <Link href="/blog-details">Transforming pixel at a time</Link>
                  </h5>
                  <p className="mb-3">
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <Link className="read-more-text" href="/blog-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/blog/5.png"
                    alt="img"
                  />
                </div>
                <div className="details">
                  <ul className="blog-meta ps-0">
                    <li>
                      <FaRegUser className="mb-1" /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen className="mb-1" /> Category
                    </li>
                  </ul>
                  <h5 className="mb-3">
                    <Link href="/blog-details">
                      {' '}
                      Businesses, one pixel at a time
                    </Link>
                  </h5>
                  <p className="mb-3">
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <Link className="read-more-text" href="/blog-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/blog/6.png"
                    alt="img"
                  />
                </div>
                <div className="details">
                  <ul className="blog-meta ps-0">
                    <li>
                      <FaRegUser className="mb-1" /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen className="mb-1" /> Category
                    </li>
                  </ul>
                  <h5 className="mb-3">
                    <Link href="/blog-details">Your trusted tech experts</Link>
                  </h5>
                  <p className="mb-3">
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <Link className="read-more-text" href="/blog-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* blog-area start */}
    </>
  );
};

export default BlogAreaEight;
