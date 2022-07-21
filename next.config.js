/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/eights/men",
        destination: "/history/eights/men",
        permanent: true,
      },
      {
        source: "/eights/women",
        destination: "/history/eights/women",
        permanent: true,
      },
      {
        source: "/lents/men",
        destination: "/history/lents/men",
        permanent: true,
      },
      {
        source: "/lents/women",
        destination: "/history/lents/women",
        permanent: true,
      },
      {
        source: "/mays/men",
        destination: "/history/mays/men",
        permanent: true,
      },
      {
        source: "/mays/women",
        destination: "/history/mays/women",
        permanent: true,
      },
      {
        source: "/torpids/men",
        destination: "/history/torpids/men",
        permanent: true,
      },
      {
        source: "/torpids/women",
        destination: "/history/torpids/women",
        permanent: true,
      },
      {
        source: "/town/men",
        destination: "/history/town/men",
        permanent: true,
      },
      {
        source: "/town/women",
        destination: "/history/town/women",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
