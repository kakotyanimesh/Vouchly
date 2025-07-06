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
      },
      {
        protocol : "https",
        hostname : "cdn.vouchly.kakoty.me",
        pathname : "/**"
      }
    ]
  }
};

export default withNextVideo(nextConfig);
