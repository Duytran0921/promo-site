import Link from 'next/link';
import React from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';

const ProjectAreaGroup = () => {
  return (
    <>
      <div className="project-area bg-relative pd-top-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-case-study-inner">
                <div className="thumb">
                  <img src="assets/img/case-study/1.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow" href="#">
                    <FaAngleDoubleRight className="mb-1" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-case-study-inner">
                <div className="thumb">
                  <img src="assets/img/case-study/2.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow" href="#">
                    <FaAngleDoubleRight className="mb-1" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-case-study-inner">
                <div className="thumb">
                  <img src="assets/img/case-study/3.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/project-details">Tecnology Farms</Link>
                  </h5>
                  <Link className="cat" href="#">
                    Las vegas
                  </Link>
                  <Link className="right-arrow" href="#">
                    <FaAngleDoubleRight className="mb-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectAreaGroup;
