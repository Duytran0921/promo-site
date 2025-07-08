import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import NavBar from "@/components/NavBar";
import TeamAreaGroupThree from "@/components/TeamAreaGroupThree";
import WorkProcessOne from "@/components/WorkProcessOne";





export const metadata = {
  title: "Team || AglieTech - IT Solutions & Technology NEXT JS Template",
  description:
    "Agiletech provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />

      {/* Breadcrumb */}
      <Breadcrumb title={'Team 03'} />

      {/* TeamAreaGroupThree */}
      <TeamAreaGroupThree />

      {/* WorkProcessOne */}
      <WorkProcessOne /> 

      {/* Footer One */}
      <FooterOne />

    </>
  );
};

export default page;
