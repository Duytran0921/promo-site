import Breadcrumb from "@/components/Breadcrumb";
import CaseStudyArea from "@/components/CaseStudyArea";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";



export const metadata = {
  title: "Project Details || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "Agiletech provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Navigation Bar */}
      <Breadcrumb title={'Project Details'} />

      {/* Case Study Area */}
      <CaseStudyArea />

      {/* Footer One */}
      <FooterOne />

    </>
  );
};

export default page;
