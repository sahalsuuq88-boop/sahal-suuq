const nextConfig = {
  reactStrictMode: false,

  allowedDevOrigins: ["192.168.1.106"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;

