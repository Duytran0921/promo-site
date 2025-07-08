'use client'
import React, { useState } from 'react';
import {
    FaAngleDoubleRight,
    FaArrowAltCircleRight,
    FaRegCheckCircle,
    FaPlay,
    FaStar,
    FaRegUser,
    FaArrowRight,
    FaSearch,
} from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
import ModalVideo from 'react-modal-video';
import Link from 'next/link';
const HomeTenInner = () => {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div style={{ background: '#021638' }}>
                {/* search popup start*/}
                <div className="td-search-popup" id="td-search-popup">
                    <form action="/" className="search-form">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search....."
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            <FaSearch />
                        </button>
                    </form>
                </div>
                {/* search popup end*/}
                <div className="body-overlay" id="body-overlay" />
                {/* page title start */}
                <div
                    id="banner"
                    className="banner-area banner-area_single banner-area-left-style mt-0 bg-relative banner-area-1 banner-area-8 pd-bottom-100 bg-cover"
                    style={{ backgroundImage: 'url("./assets/img/home-10/12.png")' }}
                >
                    <div className="banner-left">
                        <div className="logo">
                            <Link href="/index-1">
                                <img src="assets/img/home-10/PromoLogo.png" alt="img" />
                            </Link>
                        </div>
                        <ul>
                            <li>
                                <a href="#banner">
                                    <img src="assets/img/home-10/1.png" alt="img" />
                                </a>
                            </li>
                            <li>
                                <a href="#about">
                                    <img src="assets/img/home-10/2.png" alt="img" />
                                </a>
                            </li>
                            <li>
                                <a href="#innovating">
                                    <img src="assets/img/home-10/3.png" alt="img" />
                                </a>
                            </li>
                            <li>
                                <a href="#service">
                                    <img src="assets/img/home-10/4.png" alt="img" />
                                </a>
                            </li>
                            <li>
                                <a href="#skill">
                                    <img src="assets/img/home-10/5.png" alt="img" />
                                </a>
                            </li>
                            <li>
                                <a href="#pricing">
                                    <img src="assets/img/home-10/6.png" alt="img" />
                                </a>
                            </li>
                            <li>
                                <a href="#testimonial">
                                    <img src="assets/img/home-10/7.png" alt="img" />
                                </a>
                            </li>
                            <li>
                                <a href="#contact">
                                    <img src="assets/img/home-10/8.png" alt="img" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="container pt-xl-5 pb-xl-5">
                        <div className="row">
                            <div className="col-lg-6 col-md-5 col-7 order-lg-2">
                                <div
                                    className="position-relative mt-lg-0 wow animated fadeInRight"
                                    data-wow-duration="1.5s"
                                    data-wow-delay="0.3s"
                                >
                                    <img
                                        className="main-img"
                                        src="assets/img/home-10/9.png"
                                        alt="img"
                                    />
                                    <img
                                        className="animate-img top_image_bounce"
                                        src="assets/img/home-10/10.png"
                                        alt="img"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 order-lg-1 align-self-center">
                                <div className="banner-inner pe-xl-5">
                                    <h2
                                        className="mb-2 title text-white wow animated fadeInLeft"
                                        data-wow-duration="1.5s"
                                        data-wow-delay="0.4s"
                                    >
                                        Hi ! I’m Philip{' '}
                                    </h2>
                                    <h3
                                        className="mb-3 mb-lg-4 text-white wow animated fadeInLeft mb-0"
                                        data-wow-duration="1.5s"
                                        data-wow-delay="0.4s"
                                    >
                                        UI/UX designer
                                    </h3>
                                    <p
                                        className="content text-white pe-xl-5 wow animated fadeInLeft"
                                        data-wow-duration="1.5s"
                                        data-wow-delay="0.5s"
                                    >
                                        As a passionate UI/UX designer, I thrive on creating
                                        beautiful and intuitive digital experiences that delight
                                        users.
                                    </p>
                                    <Link
                                        className="me-lg-2 me-1 btn btn-base_6 wow animated fadeInLeft"
                                        data-wow-duration="1.5s"
                                        data-wow-delay="0.6s"
                                        href="/about"
                                    >
                                        My Resume <FaArrowAltCircleRight className="mt-4" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="btn btn-gray wow animated fadeInLeft  mt-4 mt-md-0"
                                        data-wow-duration="1.5s"
                                        data-wow-delay="0.6s"
                                        onClick={() => setOpen(true)}
                                    >
                                        <FaPlay className="mt-4" /> Watch Video
                                    </Link>
                                    <div
                                        className="media wow animated fadeInLeft mb-0 mt-xl-5 mt-4 pt-xl-5"
                                        data-wow-duration="1.5s"
                                        data-wow-delay="0.5s"
                                    >
                                        <div className="media-left me-3">
                                            <img
                                                className="main-img"
                                                src="assets/img/home-10/11.png"
                                                alt="img"
                                            />
                                        </div>
                                        <div className="media-body">
                                            <h2 className="text-white mb-0">20+</h2>
                                            <p className="text-white">Winning award</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* banner end */}
                {/* about area start */}
                <div id="about" className="about-area bg-black-ico pd-top-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div
                                    className="about-thumb-inner pe-xl-5 me-xl-5 wow animated fadeInLeft"
                                    data-wow-duration="1.5s"
                                    data-wow-delay="0.3s"
                                >
                                    <img
                                        className="main-img"
                                        src="assets/img/home-10/15.png"
                                        alt="img"
                                    />
                                </div>
                            </div>
                            <div
                                className="col-lg-6 wow animated fadeInRight"
                                data-wow-duration="1.5s"
                                data-wow-delay="0.3s"
                            >
                                <div className="section-title">
                                    <h6 className="sub-title bg-none p-0 mb-3 color-base_6_6">
                                        About Me
                                    </h6>
                                    <h2 className="title text-white">
                                        Best Result User <br /> Experience
                                    </h2>
                                    <p className="content mb-4 mb-xl-5 text-white">
                                        I am PHILIP, having professional experience of design 100+
                                        clients over the World. I am dedicated to provide best
                                        service for you.
                                    </p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="single-about-inner-2">
                                                <div className="thumb mb-3">
                                                    <img src="assets/img/home-10/13.png" alt="img" />
                                                </div>
                                                <div className="details">
                                                    <h5 className="text-white">My Ambition</h5>
                                                    <p className="text-white">
                                                        I would like to work as a Graphics Designer in a
                                                        world famous company. I want to expand my skill on
                                                        Graphics Design industry.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-about-inner-2">
                                                <div className="thumb mb-3">
                                                    <img src="assets/img/home-10/14.png" alt="img" />
                                                </div>
                                                <div className="details">
                                                    <h5 className="text-white">My Purpose</h5>
                                                    <p className="text-white">
                                                        I want to be an online trainer who train junior
                                                        designers for how can they easily build up their
                                                        career in design industry.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* about area end */}
                {/* inovating area start */}
                <div id="innovating" className="inovating-area pd-top-90">
                    <div className="container">
                        <div className="border-bottom-2 pb-4 mb-5">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h2 className="text-white">
                                        Innovating For A Better Tomorrow
                                    </h2>
                                </div>
                                <div className="col-lg-6 align-self-center">
                                    <nav className="inovating-tab text-lg-end mt-4 mt-lg-0">
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button
                                                className="nav-link active"
                                                id="nav-home-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-home"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-home"
                                                aria-selected="true"
                                            >
                                                Experience
                                            </button>
                                            <button
                                                className="nav-link"
                                                id="nav-profile-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-profile"
                                                aria-selected="false"
                                            >
                                                Education
                                            </button>
                                            <button
                                                className="nav-link"
                                                id="nav-contact-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#nav-contact"
                                                type="button"
                                                role="tab"
                                                aria-controls="nav-contact"
                                                aria-selected="false"
                                            >
                                                Biography
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" id="nav-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="nav-home"
                                role="tabpanel"
                                aria-labelledby="nav-home-tab"
                            >
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">PromoGame Agency</p>
                                                <h6 className="text-white">
                                                    Framer Designer &amp; Developer
                                                </h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Huwai Technology</p>
                                                <h6 className="text-white">Web Application Manager</h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Softech Agency</p>
                                                <h6 className="text-white">Front and End Developer</h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Australia State University</p>
                                                <h6 className="text-white">
                                                    Bachelor Degree Of information Technology
                                                </h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="nav-profile"
                                role="tabpanel"
                                aria-labelledby="nav-profile-tab"
                            >
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Computer Science</p>
                                                <h6 className="text-white">
                                                    Framer Designer &amp; Developer
                                                </h6>
                                                <p className="text-white">
                                                    Cambridge University / 2004 - 2007
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Bachelor Degree</p>
                                                <h6 className="text-white">Web Application Manager</h6>
                                                <p className="text-white">
                                                    University of Tokyo / 2008 - 2010
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Master Degree</p>
                                                <h6 className="text-white">Front and End Developer</h6>
                                                <p className="text-white">
                                                    Harvard University / 2012 - 2015/p&gt;
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Australia State University</p>
                                                <h6 className="text-white">
                                                    Bachelor Degree Of information Technology
                                                </h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="nav-contact"
                                role="tabpanel"
                                aria-labelledby="nav-contact-tab"
                            >
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">PromoGame Agency</p>
                                                <h6 className="text-white">
                                                    Framer Designer &amp; Developer
                                                </h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Huwai Technology</p>
                                                <h6 className="text-white">Web Application Manager</h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Softech Agency</p>
                                                <h6 className="text-white">Front and End Developer</h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media mb-4">
                                            <div className="media-left color-base_6 pe-3">
                                                <FaAngleDoubleRight />
                                            </div>
                                            <div className="media-body">
                                                <p className="text-white">Australia State University</p>
                                                <h6 className="text-white">
                                                    Bachelor Degree Of information Technology
                                                </h6>
                                                <p className="text-white">2019 - Present</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* inovating area end */}
                {/* service area start */}
                <div id="service" className="service-area bg-relative pd-top-110 pb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="section-title style-white">
                                    <h6 className="sub-title bg-none p-0 mb-3 color-base_6">
                                        Service
                                    </h6>
                                    <h2 className="title">Service Offer From Me</h2>
                                    <Link className="me-2 btn btn-base_6" href="/service">
                                        All Service <FaArrowAltCircleRight className="mt-4" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-service-inner bg-gray_2 border-radius-0">
                                            <div className="thumb">
                                                <img src="assets/img/home-10/16.png" alt="img" />
                                            </div>
                                            <div className="details">
                                                <h5 className="text-white">
                                                    <Link href="/service-details">Website Design</Link>
                                                </h5>
                                                <p className="text-white mb-0">
                                                    Lorem is Ipsum is simply is design iomyi is text Lorem
                                                    Ipsum is simply is our busi Lorem is Ipsum is
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-service-inner bg-gray_2 border-radius-0">
                                            <div className="thumb">
                                                <img src="assets/img/home-10/17.png" alt="img" />
                                            </div>
                                            <div className="details">
                                                <h5 className="text-white">
                                                    <Link href="/service-details">Logo Design</Link>
                                                </h5>
                                                <p className="text-white mb-0">
                                                    Lorem is Ipsum is simply is design iomyi is text Lorem
                                                    Ipsum is simply is our busi Lorem is Ipsum is
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-service-inner bg-gray_2 border-radius-0">
                                            <div className="thumb">
                                                <img src="assets/img/home-10/18.png" alt="img" />
                                            </div>
                                            <div className="details">
                                                <h5 className="text-white">
                                                    <Link href="/service-details">Apps Development</Link>
                                                </h5>
                                                <p className="text-white mb-0">
                                                    Lorem is Ipsum is simply is design iomyi is text Lorem
                                                    Ipsum is simply is our busi Lorem is Ipsum is
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-service-inner bg-gray_2 border-radius-0">
                                            <div className="thumb">
                                                <img src="assets/img/home-10/19.png" alt="img" />
                                            </div>
                                            <div className="details">
                                                <h5 className="text-white">
                                                    <Link href="/service-details">Website Development</Link>
                                                </h5>
                                                <p className="text-white mb-0">
                                                    Lorem is Ipsum is simply is design iomyi is text Lorem
                                                    Ipsum is simply is our busi Lorem is Ipsum is
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* service area end */}
                {/* about area start */}
                <div
                    id="skill"
                    className="about-area about-area_single_page  pd-top-120 pd-bottom-90"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 align-self-center">
                                <div
                                    className="about-thumb-inner wow animated fadeInLeft"
                                    data-wow-duration="1.5s"
                                    data-wow-delay="0.3s"
                                >
                                    <img
                                        className="main-img"
                                        src="assets/img/home-10/20.png"
                                        alt="img"
                                    />
                                </div>
                            </div>
                            <div
                                className="col-lg-7 align-self-center wow animated fadeInRight"
                                data-wow-duration="1.5s"
                                data-wow-delay="0.3s"
                            >
                                <div className="section-title mt-5 mt-lg-0 mb-0">
                                    <h6 className="sub-title bg-none p-0 mb-3 color-base_6">
                                        My skill
                                    </h6>
                                    <h2 className="title text-white mb-4">
                                        My Path to Skill <br /> Mastery
                                    </h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="single-progressbar bg-transparent">
                                                <h6 className="text-white">HTML</h6>
                                                <div className="skill">
                                                    <div
                                                        style={{ width: '80%' }}
                                                        className="skill-bar skill1 wow slideInLeft animated"
                                                    ></div>
                                                    <p className="skill-count1">
                                                        <span className="counter">80</span> %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-progressbar bg-transparent">
                                                <h6 className="text-white">Wordpress</h6>
                                                <div className="skill">
                                                    <div
                                                        style={{ width: '90%' }}
                                                        className="skill-bar skill1 wow slideInLeft animated"
                                                    ></div>
                                                    <p className="skill-count1">
                                                        <span className="counter">90</span> %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-progressbar bg-transparent">
                                                <h6 className="text-white">Css</h6>
                                                <div className="skill">
                                                    <div
                                                        style={{ width: '60%' }}
                                                        className="skill-bar skill1 wow slideInLeft animated"
                                                    ></div>
                                                    <p className="skill-count1">
                                                        <span className="counter">60</span> %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-progressbar bg-transparent">
                                                <h6 className="text-white">After Effects</h6>
                                                <div className="skill">
                                                    <div
                                                        style={{ width: '75%' }}
                                                        className="skill-bar skill1 wow slideInLeft animated"
                                                    ></div>
                                                    <p className="skill-count1">
                                                        <span className="counter">75</span> %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-progressbar bg-transparent">
                                                <h6 className="text-white">Java Script</h6>
                                                <div className="skill">
                                                    <div
                                                        style={{ width: '70%' }}
                                                        className="skill-bar skill1 wow slideInLeft animated"
                                                    ></div>
                                                    <p className="skill-count1">
                                                        <span className="counter">70</span> %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-progressbar bg-transparent">
                                                <h6 className="text-white">Photoshop</h6>
                                                <div className="skill">
                                                    <div
                                                        style={{ width: '70%' }}
                                                        className="skill-bar skill1 wow slideInLeft animated"
                                                    ></div>
                                                    <p className="skill-count1">
                                                        <span className="counter">70</span> %
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* about area end */}
                {/* gallery area start */}
                <div className="gallery-area gallery-area_single_page  bg-relative">
                    <div className="container">
                        <div className="section-title style-white text-center">
                            <h6 className="sub-title bg-none p-0 mb-3 color-base_6">
                                Portfolio
                            </h6>
                            <h2 className="title">Meet My Projects</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-case-study-inner style-4">
                                    <div className="thumb  img-fit-container ">
                                        <img src="assets/img/home-10/21.png" alt="img" />
                                    </div>
                                    <div className="details">
                                        <h5>
                                            <Link href="/project-details">Tecnology Farms</Link>
                                        </h5>
                                        <Link className="cat" href="#">
                                            Las vegas
                                        </Link>
                                        <Link className="right-arrow" href="#">
                                            <FaAngleDoubleRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-case-study-inner style-4">
                                    <div className="thumb  img-fit-container ">
                                        <img src="assets/img/home-10/22.png" alt="img" />
                                    </div>
                                    <div className="details">
                                        <h5>
                                            <Link href="/project-details">Tecnology Farms</Link>
                                        </h5>
                                        <Link className="cat" href="#">
                                            Las vegas
                                        </Link>
                                        <Link className="right-arrow" href="#">
                                            <FaAngleDoubleRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-case-study-inner style-4">
                                    <div className="thumb  img-fit-container ">
                                        <img src="assets/img/home-10/23.png" alt="img" />
                                    </div>
                                    <div className="details">
                                        <h5>
                                            <Link href="/project-details">Tecnology Farms</Link>
                                        </h5>
                                        <Link className="cat" href="#">
                                            Las vegas
                                        </Link>
                                        <Link className="right-arrow" href="#">
                                            <FaAngleDoubleRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-case-study-inner style-4">
                                    <div className="thumb  img-fit-container ">
                                        <img src="assets/img/home-10/24.png" alt="img" />
                                    </div>
                                    <div className="details">
                                        <h5>
                                            <Link href="/project-details">Tecnology Farms</Link>
                                        </h5>
                                        <Link className="cat" href="#">
                                            Las vegas
                                        </Link>
                                        <Link className="right-arrow" href="#">
                                            <FaAngleDoubleRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-case-study-inner style-4">
                                    <div className="thumb  img-fit-container ">
                                        <img src="assets/img/home-10/25.png" alt="img" />
                                    </div>
                                    <div className="details">
                                        <h5>
                                            <Link href="/project-details">Tecnology Farms</Link>
                                        </h5>
                                        <Link className="cat" href="#">
                                            Las vegas
                                        </Link>
                                        <Link className="right-arrow" href="#">
                                            <FaAngleDoubleRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-case-study-inner style-4">
                                    <div className="thumb  img-fit-container ">
                                        <img src="assets/img/home-10/26.png" alt="img" />
                                    </div>
                                    <div className="details">
                                        <h5>
                                            <Link href="/project-details">Tecnology Farms</Link>
                                        </h5>
                                        <Link className="cat" href="#">
                                            Las vegas
                                        </Link>
                                        <Link className="right-arrow" href="#">
                                            <FaAngleDoubleRight />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* gallery area end */}
                {/* pricing-area start */}
                <div
                    id="pricing"
                    className="pricing-area pricing-area_single_page pd-top-90 pd-bottom-90"
                >
                    <div className="container">
                        <div className="section-title text-center style-white">
                            <h6 className="sub-title bg-transparent color-base_6 p-0">
                                My Pricing Plan
                            </h6>
                            <h2 className="title">Best Pricing Plan for You</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-pricing-inner style-2 bg-gray_2 border-radius-30">
                                    <h5 className="mb-2 text-white">Logo Design</h5>
                                    <h2 className="mb-4 text-white">$19</h2>
                                    <ul>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> 1 Minimalist logo
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Unique design
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Logo transparency
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Printable file
                                        </li>
                                    </ul>
                                    <Link className="btn btn-base_6 border-radius w-100" href="#">
                                        Choose Plan
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-pricing-inner style-2 bg-gray_2 border-radius-30 price-active">
                                    <h5 className="mb-2 text-white">Web Design</h5>
                                    <h2 className="mb-4 text-white">$29</h2>
                                    <ul>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> 10 Figma design page
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Well organized layer
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Bootstrap 5 grid system
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Easily customizable
                                        </li>
                                    </ul>
                                    <Link className="btn btn-base border-radius w-100" href="#">
                                        Choose Plan
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-pricing-inner style-2 bg-gray_2 border-radius-30">
                                    <h5 className="mb-2 text-white">Web Development</h5>
                                    <h2 className="mb-4 text-white">$39</h2>
                                    <ul>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> 10 Dynamic page
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Easily customizable
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Bootstrap 5 template
                                        </li>
                                        <li className="text-white">
                                            <FaRegCheckCircle /> Responsive design
                                        </li>
                                    </ul>
                                    <Link className="btn btn-base_6 border-radius w-100" href="#">
                                        Choose Plan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* pricing-area start */}
                {/* testimonial-area start */}
                <div
                    id="testimonial"
                    className="testimonial-area testimonial-area_single_page bg-gray_2 position-relative pd-top-100 pd-bottom-100 me-xl-5 ms-xl-5"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="section-title style-white">
                                    <h6 className="sub-title bg-transparent color-base_6 p-0">
                                        Testimonials
                                    </h6>
                                    <h2 className="title">Amazing Feedbacks!</h2>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="single-testimonial-inner style-4">
                                            <div className="thumb">
                                                <img src="assets/img/home-10/28.png" alt="img" />
                                            </div>
                                            <p className="text-white">
                                                Contrary popular belief, Lorem in simply random text. It
                                                has roots a piece of classical Latin
                                            </p>
                                            <div className="ratting-inner mt-3 mb-1">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <h6 className="text-white">Devon Lane</h6>
                                            <p className="designation mb-0 text-white">
                                                Marketing Coordinator
                                            </p>
                                            <div className="icon mb-2">
                                                <img src="assets/img/home-10/27.png" alt="img" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="single-testimonial-inner style-4">
                                            <div className="thumb">
                                                <img src="assets/img/home-10/29.png" alt="img" />
                                            </div>
                                            <p className="text-white">
                                                Contrary popular belief, Lorem in simply random text. It
                                                has roots a piece of classical Latin
                                            </p>
                                            <div className="ratting-inner mt-3 mb-1">
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                                <FaStar />
                                            </div>
                                            <h6 className="text-white">Devon Lane</h6>
                                            <p className="designation mb-0 text-white">
                                                Marketing Coordinator
                                            </p>
                                            <div className="icon mb-2">
                                                <img src="assets/img/home-10/27.png" alt="img" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="client-slider owl-carousel">
                                <Marquee gradient={false}>
                                    <div className="thumb">
                                        <img src="assets/img/home-10/32.png" alt="img" />
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/home-10/33.png" alt="img" />
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/home-10/34.png" alt="img" />
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/home-10/35.png" alt="img" />
                                    </div>
                                    <div className="thumb">
                                        <img src="assets/img/home-10/32.png" alt="img" />
                                    </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
                {/* testimonial-area start */}
                {/* blog-area start */}
                <div className="blog-area blog-area_single_page pd-top-110 pd-bottom-90">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="section-title text-center style-white">
                                    <h6 className="sub-title p-0 color-base_6 bg-transparent">
                                        My Blog
                                    </h6>
                                    <h2 className="title">My Latest Written Blog</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog-list bg-gray_2">
                                    <div className="thumb m-3 mb-0">
                                        <img
                                            className="border-radius-5"
                                            src="assets/img/home-10/36.png"
                                            alt="img"
                                        />
                                    </div>
                                    <div className="details">
                                        <ul className="blog-meta ps-0">
                                            <li className="text-white">
                                                <FaRegUser /> By Admin
                                            </li>
                                        </ul>
                                        <h5 className="mb-3 text-white">
                                            <Link href="/blog-details">
                                                Desining Better Links for your upcomming Business
                                            </Link>
                                        </h5>
                                        <Link
                                            className="readmore-text text-white"
                                            href="/blog-details"
                                        >
                                            Read More <FaArrowRight className="ms-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog-list bg-gray_2">
                                    <div className="thumb m-3 mb-0">
                                        <img
                                            className="border-radius-5"
                                            src="assets/img/home-10/37.png"
                                            alt="img"
                                        />
                                    </div>
                                    <div className="details">
                                        <ul className="blog-meta ps-0">
                                            <li className="text-white">
                                                <FaRegUser /> By Admin
                                            </li>
                                        </ul>
                                        <h5 className="mb-3 text-white">
                                            <Link href="/blog-details">
                                                Desining Better Links for your upcomming Business
                                            </Link>
                                        </h5>
                                        <Link
                                            className="readmore-text text-white"
                                            href="/blog-details"
                                        >
                                            Read More <FaArrowRight className="ms-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog-list bg-gray_2">
                                    <div className="thumb m-3 mb-0">
                                        <img
                                            className="border-radius-5"
                                            src="assets/img/home-10/38.png"
                                            alt="img"
                                        />
                                    </div>
                                    <div className="details">
                                        <ul className="blog-meta ps-0">
                                            <li className="text-white">
                                                <FaRegUser /> By Admin
                                            </li>
                                        </ul>
                                        <h5 className="mb-3 text-white">
                                            <Link href="/blog-details">
                                                Desining Better Links for your upcomming Business
                                            </Link>
                                        </h5>
                                        <Link
                                            className="readmore-text text-white"
                                            href="/blog-details"
                                        >
                                            Read More <FaArrowRight className="ms-2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* blog-area start */}
                {/* contact-area start */}
                <div
                    id="contact"
                    className="contact-area contact-area_single_page pd-bottom-90"
                >
                    <div className="container">
                        <div className="bg-gray_2 pd-top-90 pd-bottom-100 pe-xl-5 pe-4 ps-xl-5 ps-4">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-md-10">
                                    <div className="section-title text-center style-white">
                                        <h6 className="sub-title color-base_6 p-0 bg-transparent">
                                            Contact me Today
                                        </h6>
                                        <h2 className="title">
                                            Reach Out to Me with Your Inquiry Now
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="border-2 p-xl-4 p-3">
                                        <div className="media mb-3 border-bottom-2 pb-4 mb-4">
                                            <div className="media-left me-3">
                                                <img src="assets/img/home-10/39.png" alt="img" />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h6 className="mb-0 text-white">Email</h6>
                                                <p className="mb-0 fw-400 text-white">
                                                    Company@mail.com
                                                </p>
                                            </div>
                                        </div>
                                        <div className="media mb-3 border-bottom-2 pb-4 mb-4">
                                            <div className="media-left me-3">
                                                <img src="assets/img/home-10/40.png" alt="img" />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h6 className="mb-0 text-white">Contacts</h6>
                                                <p className="mb-0 fw-400 text-white">
                                                    012 345 678 9101
                                                </p>
                                            </div>
                                        </div>
                                        <div className="media">
                                            <div className="media-left me-3">
                                                <img src="assets/img/home-10/41.png" alt="img" />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h6 className="mb-0 text-white">Location</h6>
                                                <p className="mb-0 fw-400 text-white">
                                                    99 califo,America
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="single-input-inner border-2">
                                                <input
                                                    className="bg-transparent text-white border-radius-0"
                                                    type="text"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-input-inner border-2">
                                                <input
                                                    className="bg-transparent text-white border-radius-0"
                                                    type="text"
                                                    placeholder="Subject"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="single-input-inner border-2">
                                                <input
                                                    className="bg-transparent text-white border-radius-0"
                                                    type="text"
                                                    placeholder="Your Email"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input-inner border-2">
                                                <textarea
                                                    className="bg-transparent text-white border-radius-0"
                                                    placeholder="Message"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button className="btn btn-base_6 border-radius-5 w-100">
                                                Submit Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* contact-area start */}
                {/* footer area start */}
                <footer className="footer-area bg-cover mt-0">
                    <div className="footer-bottom" style={{ background: '#021638' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 align-self-center">
                                    <p>© PromoGame 2024 | All Rights Reserved</p>
                                </div>
                                <div className="col-md-6 text-lg-end">
                                    <Link href="#">Trams &amp; Condition</Link>
                                    <Link href="#">Privacy Policy</Link>
                                    <Link href="#">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* footer area end */}
            </div>

            <ModalVideo
                channel="youtube"
                autoplay
                isOpen={isOpen}
                videoId="XM6kTQPzzpQ"
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default HomeTenInner;
