import Link from 'next/link';
import React from 'react';

const ContactAreaFive = () => {
  return (
    <>
      {/*================= counter area start {/*=================*/}
      <div className="contact-area">
        <div className="container">
          <div className="contact-inner-1">
            <div className="row">
              <div
                className="col-lg-8 wow animated fadeInLeft"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="1500"
              >
                <img
                  className="w-100"
                  src="assets/img/home-6/11.png"
                  alt="img"
                />
              </div>
              <div
                className="col-lg-4 wow animated fadeInRight"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="1500"
              >
                <div className="section-title mb-0">
                  <h6 className="bg-none color-base mb-3">GET IN TOUCH</h6>
                  <h2 className="title">Simple Touch here?</h2>
                  <p className="content">
                    For your car we will do everything advice design in us
                    repairs and maintenance. We are the some preferred.
                  </p>
                  <form className="mt-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Name" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Email" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Phone" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="single-input-inner style-border">
                          <input type="text" placeholder="Your Subject" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="single-input-inner style-border">
                          <textarea placeholder="Message" defaultValue={''} />
                        </div>
                      </div>
                      <div className="col-12">
                        <Link
                          className="btn btn-base mt-0 w-100 border-radius-5"
                          href="#"
                        >
                          Submit now
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*{/*================= counter area end {/*=================*/}
    </>
  );
};

export default ContactAreaFive;
