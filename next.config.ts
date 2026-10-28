import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Adds a 2560 step so retina laptops get a sharp hero without jumping to the 3840 file.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    qualities: [70, 75],
  },
};

export default nextConfig;
