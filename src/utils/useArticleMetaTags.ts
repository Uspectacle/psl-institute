import { useEffect } from "react";
import { Article } from "./articles";

const useArticleMetaTags = (article: Article | undefined) => {
  useEffect(() => {
    if (!article) return;

    const baseUrl = "https://psl.institute";
    const articleUrl = `${baseUrl}/article/${article.id}`;
    const pdfUrl = article.pdfUrl.startsWith("http")
      ? article.pdfUrl
      : `${baseUrl}/${article.pdfUrl}`;

    // Remove existing meta tags
    const existingMetaTags = document.querySelectorAll(
      'meta[name^="citation_"], meta[name^="DC."], meta[property^="og:"], meta[name="twitter:"], link[rel="canonical"]'
    );
    existingMetaTags.forEach((tag) => tag.remove());

    // Remove existing JSON-LD script
    const existingJsonLd = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingJsonLd) existingJsonLd.remove();

    const createMeta = (name: string, content: string, isProperty = false) => {
      const meta = document.createElement("meta");
      if (isProperty) {
        meta.setAttribute("property", name);
      } else {
        meta.setAttribute("name", name);
      }
      meta.content = content;
      document.head.appendChild(meta);
    };

    // CRITICAL: Google Scholar Citation Meta Tags
    createMeta("citation_title", article.title);
    createMeta("citation_journal_title", article.journal || "PSL Institute");
    createMeta("citation_publisher", "PSL Institute");
    createMeta("citation_publication_date", article.publicationDate);
    createMeta("citation_online_date", article.publicationDate);
    createMeta("citation_pdf_url", pdfUrl);
    createMeta("citation_abstract_html_url", articleUrl);
    createMeta("citation_fulltext_html_url", articleUrl);

    // Authors
    article.authors.forEach((author) => {
      createMeta("citation_author", author);
    });

    // Keywords
    article.keywords.forEach((keyword) => {
      createMeta("citation_keywords", keyword);
    });

    // Optional fields if available
    if (article.doi) {
      createMeta("citation_doi", article.doi);
    }
    if (article.volume) {
      createMeta("citation_volume", article.volume);
    }
    if (article.pages) {
      createMeta("citation_firstpage", article.pages.split("-")[0]);
      if (article.pages.includes("-")) {
        createMeta("citation_lastpage", article.pages.split("-")[1]);
      }
    }

    // Language
    createMeta("citation_language", "en");

    // ISSN for journal
    createMeta("citation_issn", "2950-1234");

    // Dublin Core Meta Tags for Academic Indexing
    createMeta("DC.Title", article.title);
    createMeta("DC.Creator", article.authors.join("; "));
    createMeta("DC.Subject", article.keywords.join("; "));
    createMeta("DC.Description", article.abstract);
    createMeta("DC.Publisher", "PSL Institute");
    createMeta("DC.Date", article.publicationDate);
    createMeta("DC.Type", "Text");
    createMeta("DC.Format", "application/pdf");
    createMeta("DC.Identifier", articleUrl);
    createMeta("DC.Language", "en");
    if (article.doi) {
      createMeta("DC.Identifier.DOI", article.doi);
    }

    // Open Graph
    createMeta("og:title", article.title, true);
    createMeta("og:description", article.abstract, true);
    createMeta("og:url", articleUrl, true);
    createMeta("og:type", "article", true);
    createMeta("og:site_name", "PSL Institute", true);

    // Twitter Card
    createMeta("twitter:card", "summary");
    createMeta("twitter:title", article.title);
    createMeta("twitter:description", article.abstract);

    // SEO
    createMeta("description", article.abstract);
    createMeta("keywords", article.keywords.join(", "));
    createMeta("author", article.authors.join(", "));
    createMeta("robots", "index,follow");
    createMeta("googlebot", "index,follow");

    // Canonical URL
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = articleUrl;
    document.head.appendChild(canonical);

    // Update page title
    document.title = `${article.title} | PSL Institute`;

    // JSON-LD Structured Data for Google Scholar
    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: article.title,
      author: article.authors.map((author) => ({
        "@type": "Person",
        name: author,
      })),
      abstract: article.abstract,
      datePublished: article.publicationDate,
      publisher: {
        "@type": "Organization",
        name: "PSL Institute",
        url: "https://psl.institute/",
      },
      isPartOf: {
        "@type": "Periodical",
        name: article.journal || "PSL Institute",
        issn: "2950-1234",
      },
      url: articleUrl,
      mainEntity: {
        "@type": "DigitalDocument",
        url: pdfUrl,
        encodingFormat: "application/pdf",
      },
      keywords: article.keywords,
      ...(article.doi && { doi: article.doi }),
      ...(article.volume && { volumeNumber: article.volume }),
      ...(article.pages && { pagination: article.pages }),
    });
    document.head.appendChild(jsonLd);

    return () => {
      // Cleanup function
      const metaTags = document.querySelectorAll(
        'meta[name^="citation_"], meta[name^="DC."], meta[property^="og:"], meta[name="twitter:"], link[rel="canonical"]'
      );
      metaTags.forEach((tag) => tag.remove());
      const jsonLdScript = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (jsonLdScript) jsonLdScript.remove();
    };
  }, [article]);
};

export default useArticleMetaTags;
