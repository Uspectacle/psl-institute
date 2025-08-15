# PSL Institute - Private Publications Platform

A modern, open-source platform for publishing academic research papers and scientific reflections of dubious nature.
Built by friends, for friends.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.7.4-3178C6?logo=typescript)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen?logo=github)
![Google Scholar](https://img.shields.io/badge/Google%20Scholar-Ready-4285F4?logo=google-scholar)

**[Enter the library](https://uspectacle.github.io/psl-institute/)**

---

## 🎯 About the Institute

PSL Institute is a collaborative platform where my academic friends can share their work, insights, and scientific reflections. If no journal or conference want them, here we publish it without peer-review.

AI assistance was used during this project.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone [https://github.com/Uspectacle/psl-institute.git](https://github.com/Uspectacle/psl-institute.git)
cd psl-institute

# Install dependencies
npm install

# Start development server
npm start
```

### Adding New Articles

1. **Add your PDF** to the `public/pdfs/` directory
2. **Update the articles list** in `src/data/articles.ts`:

```typescript
{
  id: "your-article-slug",
  title: "Your Research Title",
  authors: ["Your Name", "Co-author Name"],
  abstract: "Your abstract here...",
  keywords: ["keyword1", "keyword2"],
  publicationDate: "2024-01-15",
  pdfUrl: "/pdfs/your-article.pdf",
  doi: "10.1000/your-doi", // optional
  journal: "PSL Institute Papers", // optional
  category: "research"
}
```

3. **Commit and push** - deployment is automatic!

Or just send me a DM.

## 👥 Contributing

We welcome contributions from our research community!

## 📜 License

This project is licensed under the GNU General Public License v3.0. See the LICENSE file for more details.
