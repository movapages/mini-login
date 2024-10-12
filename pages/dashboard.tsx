import { getSession, GetSessionParams} from "next-auth/react";
import {Session} from "next-auth";

export default function DashboardPage() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in!</p>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams | undefined): Promise<unknown> {
  const session: Session | null = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    };
  }
  return {
    props: { session },
  };
}