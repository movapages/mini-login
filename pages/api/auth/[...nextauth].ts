import NextAuth, {Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { client } from "../../auth/sanity-client";

// Make credentials required
type CredentialsType = {
  email: string
  password: string
}

// Or make credentials optional by using `Partial`:
type OptionalCredentialsType = Partial<CredentialsType>


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
      async authorize(credentials: OptionalCredentialsType)
        : Promise<{email: string, id: string, password?: string, role?: string, permissions?: string} | null> {

        // Query Sanity for the user with the given email
        const query = `*[_type == "UserAccount" && lower(Username) == lower($email)][0] {
          "id": UserId,
          Username,
          PasswordHash,
          UserRole-> {
            RoleName,
            RolePermissions
          }
        }`;

        // const query = '*[_type == "UserAccount"]';

        let user: unknown = null;
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          // user = await client.fetch(query, {email: credentials.email});
          // user = await client.fetch(query, {email: "admin1@example.com"});
          user = await client.fetch(query, {email: credentials.email}, {filterResponse: false});
        } catch (error) {
          console.error('Error fetching from Sanity:', error);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const isPwdCorrect = await compare(credentials.password, user.result.PasswordHash);
        if (user && isPwdCorrect) {
          return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            id: user.result.id,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            email: user.result.Username,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            role: user.result.UserRole.Rolename,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            permissions: user.result.UserRole.RolePermissons,
          };
        }

        return null;

        // const users = [
        //   { id: "1001", email: "admin1@example.com", password: "admin123" },
        //   { id: "1002", email: "user1@example.com", password: "user123" }
        // ];
        // const user = users.find(
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-expect-error
        //   u => u.email === credentials.email && u.password == credentials.password
        // );

        // return (user ? user : null);
        // http://localhost:3000/studio/
        // $2a$12$S.EfYuHnJcJ0Z1oVPMxIoefFsJ0xFSZtj0Z4SdKgIbm1ap39.nfJO
        // a1b2c3d4e5f6g7h8i9j0

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
        // eslint-disable- next-line @typescript-eslint/no-unused-expressions
        token.id = user.id;
        token.email = user.email;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        token.role = user.role;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        token.permissions = user.permissions;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async session({session, token}): Promise<Session | undefined> {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.user.id = token.id;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.user.email = token.email;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.user.role = token.role;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.user.permissions = token.permissions;

      return session;
    }
  },
  pages: {
    signIn: "/auth/signincomponent"
  }
});