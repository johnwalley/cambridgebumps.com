const BASE_URL = process.env.BASE_URL;

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${BASE_URL}/</loc>
        </url>
        <url>
            <loc>${BASE_URL}/cheat-sheets</loc>
        </url>
        <url>
            <loc>${BASE_URL}/about</loc>
        </url>
        <url>
            <loc>${BASE_URL}/vocabulary</loc>
        </url>
        <url>
            <loc>${BASE_URL}/videos</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/lents</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/lents/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/lents/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/mays</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/mays/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/mays/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/eights</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/eights/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/eights/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/torpids</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/torpids/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/torpids/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/town</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/town/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/latest/town/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/lents</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/lents/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/lents/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/mays</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/mays/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/mays/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/eights</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/eights/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/eights/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/torpids</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/torpids/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/torpids/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/town</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/town/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/history/town/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/lents</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/lents/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/lents/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/mays</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/mays/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/mays/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/eights</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/eights/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/eights/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/torpids</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/torpids/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/torpids/women</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/town</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/town/men</loc>
        </url>
        <url>
            <loc>${BASE_URL}/statistics/town/women</loc>
        </url>
    </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;