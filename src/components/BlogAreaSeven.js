import Link from 'next/link';
import React from 'react';
import { FaChevronRight, FaRegFolderOpen, FaUserAlt } from 'react-icons/fa';
const BlogAreaSeven = () => {
  return (
    <>
      {/*===================== Blog Area  start =====================*/}
      <div className="blog-area pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="section-title">
            <div className="row">
              <div className="col-lg-5">
                <h2 className="title">
                  Unlock the value of your digital creations
                </h2>
              </div>
              <div className="col-lg-7 text-lg-end align-self-center">
                <Link className="btn btn-base-pink" href="/about">
                  More Blogs <FaChevronRight className="mt-4" />
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
                    src="assets/img/home-8/56.png"
                    alt="img"
                  />
                </div>
                <div className="details pink">
                  <ul className="blog-meta ps-0">
                    <li>
                      <FaUserAlt /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen /> Category
                    </li>
                  </ul>
                  <h5 className="mb-3">
                    <Link href="/blog-details">
                      Transforming the world of ownership with NFTs
                    </Link>
                  </h5>
                  <p className="mb-3">
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <Link className="btn btn-base-pink" href="/blog-details">
                    Read More <FaChevronRight className="mt-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/home-8/57.png"
                    alt="img"
                  />
                </div>
                <div className="details pink">
                  <ul className="blog-meta ps-0">
                    <li>
                      <FaUserAlt /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen /> Category
                    </li>
                  </ul>
                  <h5 className="mb-3">
                    <Link href="/blog-details">
                      The future of collecting is here with NFTs
                    </Link>
                  </h5>
                  <p className="mb-3">
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <Link className="btn btn-base-pink" href="/blog-details">
                    Read More <FaChevronRight className="mt-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-blog-list">
                <div className="thumb">
                  <img
                    className="border-radius-5"
                    src="assets/img/home-8/58.png"
                    alt="img"
                  />
                </div>
                <div className="details pink">
                  <ul className="blog-meta ps-0">
                    <li>
                      <FaUserAlt /> By Admin
                    </li>
                    <li>
                      <FaRegFolderOpen /> Category
                    </li>
                  </ul>
                  <h5 className="mb-3">
                    <Link href="/blog-details">
                      The new standard for digital ownership
                    </Link>
                  </h5>
                  <p className="mb-3">
                    Melbourne is simply is dumiomy is text Lorem Ipsum is simply
                  </p>
                  <Link className="btn btn-base-pink" href="/blog-details">
                    Read More <FaChevronRight className="mt-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== BlogAreaFive End =====================*/}
    </>
  );
};

export default BlogAreaSeven;
