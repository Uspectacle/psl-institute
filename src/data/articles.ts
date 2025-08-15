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

export const articles: Article[] = [
  {
    id: "lui-ou-nous",
    title: "Lui ou nous : étude du seul ennemi de l’humanité",
    authors: ["Baptiste Rossigneux"],
    abstract:
      "Je définis et relie les notions de Moloch, de réalisme et de RWA pour y former une théorie cohérente. Cette ébauche a pour but de pointer du doigt les processus et phénomènes problématique qui nous poussent dans l’inaction (ou l’accélération) face aux défis existentiels s’accumulant comme une somme d’enjeux inédits en gravité pour l’humanité toute entière.",
    keywords: ["Moloch", "Réalisme", "RWA"],
    publicationDate: "2025-02-18",
    pdfUrl: "/pdfs/lui-ou-nous.pdf",
    journal: "Mirages et Miracles",
    category: "conference",
    volume: "1",
    pages: "1-14",
    publisher: "PSL Institute",
  },
];
