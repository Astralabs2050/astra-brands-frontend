import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  images: {
    domains: [
      "astralabsbucket.s3.eu-north-1.amazonaws.com",
      "oaidalleapiprodscus.blob.core.windows.net",
    ],
  },
};

export default nextConfig;
