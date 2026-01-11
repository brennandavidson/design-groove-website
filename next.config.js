/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  // Transpile specific packages if needed
  transpilePackages: ['three', 'lenis'],

  // 301 Redirects for old site URLs
  async redirects() {
    return [
      // Portfolio to Work
      {
        source: '/portfolio',
        destination: '/work',
        permanent: true,
      },
      // Case studies to Work (with slug passthrough)
      {
        source: '/case-studies/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
      // Old service sub-pages to main Services
      {
        source: '/expert-web-development',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/digital-marketing',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/web-design',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/web-development',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/webflow-design-agency',
        destination: '/services',
        permanent: true,
      },
      // Solutions pages to Services
      {
        source: '/solutions/:slug',
        destination: '/services',
        permanent: true,
      },
      // Handle www to non-www (or vice versa) - uncomment preferred version
      // {
      //   source: '/:path*',
      //   has: [{ type: 'host', value: 'www.designgroove.io' }],
      //   destination: 'https://designgroove.io/:path*',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
