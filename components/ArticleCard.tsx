import React from "react";
import Link from "next/link";
import styles from "./ArticleCard.module.css";
import { Article } from "@/utils/articles";
import { getCategoryBadge, formatDate } from "@/utils/helpers";
import Image from "next/image";

type Props = { article: Article };

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <Link
      href={`/articles/${article.id}`}
      className={styles.articleCardWrapper}
    >
      <div className={styles.cardImageContainer}>
        <Image
          src={`/previews/${article.id}-preview.1.jpg`}
          alt={`Preview of ${article.title}`}
          className={styles.preview_thumbnail}
          width={300}
          height={300}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.cardCategory}>
            {getCategoryBadge(article.category)}
          </span>
          <span className={styles.cardDate}>
            {formatDate(article.publicationDate)}
          </span>
        </div>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <p className={styles.cardAuthor}>
          by <em>{article.authors.join(", ")}</em>
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
