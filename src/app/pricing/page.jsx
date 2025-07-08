import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";
import PriceAreaOne from "@/components/PriceAreaOne";



export const metadata = {
  title: "Price || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "Agiletech provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Breadcrumb */}
      <Breadcrumb title={'Price 01'} />

      {/* PriceAreaOne */}
      <PriceAreaOne />

      {/* Footer One */}
      <FooterOne />

    </>
  );
};

export default page;
