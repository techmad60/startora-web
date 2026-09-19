/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/discount",
          destination: "/discount/index.html",
        },
      ],
    };
  },
};

export default nextConfig;