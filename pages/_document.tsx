import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.svg" />
        <meta name="theme-color" content="#667eea" />

        {/* Global SEO Meta Tags */}
        <meta
          name="keywords"
          content="research, academic papers, scientific publications, preprints, academic research, scholarly articles"
        />
        <meta name="author" content="PSL Institute" />

        {/* Twitter Card Meta Tags */}
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />

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
