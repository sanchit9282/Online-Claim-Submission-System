/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Match all requests starting with /api
        destination: 'http://localhost:5000/api/:path*',  // Redirect to backend server
      },
    ];
  },
}

module.exports = nextConfig;

