import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../utils/articles";
import "./ArticleCard.css";
import { getCategoryBadge, formatDate } from "../utils/helpers";

type Props = { article: Article };

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="articleCardWrapper">
      <div className="cardImageContainer">
        <img
          src={`./previews/${article.id}-preview.1.jpg`}
          alt={`Preview of ${article.title}`}
          className="preview-thumbnail"
        />
      </div>
      <div className="cardContent">
        <div className="cardHeader">
          <span className="cardCategory">
            {getCategoryBadge(article.category)}
          </span>
          <span className="cardDate">
            {formatDate(article.publicationDate)}
          </span>
        </div>
        <h3 className="cardTitle">{article.title}</h3>
        <p className="cardAuthor">
          by <em>{article.authors.join(", ")}</em>
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
