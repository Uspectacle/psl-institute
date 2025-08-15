import { useEffect } from "react";
import { Article } from "../data/articles";
import { getPdfEmbedUrl } from "./helpers";

const useArticleMetaTags = (article: Article | undefined) => {
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | PSL Institute`;

      const existingMetas = document.querySelectorAll(
        'meta[name^="citation_"], meta[name="description"], meta[name="keywords"]'
      );
      existingMetas.forEach((meta) => meta.remove());

      const metaTags = [
        { name: "citation_title", content: article.title },
        { name: "citation_author", content: article.authors.join("; ") },
        { name: "citation_publication_date", content: article.publicationDate },
        {
          name: "citation_pdf_url",
          content: getPdfEmbedUrl(article.pdfUrl),
        },
        { name: "description", content: article.abstract },
        { name: "keywords", content: article.keywords.join(", ") },
      ];

      if (article.doi) {
        metaTags.push({ name: "citation_doi", content: article.doi });
      }
      if (article.journal) {
        metaTags.push({
          name: "citation_journal_title",
          content: article.journal,
        });
      }
      if (article.volume) {
        metaTags.push({ name: "citation_volume", content: article.volume });
      }
      if (article.pages) {
        const [firstPage, lastPage] = article.pages.split("-");
        metaTags.push({ name: "citation_firstpage", content: firstPage });
        if (lastPage) {
          metaTags.push({ name: "citation_lastpage", content: lastPage });
        }
      }

      metaTags.forEach(({ name, content }) => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      });

      article.authors.forEach((author) => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "citation_author");
        meta.setAttribute("content", author);
        document.head.appendChild(meta);
      });
    }

    return () => {
      const metasToRemove = document.querySelectorAll(
        'meta[name^="citation_"], meta[name="description"], meta[name="keywords"]'
      );
      metasToRemove.forEach((meta) => meta.remove());
      document.title = "PSL Institute";
    };
  }, [article]);
};

export default useArticleMetaTags;
