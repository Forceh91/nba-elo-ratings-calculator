import "bootstrap/dist/css/bootstrap.min.css";
import "../src/frontend/style/reset.scss";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NBA Elo Ratings</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
