const fs = require("fs");
const path = require("path");

const baseUrl = "https://psl.institute";
const articlesPath = path.join(__dirname, "../src/data/articles.json");
const publicDir = path.join(__dirname, "../public/article");

let articles = [];
try {
  const data = fs.readFileSync(articlesPath, "utf8");
  articles = JSON.parse(data);
} catch (err) {
  console.error("❌ Error : impossible to read src/data/articles.json");
  console.error(err);
  process.exit(1);
}

articles.forEach((article) => {
  const pdfUrl = article.pdfUrl.startsWith("http")
    ? article.pdfUrl
    : `${baseUrl}/${article.pdfUrl}`;
  const articleDir = path.join(publicDir, article.id);
  fs.mkdirSync(articleDir, { recursive: true });

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${article.title}</title>

    <!-- For Google Scholar -->
    <meta name="citation_title" content="${article.title}" />
    ${article.authors
      .map((a) => `<meta name="citation_author" content="${a}" />`)
      .join("\n    ")}
    <meta name="citation_publication_date" content="${
      article.publicationDate
    }" />
    ${
      pdfUrl
        ? `<meta name="citation_pdf_url" content="${pdfUrl}" />`
        : ""
    }
    <meta name="citation_journal_title" content="PSL Institute" />
    <meta name="robots" content="index,follow" />

    <!-- SEO -->
    <meta name="description" content="${article.abstract || ""}" />
    <meta property="og:title" content="${article.title}" />
    <meta property="og:url" content="${baseUrl}/article/${article.id}" />
    <meta property="og:site_name" content="PSL Institute" />
    <meta name="twitter:card" content="summary" />
    <link rel="canonical" href="${baseUrl}/article/${article.id}" />

    <!-- Script React -->
    <script defer src="/static/js/main.js"></script>
  </head>
  <body>
    <noscript>Static preview of article: ${article.title}</noscript>
    <div id="root"></div>
  </body>
</html>`;

  fs.writeFileSync(path.join(articleDir, "index.html"), htmlContent, "utf8");
  console.log(`✅ Page generated : /article/${article.id}/index.html`);
});

console.log(`\n✨ ${articles.length} HTML files successfully generated!`);
