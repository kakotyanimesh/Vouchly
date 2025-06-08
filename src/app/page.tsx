import { LandingHeader } from "@/components/landingpage/landingbody";
import { Reviewdiv } from "@/components/landingpage/reviewdiv";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="md:mx-20 mx-5">
      <Navbar/>
      <div className="flex justify-center text-center gap-10 items-center flex-col">
        <LandingHeader/>
        <Reviewdiv/>
      </div>
    </div>
  );
}


