import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import "./ArticlePage.css";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (article) {
      // Update document title
      document.title = `${article.title} | Research Publications`;

      // Remove existing meta tags
      const existingMetas = document.querySelectorAll(
        'meta[name^="citation_"], meta[name="description"], meta[name="keywords"]'
      );
      existingMetas.forEach((meta) => meta.remove());

      // Add Google Scholar meta tags
      const metaTags = [
        { name: "citation_title", content: article.title },
        { name: "citation_author", content: article.authors.join("; ") },
        { name: "citation_publication_date", content: article.publicationDate },
        {
          name: "citation_pdf_url",
          content: `${window.location.origin}${article.pdfUrl}`,
        },
        { name: "description", content: article.abstract },
        { name: "keywords", content: article.keywords.join(", ") },
      ];

      // Add optional meta tags
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

      // Create and append meta tags
      metaTags.forEach(({ name, content }) => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      });

      // Add authors as separate meta tags (Google Scholar prefers this)
      article.authors.forEach((author) => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "citation_author");
        meta.setAttribute("content", author);
        document.head.appendChild(meta);
      });
    }

    // Cleanup function
    return () => {
      const metasToRemove = document.querySelectorAll(
        'meta[name^="citation_"], meta[name="description"], meta[name="keywords"]'
      );
      metasToRemove.forEach((meta) => meta.remove());
      document.title = "Research Publications";
    };
  }, [article]);

  if (!article) {
    return (
      <div className="article-page">
        <div className="article-not-found">
          <h1>Article Not Found</h1>
          <p>The requested article could not be found.</p>
          <Link to="/" className="back-home">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryBadge = (category: string): string => {
    switch (category) {
      case "research":
        return "Research";
      case "review":
        return "Review";
      case "conference":
        return "Conference";
      case "preprint":
        return "Preprint";
      default:
        return category;
    }
  };

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  const getPdfEmbedUrl = (pdfUrl: string): string => {
    // For GitHub Pages, construct the full URL
    const fullUrl = pdfUrl.startsWith("http")
      ? pdfUrl
      : `${window.location.origin}${pdfUrl}`;

    // Use PDF.js viewer (included in most browsers) or fallback to direct embed
    return `${fullUrl}#toolbar=1&navpanes=1&scrollbar=1`;
  };

  return (
    <div className="article-page">
      <nav className="article-nav">
        <Link to="/" className="back-link">
          ← Back to Publications
        </Link>
      </nav>

      <article className="article-content">
        <header className="article-header">
          <div className="article-meta-top">
            <span className={`category-badge category-${article.category}`}>
              {getCategoryBadge(article.category)}
            </span>
            <time
              className="publication-date"
              dateTime={article.publicationDate}
            >
              {formatDate(article.publicationDate)}
            </time>
          </div>

          <h1 className="article-title">{article.title}</h1>

          <div className="article-authors">
            <h2>Authors</h2>
            <ul className="authors-list">
              {article.authors.map((author, index) => (
                <li key={index} className="author-name">
                  {author}
                </li>
              ))}
            </ul>
          </div>

          {article.journal && (
            <div className="publication-info">
              <h2>Publication Information</h2>
              <div className="publication-details">
                <span className="journal-name">{article.journal}</span>
                {article.volume && (
                  <span className="volume">Vol. {article.volume}</span>
                )}
                {article.pages && (
                  <span className="pages">pp. {article.pages}</span>
                )}
                {article.doi && (
                  <a
                    href={`https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doi-link"
                  >
                    DOI: {article.doi}
                  </a>
                )}
              </div>
            </div>
          )}
        </header>

        <section className="article-body">
          <div className="abstract-section">
            <h2>Abstract</h2>
            <div className="abstract-content">
              <p>{article.abstract}</p>
            </div>
          </div>

          <div className="keywords-section">
            <h2>Keywords</h2>
            <div className="keywords-list">
              {article.keywords.map((keyword, index) => (
                <span key={index} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="download-section">
            <h2>Download</h2>
            <div className="download-actions">
              <a
                href={article.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-download-btn"
              >
                📄 Download Full Paper (PDF)
              </a>
              {article.doi && (
                <a
                  href={`https://doi.org/${article.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link-btn"
                >
                  🔗 View on Publisher Website
                </a>
              )}
            </div>

            <div className="pdf-preview-container">
              {!previewError ? (
                <>
                  <div className="pdf-preview-header">
                    <h3>PDF Preview</h3>
                    <p className="preview-note">
                      📱 For better viewing experience on mobile, use the
                      download button above.
                    </p>
                  </div>
                  <div className="pdf-embed-wrapper">
                    <iframe
                      src={getPdfEmbedUrl(article.pdfUrl)}
                      className="pdf-embed"
                      title={`PDF Preview: ${article.title}`}
                      onError={handlePreviewError}
                    >
                      <p>
                        Your browser does not support PDF preview.
                        <a
                          href={article.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click here to download the PDF
                        </a>
                      </p>
                    </iframe>
                  </div>
                </>
              ) : (
                <div className="pdf-preview-error">
                  <h3>Preview Not Available</h3>
                  <p>
                    The PDF preview could not be loaded. This might be due to
                    browser restrictions or PDF security settings.
                  </p>
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-download-btn"
                  >
                    📄 Download PDF Instead
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="citation-section">
            <h2>How to Cite</h2>
            <div className="citation-formats">
              <div className="citation-format">
                <h3>APA Style</h3>
                <div className="citation-text">
                  {article.authors.join(", ")} (
                  {new Date(article.publicationDate).getFullYear()}).
                  <em> {article.title}</em>
                  {article.journal && (
                    <span>
                      . <em>{article.journal}</em>
                    </span>
                  )}
                  {article.volume && (
                    <span>
                      , <em>{article.volume}</em>
                    </span>
                  )}
                  {article.pages && <span>, {article.pages}</span>}
                  {article.doi && <span>. https://doi.org/{article.doi}</span>}
                </div>
              </div>

              <div className="citation-format">
                <h3>BibTeX</h3>
                <pre className="bibtex-citation">
                  {`@article{${article.id.replace(/-/g, "")},
  title={${article.title}},
  author={${article.authors.join(" and ")}},
  year={${new Date(article.publicationDate).getFullYear()}}${
                    article.journal ? `,\n  journal={${article.journal}}` : ""
                  }${article.volume ? `,\n  volume={${article.volume}}` : ""}${
                    article.pages ? `,\n  pages={${article.pages}}` : ""
                  }${article.doi ? `,\n  doi={${article.doi}}` : ""}
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ArticlePage;
