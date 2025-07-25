import BlogGroupTwo from "@/components/BlogGroupTwo";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";





export const metadata = {
  title: "Blog || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "PromoGame provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Navigation Bar */}
      <Breadcrumb title={'Blog 02'} />

      {/* BlogGroupTwo */}
      <BlogGroupTwo />

      {/* Footer One */}
      <FooterOne />

    </>
  );
};

export default page;
