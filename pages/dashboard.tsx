import {getSession, GetSessionParams, signOut} from "next-auth/react";
import {Session} from "next-auth";

export default function DashboardPage() {
  return (
    <div className="w-4/12 mx-auto my-24 border border-gray-200">
      <div className="h=20 my-2 text-2xl text-neutral-500">Dashboard</div>
      <p>You are logged in!</p>
      <div className="h-10 m-2">
        <button onClick={() => signOut({callbackUrl: "/"})}
          className="inlne-block mx-1 py-1 px-3 bg-blue-600 rounded hover:bg-blue-200 hover:text-blue-800 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          type="submit">Logout
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams | undefined): Promise<unknown> {
  const session: Session | null = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signincomponent',
        permanent: false,
      }
    };
  }
  return {
    props: {session},
  };
}