import React from "react";
const CounterAreaFive = () => {
  return (
    <>
      {/*================= counter area start {/*=================*/}
      <div
        className='counter-area bg-relative bg-cover pd-top-110 pd-bottom-100'
        style={{ backgroundImage: 'url("./assets/img/home-6/12.png")' }}
      >
        <div className='container pd-bottom-90'>
          <div className='row'>
            <div
              className='col-lg-3 col-md-6 wow animated fadeInUp'
              data-aos='fade-up'
              data-aos-delay='100'
              data-aos-duration='1500'
            >
              <div className='single-counter-inner text-center'>
                <div className='thumb'>
                  <img src='assets/img/home-6/7.png' alt='img' />
                </div>
                <h2 className='text-white mt-4 mb-2'>
                  <span className='counter'>200</span>+
                </h2>
                <p className='text-white'>Team member</p>
              </div>
            </div>
            <div
              className='col-lg-3 col-md-6 wow animated fadeInUp'
              data-aos='fade-up'
              data-aos-delay='200'
              data-aos-duration='1500'
            >
              <div className='single-counter-inner text-center'>
                <div className='thumb'>
                  <img src='assets/img/home-6/8.png' alt='img' />
                </div>
                <h2 className='text-white mt-4 mb-2'>
                  <span className='counter'>10</span>k+
                </h2>
                <p className='text-white'>Complete project</p>
              </div>
            </div>
            <div
              className='col-lg-3 col-md-6 wow animated fadeInUp'
              data-aos='fade-up'
              data-aos-delay='300'
              data-aos-duration='1500'
            >
              <div className='single-counter-inner text-center'>
                <div className='thumb'>
                  <img src='assets/img/home-6/9.png' alt='img' />
                </div>
                <h2 className='text-white mt-4 mb-2'>
                  <span className='counter'>200</span>+
                </h2>
                <p className='text-white'>Winning award</p>
              </div>
            </div>
            <div
              className='col-lg-3 col-md-6 wow animated fadeInUp'
              data-aos='fade-up'
              data-aos-delay='400'
              data-aos-duration='1500'
            >
              <div className='single-counter-inner text-center'>
                <div className='thumb'>
                  <img src='assets/img/home-6/10.png' alt='img' />
                </div>
                <h2 className='text-white mt-4 mb-2'>
                  <span className='counter'>200</span>+
                </h2>
                <p className='text-white'>Client review</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*{/*================= counter area end {/*=================*/}
    </>
  );
};

export default CounterAreaFive;
