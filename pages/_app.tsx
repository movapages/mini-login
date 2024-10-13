import {SessionProvider} from "next-auth/react";
import {AppProps} from "next/app";
import Head from "next/head";

import "../globals.css";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <>
      <Head>
        <title>Mini Login</title>
        <meta name="description" content="This is an awesome page built with Next.js"/>
      </Head>
      <div
        className="mx-auto h-20 max-w-full text-blue-800 font-normal text-2xl pl-1.5 flex flex-col justify-center items-start">
        Mini Login
      </div>
      <section className="mx-auto max-w-full h-[90vh] border border-y-blue-200">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </section>
    </>
  );
}