// Example in pages/_app.js or individual pages
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PTVZH64STZ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PTVZH64STZ');
            `,
          }}
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
