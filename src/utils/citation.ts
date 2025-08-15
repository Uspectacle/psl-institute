import { Article } from "../data/articles";

export const generateApaCitation = (article: Article): string => {
  const authorList = article.authors.join(", ");
  const year = new Date(article.publicationDate).getFullYear();
  let citation = `${authorList} (${year}). ${article.title}`;

  if (article.journal) {
    citation += `. ${article.journal}`;
  }
  if (article.volume) {
    citation += `, ${article.volume}`;
  }
  if (article.pages) {
    citation += `, ${article.pages}`;
  }
  if (article.doi) {
    citation += `. https://doi.org/${article.doi}`;
  }

  return citation;
};

export const generateBibtexCitation = (article: Article): string => {
  return `@article{${article.id.replace(/-/g, "")},
  title={${article.title}},
  author={${article.authors.join(" and ")}},
  year={${new Date(article.publicationDate).getFullYear()}}${
    article.journal ? `,\n  journal={${article.journal}}` : ""
  }${article.volume ? `,\n  volume={${article.volume}}` : ""}${
    article.pages ? `,\n  pages={${article.pages}}` : ""
  }${article.doi ? `,\n  doi={${article.doi}}` : ""}
}`;
};
