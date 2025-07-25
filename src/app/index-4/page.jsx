import AboutAreaFour from "@/components/AboutAreaFour";
import BannerFour from "@/components/BannerFour";
import BlogAreaFour from "@/components/BlogAreaFour";
import BrandAreaOne from "@/components/BrandAreaOne";
import CareerAreaOne from "@/components/CareerAreaOne";
import ContactAreaFour from "@/components/ContactAreaFour";
import CounterAreaFour from "@/components/CounterAreaFour";
import FaqAreaTwo from "@/components/FaqAreaTwo";
import FooterThree from "@/components/FooterThree";
import NavbarThree from "@/components/NavbarThree";
import ProjectAreaOne from "@/components/ProjectAreaOne";
import ServiceAreaFour from "@/components/ServiceAreaFour";
import TeamAreaTwo from "@/components/TeamAreaTwo";
import TestimonialThree from "@/components/TestimonialThree";





export const metadata = {
  title: "Home || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "PromoGame provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavbarThree />

      {/* Banner Four */}
      <BannerFour />

      {/* About Area Four */}
      <AboutAreaFour />

      {/* Service Area four */}
      <ServiceAreaFour />

      {/* FAQ Area Two */}
      <FaqAreaTwo />

      {/* Team Area Two */}
      <TeamAreaTwo />

      {/* Career Area One */}
      <CareerAreaOne />

      {/* Project Area One */}
      <ProjectAreaOne />


      {/* Contact Area Four */}
      <ContactAreaFour />

      {/* Testimonial Three */}
      <TestimonialThree />

      {/* Counter Area Four */}
      <CounterAreaFour />

      {/* Blog Area Four */}
      <BlogAreaFour />

      {/* Brand Area One */}
      <BrandAreaOne />

      {/* Footer Three */}
      <FooterThree />

    </>
  );
};

export default page;
