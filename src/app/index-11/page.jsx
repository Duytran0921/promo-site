import BannerTen from "@/components/BannerTen";
import BlogAreaENine from "@/components/BlogAreaENine";
import FooterNine from "@/components/FooterNine";
import NavbarTwo from "@/components/NavbarTwo";
import ServiceAreaNine from "@/components/ServiceAreaNine";
import TestimonialNine from "@/components/TestimonialNine";
import WhyChooseTwo from "@/components/WhyChooseTwo";
import WorkProcessEight from "@/components/WorkProcessEight";



export const metadata = {
  title: "Home || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "Agiletech provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* NavbarEight */}
      <NavbarTwo />

      {/* BannerTen */}
      <BannerTen />

      {/* WhyChooseTwo */}
      <WhyChooseTwo />

      {/* ServiceAreaNine */}
      <ServiceAreaNine />

      {/* WorkProcessEight */}
      <WorkProcessEight />

      {/* TestimonialNine */}
      <TestimonialNine />

      {/* BlogAreaENine */}
      <BlogAreaENine />

      {/* FooterNine */}
      <FooterNine />

    </>
  );
};

export default page;
