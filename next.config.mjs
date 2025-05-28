/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "www.amazon.in",
      },
      {
        protocol: "https",
        hostname: "logolook.net",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
      },
    ],
  },
};

export default nextConfig;
