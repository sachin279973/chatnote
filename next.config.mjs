/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tse4.mm.bing.net',
      },
      {
        hostname:"img.clerk.com"
      }
    ],
  },
};

export default nextConfig;
