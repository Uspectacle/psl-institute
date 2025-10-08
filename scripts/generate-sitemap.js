const fs = require("fs");
const path = require("path");

// Read articles from JSON file
const articlesPath = path.join(__dirname, "../src/data/articles.json");

let articlesData;
try {
  const articlesContent = fs.readFileSync(articlesPath, "utf8");
  articlesData = JSON.parse(articlesContent);
} catch (error) {
  console.error("Error reading or parsing articles.json:", error);
  process.exit(1);
}

const baseUrl = "https://psl.institute";
const currentDate = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${articlesData
  .map(
    (article) => `  <url>
    <loc>${baseUrl}/article/${article.id}</loc>
    <lastmod>${article.publicationDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

// Write sitemap to public folder
const publicPath = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(publicPath, sitemap);

console.log("Sitemap generated successfully!");
console.log(`Generated sitemap with ${articlesData.length + 1} URLs`);
console.log(`Sitemap saved to: ${publicPath}`);
