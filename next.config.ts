import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options here */
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "astralabsbucket.s3.eu-north-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
