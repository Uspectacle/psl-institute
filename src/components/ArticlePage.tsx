import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "../data/articles";
import "./ArticlePage.css";
import { formatDate, getCategoryBadge, getPdfEmbedUrl } from "../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilePdf,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import useArticleMetaTags from "../utils/useArticleMetaTags";
import { generateApaCitation, generateBibtexCitation } from "../utils/citation";
import Footer from "./Footer";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);
  const [previewError, setPreviewError] = useState(false);

  // Use the custom hook to handle all meta tag logic
  useArticleMetaTags(article);

  if (!article) {
    return (
      <div className="article-page">
        <div className="article-not-found">
          <h1>Article Not Found</h1>
          <p>The requested article could not be found.</p>
          <Link to="/" className="back-home">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  const pdfUrl = getPdfEmbedUrl(article.pdfUrl);

  return (
    <div className="article-page">
      <nav className="article-nav">
        <Link to="/" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Homepage
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
            <h2>{article.authors.length > 1 ? "Authors" : "Author"}</h2>
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
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-download-btn"
              >
                <FontAwesomeIcon icon={faFilePdf} /> Download Full Paper (PDF)
              </a>
              {article.doi && (
                <a
                  href={`https://doi.org/${article.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link-btn"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} /> View on Publisher
                  Website
                </a>
              )}
            </div>

            <div className="pdf-preview-container">
              {!previewError ? (
                <>
                  <div className="pdf-preview-header">
                    <h3>PDF Preview</h3>
                  </div>
                  <div className="pdf-embed-wrapper">
                    <iframe
                      src={pdfUrl}
                      className="pdf-embed"
                      title={`PDF Preview: ${article.title}`}
                      onError={handlePreviewError}
                    >
                      <p>
                        Your browser does not support PDF preview.
                        <a
                          href={pdfUrl}
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
                    <FontAwesomeIcon icon={faFilePdf} /> Download PDF Instead
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="citation-section">
          <h2>How to Cite</h2>
          <div className="citation-formats">
            <div className="citation-format">
              <h3>APA Style</h3>
              <div className="citation-text">
                <p>{generateApaCitation(article)}</p>
              </div>
            </div>
            <div className="citation-format">
              <h3>BibTeX</h3>
              <pre className="bibtex-citation">
                {generateBibtexCitation(article)}
              </pre>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticlePage;
