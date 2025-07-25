import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";
import PriceAreaThree from "@/components/PriceAreaThree";



export const metadata = {
  title: "Price || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "PromoGame provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Breadcrumb */}
      <Breadcrumb title={'Price 02'} />

      {/* PriceAreaThree */}
      <PriceAreaThree />

      {/* Footer One */}
      <FooterOne />

    </>
  );
};

export default page;
