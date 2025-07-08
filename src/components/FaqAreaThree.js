import React from 'react';

const FaqAreaThree = () => {
  return (
    <>
      {/*==================== Faq area start ====================*/}
      <div className="contact-area pd-top-110 FaqAreaThree">
        <div className="container">
          <div className="contact-inner-1 mt-0">
            <div className="row justify-content-center">
              <div
                className="col-lg-5 wow animated fadeInLeft"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <img
                  className="w-100"
                  src="assets/img/home-8/48.png"
                  alt="img"
                />
              </div>
              <div
                className="col-lg-5 wow animated fadeInRight"
                data-wow-duration="1.5s"
                data-wow-delay="0.3s"
              >
                <div className="section-title mb-0">
                  <h2 className="title">Discover the unique world of NFTs</h2>
                  <div
                    className="accordion accordion-inner mt-3"
                    id="accordionExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          What is an NFT?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Many desktop publishing packages and web page editors
                          now use Lorem Ipsum as their default model text,
                          search for 'lorem ipsum' will uncover
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          How do I buy an NFT?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Many desktop publishing packages and web page editors
                          now use Lorem Ipsum as their default model text,
                          search for 'lorem ipsum' will uncover
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          What can I do with an NFT?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Many desktop publishing packages and web page editors
                          now use Lorem Ipsum as their default model text,
                          search for 'lorem ipsum' will uncover
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Are NFTs secure?
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Many desktop publishing packages and web page editors
                          now use Lorem Ipsum as their default model text,
                          search for 'lorem ipsum' will uncover
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Faq area end ====================*/}
    </>
  );
};

export default FaqAreaThree;
