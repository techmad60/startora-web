/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/discount",
        destination: "/discount/index.html",
      },
    ];
  },
};

export default nextConfig;