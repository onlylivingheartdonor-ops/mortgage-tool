/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'mortgageaffordabilityestimator.com' }],
        destination: 'https://www.mortgageaffordabilityestimator.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig