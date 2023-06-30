/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://dogs-api-production-c2fe.up.railway.app/:path*',
          },
        ]
      },
  };
