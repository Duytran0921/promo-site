import BannerEight from "@/components/BannerEight";
import BlogAreaEight from "@/components/BlogAreaEight";
import ContactAreaSix from "@/components/ContactAreaSix";
import FooterSeven from "@/components/FooterSeven";
import NavbarSeven from "@/components/NavbarSeven";
import ProjectAreaThree from "@/components/ProjectAreaThree";
import ServiceAreaSeven from "@/components/ServiceAreaSeven";
import SolutionOne from "@/components/SolutionOne";
import TeamAreaFive from "@/components/TeamAreaFive";
import TestimonialSeven from "@/components/TestimonialSeven";
import WhyChoose from "@/components/WhyChoose";
import WorkProcessSeven from "@/components/WorkProcessSeven";





export const metadata = {
  title: "Home || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "Agiletech provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavbarSeven />

      {/* Banner Eight */}
      <BannerEight />

      {/* Service Area Seven */}
      <ServiceAreaSeven />

      {/* Why Choose */}
      <WhyChoose />

      {/* Project Area Three */}
      <ProjectAreaThree />

      {/* Work Process Seven */}
      <WorkProcessSeven />

      {/* SolutionOne */}
      <SolutionOne />

      {/* TeamAreaFive */}
      <TeamAreaFive />

      {/* ContactAreaSix */}
      <ContactAreaSix />

      {/* TestimonialSeven */}
      <TestimonialSeven />


      {/* BlogAreaEight */}
      <BlogAreaEight />

      {/* FooterSeven */}
      <FooterSeven />

    </>
  );
};

export default page;
