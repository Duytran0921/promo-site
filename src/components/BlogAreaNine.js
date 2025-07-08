import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaRegFolderOpen, FaRegUser } from 'react-icons/fa';

const BlogAreaNine = () => {
  return (
    <>
      {/* blog-area start */}
      <div className="blog-area blog-area_9 bg-black-ico pd-top-120 pd-bottom-120">
        <div className="container pb-5">
          <div className="section-title">
            <div className="row">
              <div className="col-lg-5">
                <h6 className="sub-title line-after text-white">Our Team</h6>
                <h2 className="title text-white">
                  Unlock the potential of blockchain investing
                </h2>
              </div>
              <div className="col-lg-7 text-lg-end align-self-center">
                <Link className="btn btn-base bg-base-9" href="/about">
                  More Blogs <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="single-blog-list bg-black-2-ico">
                <div className="row g-0">
                  <div className="col-sm-5">
                    <div className="thumb">
                      <img
                        className="w-100"
                        src="assets/img/home-9/24.png"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="col-sm-7 align-self-center">
                    <div className="details">
                      <ul className="blog-meta ps-0 text-white">
                        <li>
                          <FaRegUser className="mb-1" /> By Admin
                        </li>
                        <li>
                          <FaRegFolderOpen className="mb-1" /> Category
                        </li>
                      </ul>
                      <h5 className="mb-3 text-white">
                        <Link href="/blog-details">
                          Transforming the world of ownership with NFTs
                        </Link>
                      </h5>
                      <p className="mb-3 text-white">
                        Many desktop publishing packages web page editors now
                        use Lorem Ipsum a default model text, and a search for
                        'lorem ipsum
                      </p>
                      <Link
                        className="read-more-text text-white"
                        href="/blog-details"
                      >
                        Read More <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-blog-list bg-black-2-ico">
                <div className="row g-0">
                  <div className="col-sm-5">
                    <div className="thumb">
                      <img
                        className="w-100"
                        src="assets/img/home-9/25.png"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="col-sm-7 align-self-center">
                    <div className="details">
                      <ul className="blog-meta ps-0 text-white">
                        <li>
                          <FaRegUser className="mb-1" /> By Admin
                        </li>
                        <li>
                          <FaRegFolderOpen className="mb-1" /> Category
                        </li>
                      </ul>
                      <h5 className="mb-3 text-white">
                        <Link href="/blog-details">
                          Transforming the world of ownership with NFTs
                        </Link>
                      </h5>
                      <p className="mb-3 text-white">
                        Many desktop publishing packages web page editors now
                        use Lorem Ipsum a default model text, and a search for
                        'lorem ipsum
                      </p>
                      <Link
                        className="read-more-text text-white"
                        href="/blog-details"
                      >
                        Read More <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-blog-list bg-black-2-ico">
                <div className="row g-0">
                  <div className="col-sm-5">
                    <div className="thumb">
                      <img
                        className="w-100"
                        src="assets/img/home-9/26.png"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="col-sm-7 align-self-center">
                    <div className="details">
                      <ul className="blog-meta ps-0 text-white">
                        <li>
                          <FaRegUser className="mb-1" /> By Admin
                        </li>
                        <li>
                          <FaRegFolderOpen className="mb-1" /> Category
                        </li>
                      </ul>
                      <h5 className="mb-3 text-white">
                        <Link href="/blog-details">
                          Transforming the world of ownership with NFTs
                        </Link>
                      </h5>
                      <p className="mb-3 text-white">
                        Many desktop publishing packages web page editors now
                        use Lorem Ipsum a default model text, and a search for
                        'lorem ipsum
                      </p>
                      <Link
                        className="read-more-text text-white"
                        href="/blog-details"
                      >
                        Read More <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-blog-list bg-black-2-ico">
                <div className="row g-0">
                  <div className="col-sm-5">
                    <div className="thumb">
                      <img
                        className="w-100"
                        src="assets/img/home-9/27.png"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="col-sm-7 align-self-center">
                    <div className="details">
                      <ul className="blog-meta ps-0 text-white">
                        <li>
                          <FaRegUser className="mb-1" /> By Admin
                        </li>
                        <li>
                          <FaRegFolderOpen className="mb-1" /> Category
                        </li>
                      </ul>
                      <h5 className="mb-3 text-white">
                        <Link href="/blog-details">
                          Transforming the world of ownership with NFTs
                        </Link>
                      </h5>
                      <p className="mb-3 text-white">
                        Many desktop publishing packages web page editors now
                        use Lorem Ipsum a default model text, and a search for
                        'lorem ipsum
                      </p>
                      <Link
                        className="read-more-text text-white"
                        href="/blog-details"
                      >
                        Read More <FaArrowRight />
                      </Link>
                    </div>
                  </div>
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

export default BlogAreaNine;
