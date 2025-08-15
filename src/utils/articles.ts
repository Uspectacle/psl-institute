import articlesData from "../../public/articles.json";

export interface Article {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  keywords: string[];
  publicationDate: string; // Format YYYY-MM-DD
  pdfUrl: string;
  doi?: string;
  journal?: string;
  volume?: string;
  pages?: string;
  category: "research" | "review" | "conference" | "preprint";
  publisher: "PSL Institute";
}

export const articles: Article[] = articlesData as Article[];
