import React from "react";
import { articles } from "../data/articles";
import "./HomePage.css";
import ArticleCard from "./ArticleCard";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <img src="/pslLogo.png" alt="PSL Institute Logo" className="logo" />
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
            <ArticleCard article={article} />
          ))}
        </div>
        {articles.length === 0 && (
          <div className="no-articles">
            <p>No articles available at the moment.</p>
          </div>
        )}
      </main>

      <footer className="homepage-footer">
        <p className="about-section">
          Welcome to the PSL Institute's private publications platform. This
          space is dedicated to sharing the work, insights, and dubious
          scientific reflections of our group of friends.
        </p>
        <img
          src="/pslBlazon.png"
          alt="PSL Institute Blazon"
          className="logo-small"
        />
        <p>© 2024 PSL Institute - All rights reserved</p>{" "}
      </footer>
    </div>
  );
};

export default HomePage;
