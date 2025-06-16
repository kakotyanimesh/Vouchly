import { FeaturesDiv } from "@/components/landingpage/featuresdiv";
import { Footer } from "@/components/landingpage/footer";
import { LandingHeader } from "@/components/landingpage/landingbody";
import { NoCoding } from "@/components/landingpage/nocoding";
import { PricingDiv } from "@/components/landingpage/pricingdiv";
import { Reviewdiv } from "@/components/landingpage/reviewdiv";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="md:mx-20 mx-5">
      <Navbar/>
      <div className="flex justify-center text-center space-y-40 items-center flex-col">
        <LandingHeader/>
        <FeaturesDiv/>
        <Reviewdiv/>
        {/* no codig has mobile bugs */}
        <NoCoding/>
        <PricingDiv/>
      </div>
      <Footer/>
    </div>
  );
}


