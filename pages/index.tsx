import { useSession, signIn, signOut } from "next-auth/react";
import { Link } from "react-router-dom";
import Head from "next/head";

import "../globals.css";

export default function Home() {
  const {data: session} = useSession();
  return (
    <>
      <Head>
        <title>Mini Login</title>
        <meta name="description" content="This is an awesome page built with Next.js"/>
      </Head>

      <div className="mx-auto h-10 max-w-full text-blue-800 font-normal text-2xl pl-1.5">Mini Login</div>

      <section className="mx-auto max-w-full h-[90vh] border border-y-blue-200">

        {session ? (
          <>
            <p>Signed in as {session?.user?.email}</p>
            <button onClick={() => signOut()}>Sign Out</button>
            <div>
              <Link to="/dashboard">Go to Dashboard</Link>
            </div>
          </>
        ) : (


          <div className="w-2/12 mx-auto my-24">
            <div className="text-center border border-blue-200 rounded-lg shadow-md sm:rounded-lg p-1.5">
              <div className="h-10 tracking-tight text-amber-600 dark:text-white">
                You are not signed in.
              </div>
              <button
                className="inlne-block mx-1 py-1 px-3 bg-blue-600 rounded hover:bg-blue-200 hover:text-blue-800 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                onClick={() => signIn()}>
                Sign In
              </button>
            </div>
          </div>
          )}

      </section>
      </>
      );
      }