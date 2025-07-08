import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
const ServiceAreaGroupFive = () => {
  return (
    <>
      {/* service area start */}
      <div className="service-area bg-relative pd-top-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb">
                  <img src="assets/img/service-icon/1.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Only the best</Link>
                  </h5>
                  <p>
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb">
                  <img src="assets/img/service-icon/2.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">Focusing on details</Link>
                  </h5>
                  <p>
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-service-inner style-3">
                <div className="thumb">
                  <img src="assets/img/service-icon/3.png" alt="img" />
                </div>
                <div className="details">
                  <h5>
                    <Link href="/service-details">No flaws here</Link>
                  </h5>
                  <p>
                    You can access SaaS applications through a web browser or
                    mobile app, as long as you have an internet connection
                  </p>
                  <Link className="read-more-text" href="/service-details">
                    Touch More <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* service area end */}
    </>
  );
};

export default ServiceAreaGroupFive;
