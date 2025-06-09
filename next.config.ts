import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "i.pinimg.com",
        pathname : "/**"
      }
    ]
  }
};

export default withNextVideo(nextConfig);
