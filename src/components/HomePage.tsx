import React from "react";
import { articles } from "../utils/articles";
import "./HomePage.css";
import ArticleCard from "./ArticleCard";
import Footer from "./Footer";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <img
          src={`${process.env.PUBLIC_URL}/pslLogo.png`}
          alt="PSL Institute Logo"
          className="logo"
        />
        <div className="homepage-title">
          <h1>PSL Institute</h1>
          <p className="subtitle">
            Academic papers without peer-review but with love
          </p>
        </div>
      </header>

      <main className="homepage-main">
        <h2 className="intro-text">Latest Publications</h2>
        <div className="articles-grid">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
        {articles.length === 0 && (
          <div className="no-articles">
            <p>No articles available at the moment.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
