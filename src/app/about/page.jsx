import AboutAreaOne from "@/components/AboutAreaOne";
import Breadcrumb from "@/components/Breadcrumb";
import ContactAreaOne from "@/components/ContactAreaOne";
import CounterAreaOne from "@/components/CounterAreaOne";
import FaqAreaOne from "@/components/FaqAreaOne";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";
import ServiceAreaOne from "@/components/ServiceAreaOne";
import TeamAreaOne from "@/components/TeamAreaOne";
import WorkProcessOne from "@/components/WorkProcessOne";




export const metadata = {
  title: "About || PromoGame - Gamify Solutions & Technology",
  description:
    "PromoGame provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Navigation Bar */}
      <Breadcrumb title={'About Us'} />

      {/* About Area One */}
      <AboutAreaOne />

      {/* ServiceAreaOne */}
      <ServiceAreaOne />

      {/* Sản Phẩm Nổi Bật */}
      <FaqAreaOne />

      {/* Team Area One */}
      {/* <TeamAreaOne /> */}

      {/* Counter Area One */}
      <CounterAreaOne />

      {/* Contact Area One */}
      <ContactAreaOne />

      {/* Work Process One */}
      <WorkProcessOne />

      {/* Footer One */}
      <FooterOne />

    </>
  );
};

export default page;
