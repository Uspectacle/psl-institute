import React from "react";
import { Link } from "react-router-dom";
import { Article, articles } from "../data/articles";
import "./HomePage.css";

const HomePage: React.FC = () => {
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

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Research Publications</h1>
        <p className="homepage-subtitle">
          Collection of academic articles and scientific research papers
        </p>
      </header>

      <main className="homepage-main">
        <div className="articles-grid">
          {articles.map((article: Article) => (
            <div key={article.id} className="article-card-wrapper">
              <Link to={`/article/${article.id}`} className="article-card-link">
                <article className="article-card">
                  <div className="article-preview-section">
                    <div className="pdf-preview-image">
                      <img
                        src={`/previews/${article.id}-preview.jpg`}
                        alt={`Preview of ${article.title}`}
                        className="preview-thumbnail"
                        onError={(e) => {
                          // Fallback to a default image or hide if preview doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.classList.add("no-preview");
                        }}
                      />
                      <div className="preview-overlay">
                        <span className="preview-icon">📄</span>
                        <span className="preview-text">PDF Preview</span>
                      </div>
                    </div>
                  </div>

                  <div className="article-content-section">
                    <div className="article-header">
                      <h2 className="article-title">{article.title}</h2>
                      <div className="article-meta">
                        <span
                          className={`category-badge category-${article.category}`}
                        >
                          {getCategoryBadge(article.category)}
                        </span>
                        <span className="publication-date">
                          {formatDate(article.publicationDate)}
                        </span>
                      </div>
                    </div>

                    <div className="article-authors">
                      <strong>Authors:</strong> {article.authors.join(", ")}
                    </div>

                    {article.journal && (
                      <div className="article-journal">
                        <em>{article.journal}</em>
                        {article.volume && `, Vol. ${article.volume}`}
                        {article.pages && `, pp. ${article.pages}`}
                      </div>
                    )}

                    <div className="article-abstract">
                      <p>{article.abstract}</p>
                    </div>

                    <div className="article-keywords">
                      {article.keywords.map((keyword, index) => (
                        <span key={index} className="keyword-tag">
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="article-actions">
                      <span className="pdf-link">📄 Download PDF</span>
                      {article.doi && <span className="doi-link">🔗 DOI</span>}
                    </div>
                  </div>
                </article>
              </Link>

              <div className="article-cta-section">
                <Link
                  to={`/article/${article.id}`}
                  className="view-details-btn"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="no-articles">
            <p>No articles available at the moment.</p>
          </div>
        )}
      </main>

      <footer className="homepage-footer">
        <p>© 2024 Research Publications - All rights reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
