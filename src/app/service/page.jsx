import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";
import PricingAreaOne from "@/components/PricingAreaOne";
import ServiceAreaGroup from "@/components/ServiceAreaGroup";





export const metadata = {
  title: "Service || PromoGame ",
  description:
    "PromoGame provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Navigation Bar */}
      <Breadcrumb title={'Service'} />

      {/* Service Area One */}
      <ServiceAreaGroup />

      {/* Pricing Area One */}
      <PricingAreaOne />

      {/* Footer One */}
      <FooterOne />

    </>
  );
};

export default page;
