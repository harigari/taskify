import "@/public/fonts/PretendardStd/PretendardStd.css";
import "@/styles/globals.css";
import "@/styles/reset.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
