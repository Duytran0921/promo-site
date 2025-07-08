import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaRegFolderOpen, FaRegUser } from 'react-icons/fa';
const BlogAreaThree = () => {
  return (
    <>
      {/*===================== Blog Area Three start =====================*/}
      <div className="blog-area pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="section-title">
            <div className="row">
              <div className="col-lg-7">
                <h6 className="sub-title">RECENT BLOG</h6>
                <h2 className="title">
                  Customer Applications At <span>Affordable</span> Prices
                </h2>
              </div>
              <div className="col-lg-5 text-lg-end align-self-end">
                <Link className="btn btn-border-base" href="/blog">
                  More Blogs
                </Link>
              </div>
            </div>
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
                  <p className="date">31 December,2022</p>
                </div>
                <div className="details">
                  <ul className="blog-meta p-0">
                    <li>
                      <FaRegUser className="mb-1" /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen className="mb-1" /> Category
                    </li>
                  </ul>
                  <h5 className="mb-4">
                    <Link href="/blog-details">
                      Transforming businesses, one pixel at a time
                    </Link>
                  </h5>
                  <Link className="btn btn-border-base" href="/blog-details">
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
                  <p className="date">31 November,2022</p>
                </div>
                <div className="details">
                  <ul className="blog-meta p-0">
                    <li>
                      <FaRegUser className="mb-1" /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen className="mb-1" /> Category
                    </li>
                  </ul>
                  <h5 className="mb-4">
                    <Link href="/blog-details">
                      The Importance of a Strong Digital for Strategy
                    </Link>
                  </h5>
                  <Link className="btn btn-border-base" href="/blog-details">
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
                  <p className="date">31 December,2022</p>
                </div>
                <div className="details">
                  <ul className="blog-meta p-0">
                    <li>
                      <FaRegUser className="mb-1" /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen className="mb-1" /> Category
                    </li>
                  </ul>
                  <h5 className="mb-4">
                    <Link href="/blog-details">
                      Creating Engaging Content: A Guide for Digital
                    </Link>
                  </h5>
                  <Link className="btn btn-border-base" href="/blog-details">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== BlogAreaThree End =====================*/}
    </>
  );
};

export default BlogAreaThree;
