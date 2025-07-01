import { FeaturesDiv } from "@/components/landingpage/featuresdiv";
import { Footer } from "@/components/landingpage/footer";
import { IframeFile } from "@/components/landingpage/iframefile";
import { LandingHeader } from "@/components/landingpage/landingbody";
import { NoCoding } from "@/components/landingpage/nocoding";
import { PricingDiv } from "@/components/landingpage/pricingdiv";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="md:mx-20 mx-7">
      <Navbar/>
      <div className="flex justify-center text-center xl:space-y-40 sm:space-y-28 space-y-18 md:space-y-32 items-center flex-col pt-20">
        <LandingHeader/>
        <FeaturesDiv/>
        <NoCoding/>
        <IframeFile/>
        {/* <NewFeatureDiv/> */}
        {/* <Reviewdiv/> */}
        {/* no codig has mobile bugs */}
        <PricingDiv/>
      </div>
      <Footer/>
    </div>
  );
}


