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
        // d3kl3yb9qelts0.cloudfront.net/
        protocol : "https",
        hostname : "d3kl3yb9qelts0.cloudfront.net",
        pathname : "/**"
      }
    ]
  }
};

export default withNextVideo(nextConfig);
