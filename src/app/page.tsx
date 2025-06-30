import { FeaturesDiv } from "@/components/landingpage/featuresdiv";
import { Footer } from "@/components/landingpage/footer";
import { LandingHeader } from "@/components/landingpage/landingbody";
import { NoCoding } from "@/components/landingpage/nocoding";
import { PricingDiv } from "@/components/landingpage/pricingdiv";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="md:mx-20 mx-5">
      <Navbar/>
      <div className="flex justify-center text-center space-y-40 items-center flex-col pt-20">
        <LandingHeader/>
        <FeaturesDiv/>
        <NoCoding/>
        {/* <NewFeatureDiv/> */}
        {/* <Reviewdiv/> */}
        {/* no codig has mobile bugs */}
        <PricingDiv/>
      </div>
      <Footer/>
    </div>
  );
}


