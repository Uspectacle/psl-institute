import React from "react";
import { articles } from "../utils/articles";
import "./HomePage.css";
import ArticleCard from "./ArticleCard";

const HomePage: React.FC = () => {
  return (
    <main className="homepage">
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
  );
};

export default HomePage;
