import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const WorkProcessSix = () => {
  return (
    <>
      {/*==================== Work Process start ====================*/}
      <div className="work-process-area work-process-area_6 pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="section-title text-center">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <h2 className="title">From Virtual To Tangible With NFTs</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner style-3 text-center">
                <div className="details">
                  <p>Work 01</p>
                  <h5 className="mb-3">Software Research</h5>
                  <p className="content">
                    Research ipsum dolor sit consec tetur sed diam in the
                    aliquam tempor
                  </p>
                  <Link className="btn btn-base-pink mt-4" href="#">
                    Read More <FaChevronRight className="mt-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner style-3 text-center">
                <div className="details">
                  <p>Work 02</p>
                  <h5 className="mb-3">Create Programs</h5>
                  <p className="content">
                    Create ipsum dolor sit consec tetur sed diam in the aliquam
                    tempor
                  </p>
                  <Link className="btn btn-base-pink mt-4" href="#">
                    Read More <FaChevronRight className="mt-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-work-process-inner style-3 text-center">
                <div className="details">
                  <p>Work 03</p>
                  <h5 className="mb-3">Develope Software</h5>
                  <p className="content">
                    Develope ipsum dolor sit consec tetur sed diam in the
                    aliquam tempor
                  </p>
                  <Link className="btn btn-base-pink mt-4" href="#">
                    Read More <FaChevronRight className="mt-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Work Process Three end ====================*/}
    </>
  );
};

export default WorkProcessSix;
