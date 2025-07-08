'use client'
import dynamic from 'next/dynamic';
import React from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ProgressOne = () => {
  let options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  let series = [44, 55, 13, 43, 22];

  return (
    <>
      {/* progress area start */}
      <div className="progress-area bg-black-ico bg-relative pd-top-110 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title style-white text-center">
                <h6 className="sub-title line-double text-white">
                  Token Allocation
                </h6>
                <h2 className="title">
                  A Platform For Generative Art NFTs That Are Created
                  Algorithmically
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 align-self-center">
              <div className="single-progress-inner mb-4 pb-2">
                <h6 className="p-title text-white mb-3">Nifty Gateway: 30%</h6>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '30%', background: '#00D199' }}
                    aria-valuenow={30}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="single-progress-inner mb-4">
                <h6 className="p-title text-white mb-3">Decentra land: 25%</h6>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '25%', background: '#C87B07' }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="single-progress-inner mb-4">
                <h6 className="p-title text-white mb-3">The Sandbox: 35%</h6>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '35%', background: '#A92535' }}
                    aria-valuenow={35}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="single-progress-inner mb-4">
                <h6 className="p-title text-white mb-3">Art Blocks: 20%</h6>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '20%', background: '#3D88FB' }}
                    aria-valuenow={20}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="single-progress-inner mb-4">
                <h6 className="p-title text-white mb-3">Crypto Kitties:28%</h6>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '28%', background: '#9116CD' }}
                    aria-valuenow={28}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="single-progress-inner mb-4">
                <h6 className="p-title text-white mb-3">NBA Top Shots:10%</h6>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '10%', background: '#5637C8' }}
                    aria-valuenow={10}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 text-center">
              <div className="ps-4">
                <div id="chart">
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="donut"
                  />
                </div>
                <div id="html-dist"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* progress area end */}
    </>
  );
};

export default ProgressOne;
