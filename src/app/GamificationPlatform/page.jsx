import SaasPackage from "@/components/SaasPackage";
import BannerTwo from "@/components/BannerTwo";

import CounterAreaTwo from "@/components/CounterAreaTwo";
import FooterOne from "@/components/FooterOne";
import Navbar from "@/components/NavBar";
import PricingAreaTwo from "@/components/PricingAreaSaaS";

import SaasPackageRive from "@/components/SaasPackageRive";
import WhyGroupRive from "@/components/WhyGroupRive";

import CustomizePackages from "@/components/CustomizePackages";
import PricingAreaCustom from "@/components/PricingAreaCustom";




export const metadata = {
  title: "GPP || Gamified Promotion Platform",
  description:
    "PromoGame provide you to build the best agency, app, business, digital, it services, it solutions, network solution, startup, technology, technology company, technology service template.",
};


const page = () => {
  return (
    <>
      {/* Navigation Bar Two*/}
      <Navbar/>

      {/* Banner Two */}
      <BannerTwo />

      {/* Why Group Animation */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <WhyGroupRive 
            className="mx-auto"
            width="100%"
            height="600px"
          /> 
         </div>
      </div>

        {/* Enterprise Package Section */}
      <div id="enterprise-package">
        <CounterAreaTwo />
      </div>

      {/* SaaS Package Section */}
      <div id="saas-package">
        <div className="relative bg-gray-500">
          {/* <span className="items-center justify-center text-white text-3xl font-bold">SaaS Rive Package</span> */}
          <div className="">
            <SaasPackageRive 
              className="mx-auto"
              width="100%"
              height="auto"
            />
          </div>
        </div>
      </div>

      {/* About Area Two */}
      <SaasPackage />


      {/* Customize Package Section */}
      <div id="saas-pricing">
        <PricingAreaTwo />
      </div>


      {/* Customize Package Section */}
      <div id="customize-package">
        <CustomizePackages />
      </div>

        {/* Customize Package Section */}
        <div id="custom-pricing">
        <PricingAreaCustom />
      </div>

      {/* Footer one */}
      <FooterOne/>


    </>
  );
};

export default page;
