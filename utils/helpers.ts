export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getCategoryBadge = (category: string): string => {
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

export const getPdfEmbedUrl = (pdfUrl: string): string => {
  return `https://psl.institute/${pdfUrl}`;
};
