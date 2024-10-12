import NextAuth from "next-auth";
import CredentialsProvider, {CredentialsProviderType} from "next-auth/providers/credentials";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"},
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      async authorize(credentials: CredentialsProviderType)
        : Promise<{email: string, id: string, password: string} | null> {
        const users = [
          { id: "1001", email: "admin1@example.com", password: "admin123" },
          { id: "1002", email: "user1@example.com", password: "user123" }
        ];
        const user = users.find(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          u => u.email === credentials.email && u.password == credentials.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }

      }
    })
  ],
  session: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    jwt: true
  },
  callbacks: {
    async jwt({token, user}) {
      if(user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        token.id = user.id
      }
      return token;
    },
    async session({session, token}) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
});