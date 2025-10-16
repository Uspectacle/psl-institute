import styles from "./HomePage.module.css";
import Head from "next/head";
import Layout from "@/components/Layout";
import { articles } from "@/utils/articles";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>PSL Institute</title>
        <meta
          name="description"
          content="Research articles from PSL Institute"
        />
      </Head>

      <Layout>
        <main className={styles.homepage}>
          <h2 className={styles.intro_text}>Latest Publications</h2>
          <div className={styles.articles_grid}>
            {articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
          {articles.length === 0 && (
            <div className={styles.no_articles}>
              <p>No articles available at the moment.</p>
            </div>
          )}
        </main>
      </Layout>
    </>
  );
}
