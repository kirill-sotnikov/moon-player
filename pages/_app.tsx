import Head from "next/head";
import { PlayerContextProvider } from "../src/Player";
import "../styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Moon</title>
      </Head>
      <PlayerContextProvider>
        <Component {...pageProps} />
      </PlayerContextProvider>
    </>
  );
}
