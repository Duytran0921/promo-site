import AboutAreaNine from "@/components/AboutAreaNine";
import BannerNine from "@/components/BannerNine";
import BlogAreaNine from "@/components/BlogAreaNine";
import CounterAreaSix from "@/components/CounterAreaSix";
import FooterEight from "@/components/FooterEight";
import GalleryOne from "@/components/GalleryOne";
import NavbarEight from "@/components/NavbarEight";
import ProgressOne from "@/components/ProgressOne";
import RoadmapOne from "@/components/RoadmapOne";
import ServiceAreaEight from "@/components/ServiceAreaEight";
import TeamAreaSix from "@/components/TeamAreaSix";
import TestimonialEight from "@/components/TestimonialEight";


export const metadata = {
  title: "Home || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "Agiletech provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* NavbarEight */}
      <NavbarEight />

      {/* BannerNine */}
      <BannerNine />

      {/* AboutAreaNine */}
      <AboutAreaNine />

      {/* ServiceAreaEight */}
      <ServiceAreaEight />

      {/* RoadmapOne */}
      <RoadmapOne />

      {/* ContactAreaSeven */}
      <CounterAreaSix />

      {/* TestimonialEight */}
      <TestimonialEight />

      {/* GalleryOne */}
      <GalleryOne />

      {/* ProgressOne */}
      <ProgressOne />

      {/* TeamAreaSix */}
      <TeamAreaSix />

      {/* BlogAreaNine */}
      <BlogAreaNine />

      {/* FooterEight */}
      <FooterEight />

    </>
  );
};

export default page;
