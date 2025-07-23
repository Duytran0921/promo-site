import AboutAreaOne from "@/components/AboutAreaOne";
import BannerOne from "@/components/BannerOne";
// import BlogAreaOne from "@/components/BlogAreaOne";
// import CaseStudyAreaOne from "@/components/CaseStudyAreaOne";
// import ContactAreaOne from "@/components/ContactAreaOne";
// import CounterAreaOne from "@/components/CounterAreaOne";
import FaqAreaOne from "@/components/FaqAreaOne";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";
// import NavBar from "@/components/NavBar00";
// import PricingAreaOne from "@/components/PricingAreaOne";
import ServiceAreaOne from "@/components/ServiceAreaOne";
import TeamAreaOne from "@/components/TeamAreaOne";
// import WorkProcessOne from "@/components/WorkProcessOne";


export const metadata = {
  title: "Home || PromoGame - Gamify Solutions & Technology",
  description:
    "PromoGame provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar/>

      {/* Banner One */}
      <BannerOne />

      {/* About Area One */}
      <AboutAreaOne />

      {/* Service Area One */}
      <ServiceAreaOne />

      {/* Team Area One */}
      <TeamAreaOne />

      {/* FAQ Area One */}
      <FaqAreaOne />

      {/* Case Study Area One */}
      {/* <CaseStudyAreaOne /> */}

  

      {/* Our Feature */}
      {/* <CounterAreaOne /> */}

      {/* Contact Area One */}
      {/* <ContactAreaOne /> */}

      {/* Work Process One */}
      {/* <WorkProcessOne /> */}

      {/* Pricing Area One */}
      {/* <PricingAreaOne /> */}

      {/* Blog Area One */}
      {/* <BlogAreaOne /> */}

      {/* Footer One */}
      <FooterOne />


    </>
  );
};

export default page;
