/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects() {
    return [
      {
        source: "/charts",
        destination: "/charts/town/men/2024",
        permanent: false,
      },
      {
        source: "/charts/:event",
        destination: "/charts/:event/men/2024",
        permanent: false,
      },
      {
        source: "/charts/:event/:gender",
        destination: "/charts/:event/:gender/2024",
        permanent: false,
      },
      {
        source: "/latest",
        destination: "/charts",
        permanent: false,
      },
      {
        source: "/latest/:event",
        destination: "/charts/:event",
        permanent: false,
      },
      {
        source: "/latest/:event/:gender",
        destination: "/charts/:event/:gender",
        permanent: false,
      },
      {
        source: "/history",
        destination: "/charts",
        permanent: false,
      },
      {
        source: "/history/:event",
        destination: "/charts/:event",
        permanent: false,
      },
      {
        source: "/history/:event/:gender",
        destination: "/charts/:event/:gender",
        permanent: false,
      },
      {
        source: "/eights/men",
        destination: "/charts/eights/men",
        permanent: true,
      },
      {
        source: "/eights/women",
        destination: "/charts/eights/women",
        permanent: true,
      },
      {
        source: "/lents/men",
        destination: "/charts/lents/men",
        permanent: true,
      },
      {
        source: "/lents/women",
        destination: "/charts/lents/women",
        permanent: true,
      },
      {
        source: "/mays/men",
        destination: "/charts/mays/men",
        permanent: true,
      },
      {
        source: "/mays/women",
        destination: "/charts/mays/women",
        permanent: true,
      },
      {
        source: "/torpids/men",
        destination: "/charts/torpids/men",
        permanent: true,
      },
      {
        source: "/torpids/women",
        destination: "/charts/torpids/women",
        permanent: true,
      },
      {
        source: "/town/men",
        destination: "/charts/town/men",
        permanent: true,
      },
      {
        source: "/town/women",
        destination: "/charts/town/women",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
