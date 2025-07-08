import AboutAreaSeven from "@/components/AboutAreaSeven";
import BannerSix from "@/components/BannerSix";
import BlogAreaSix from "@/components/BlogAreaSix";
import CaseStudyAreaThree from "@/components/CaseStudyAreaThree";
import ContactAreaFive from "@/components/ContactAreaFive";
import CounterAreaFive from "@/components/CounterAreaFive";
import FooterFive from "@/components/FooterFive";
import NavbarFive from "@/components/NavbarFive";
import ServiceAreaSix from "@/components/ServiceAreaSix";
import TeamAreaFour from "@/components/TeamAreaFour";
import WorkProcessFive from "@/components/WorkProcessFive";




export const metadata = {
  title: "Home || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "Agiletech provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavbarFive />

      {/* Banner Six */}
      <BannerSix />

      {/* About Seven */}
      <AboutAreaSeven />

      {/* Service Area Six */}
      <ServiceAreaSix />


      {/* CaseStudy Area Three */}
      <CaseStudyAreaThree />

      {/* Counter Area Five */}
      <CounterAreaFive />


      {/* Contact Area Five */}
      <ContactAreaFive />

      {/* Work Process Five */}
      <WorkProcessFive />

      {/* Team Area Four */}
      <TeamAreaFour />

      {/* Blog Area Six */}
      <BlogAreaSix />

      {/* Footer Five */}
      <FooterFive />

    </>
  );
};

export default page;
