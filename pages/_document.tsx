import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#667eea" />

        {/* Global Journal/Publisher Meta Tags */}
        <meta name="citation_journal_title" content="PSL Institute" />
        <meta name="citation_publisher" content="PSL Institute" />
        <meta name="citation_issn" content="2950-1234" />
        <meta name="citation_online_date" content="2025" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />

        {/* Global SEO Meta Tags */}
        <meta
          name="description"
          content="PSL Institute - Academic papers without peer-review but with love."
        />
        <meta
          name="keywords"
          content="research, academic papers, scientific publications, preprints, academic research, scholarly articles"
        />
        <meta name="author" content="PSL Institute" />

        {/* Dublin Core Meta Tags */}
        <meta name="DC.Title" content="PSL Institute" />
        <meta name="DC.Creator" content="PSL Institute" />
        <meta name="DC.Subject" content="Academic Research" />
        <meta
          name="DC.Description"
          content="Collection of academic articles and scientific research papers"
        />
        <meta name="DC.Publisher" content="PSL Institute" />
        <meta name="DC.Type" content="Text" />
        <meta name="DC.Format" content="text/html" />
        <meta name="DC.Language" content="en" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="PSL Institute - Academic Research Papers"
        />
        <meta
          property="og:description"
          content="PSL Institute - Academic papers without peer-review but with love"
        />
        <meta property="og:url" content="https://psl.institute/" />
        <meta property="og:site_name" content="PSL Institute" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="PSL Institute - Academic Research Papers"
        />
        <meta
          name="twitter:description"
          content="Collection of academic articles and scientific research papers"
        />

        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://psl.institute/" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Periodical",
              name: "PSL Institute",
              publisher: {
                "@type": "Organization",
                name: "PSL Institute",
                url: "https://psl.institute/",
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
