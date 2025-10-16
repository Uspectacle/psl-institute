import styles from "./ArticlePage.module.css";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "@/components/Layout";
import { Article, articles } from "@/utils/articles";
import { generateApaCitation, generateBibtexCitation } from "@/utils/citation";
import { getCategoryBadge, formatDate, getPdfEmbedUrl } from "@/utils/helpers";
import {
  faFilePdf,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Props {
  article: Article;
}

export default function ArticlePage({ article }: Props) {
  const [previewError, setPreviewError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  const pdfUrl = getPdfEmbedUrl(article.pdfUrl);
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.abstract} />
        {/* Google Scholar Meta Tags */}
        <meta name="citation_title" content={article.title} />
        {article.authors.map((author, index) => (
          <meta key={index} name="citation_author" content={author} />
        ))}
        <meta
          name="citation_publication_date"
          content={article.publicationDate}
        />
        <meta name="citation_pdf_url" content={pdfUrl} />
        {article.doi && <meta name="citation_doi" content={article.doi} />}
        {article.keywords?.map((keyword, index) => (
          <meta key={index} name="citation_keyword" content={keyword} />
        ))}
        <meta name="citation_journal_title" content="PSL Institute" />
        <meta name="robots" content="index,follow" />{" "}
        <meta property="og:title" content={article.title} />
        <meta property="og:site_name" content="PSL Institute" />
      </Head>

      <Layout>
        <article className={styles.article_content}>
          <header className={styles.article_header}>
            <div className={styles.article_meta_top}>
              <span className={styles.category_badge}>
                {getCategoryBadge(article.category)}
              </span>
              <time
                className={styles.publication_date}
                dateTime={article.publicationDate}
              >
                {formatDate(article.publicationDate)}
              </time>
            </div>

            <h1 className={styles.article_title}>{article.title}</h1>

            <div className={styles.article_authors}>
              <h2>{article.authors.length > 1 ? "Authors" : "Author"}</h2>
              <ul className={styles.authors_list}>
                {article.authors.map((author, index) => (
                  <li key={index} className={styles.author_name}>
                    {author}
                  </li>
                ))}
              </ul>
            </div>

            {article.journal && (
              <div className={styles.publication_info}>
                <h2>Publication Information</h2>
                <div className={styles.publication_details}>
                  <span className={styles.journal_name}>{article.journal}</span>
                  {article.volume && (
                    <span className={styles.volume}>Vol. {article.volume}</span>
                  )}
                  {article.pages && (
                    <span className={styles.pages}>pp. {article.pages}</span>
                  )}
                  {article.doi && (
                    <Link
                      href={`https://doi.org/${article.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.doi_link}
                    >
                      DOI: {article.doi}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </header>

          <section className={styles.article_body}>
            <div className={styles.abstract_section}>
              <h2>Abstract</h2>
              <div className={styles.abstract_content}>
                <p>{article.abstract}</p>
              </div>
            </div>

            <div className={styles.keywords_section}>
              <h2>Keywords</h2>
              <div className={styles.keywords_list}>
                {article.keywords.map((keyword, index) => (
                  <span key={index} className={styles.keyword_tag}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.download_section}>
              <h2>Download</h2>
              <div className={styles.download_actions}>
                <Link
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btn}
                >
                  <FontAwesomeIcon icon={faFilePdf} /> Download Full Paper (PDF)
                </Link>
                {article.doi && (
                  <Link
                    href={`https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btn}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> View on
                    Publisher Website
                  </Link>
                )}
              </div>

              <div className={styles.pdf_preview_container}>
                {isClient && !previewError ? (
                  <>
                    <div className={styles.pdf_preview_header}>
                      <h3>PDF Preview</h3>
                    </div>
                    <div className={styles.pdf_embed_wrapper}>
                      <iframe
                        src={pdfUrl}
                        className={styles.pdf_embed}
                        title={`PDF Preview: ${article.title}`}
                        onError={handlePreviewError}
                      />
                    </div>
                  </>
                ) : previewError ? (
                  <div className={styles.pdf_preview_error}>
                    <h3>Preview Not Available</h3>
                    <p>
                      The PDF preview could not be loaded. This might be due to
                      browser restrictions or PDF security settings.
                    </p>
                    <Link
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btn}
                    >
                      <FontAwesomeIcon icon={faFilePdf} /> Download PDF Instead
                    </Link>
                  </div>
                ) : (
                  <p>Loading PDF preview...</p>
                )}
              </div>
            </div>
          </section>

          <div className={styles.citation_section}>
            <h2>How to Cite</h2>
            <div className={styles.citation_formats}>
              <div className={styles.citation_format}>
                <h3>APA Style</h3>
                <div className={styles.citation_text}>
                  <p>{generateApaCitation(article)}</p>
                </div>
              </div>
              <div className={styles.citation_format}>
                <h3>BibTeX</h3>
                <pre className={styles.citation_text + " " + styles.code}>
                  {generateBibtexCitation(article)}
                </pre>
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}

// Generate static paths for all articles
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: articles.map(({ id }) => ({ params: { slug: id } })),
    fallback: false, // 404 for non-existent articles
  };
};

// Fetch article data at build time
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const article = articles.find(({ id }) => id === params?.slug);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: { article },
  };
};
