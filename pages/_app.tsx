import "@/public/fonts/PretendardStd/PretendardStd.css";
import "@/styles/globals.css";
import "@/styles/reset.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
