import NextAuth, {Session} from "next-auth";
import CredentialsProvider, {CredentialsProviderType} from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { client } from "../../auth/sanity-client";

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
        : Promise<{email: string, id: string, password?: string, role?: string, permissions?: string} | null> {

        // Query Sanity for the user with the given email
        // const query = `*[_type == "UserAccount" && lower(Username) == lower($email)][0] {
        const query = `*[_type == "UserAccount" && lower(Username) == "admin1@example.com"][0] {
          "id": UserId,
          Username,
          PasswordHash,
          UserRole-> {
            RoleName,
            RolePermissions
          }
        }`;

        // console.log("DB-query: ", query);
        // console.log("credentials.email: ", credentials.email);
        // console.log("credentials.password: ", credentials.password);

        let user = null;
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          user = await client.fetch(query, {email: credentials.email});
        } catch (error) {
          console.error('Error fetching from Sanity:', error);
        }

        // console.log("DB-CLIENT: ", client);
        console.log("DB-user: ", user);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (user && await compare(credentials.password, user.PasswordHash)) {
          return {
            id: user.id,
            email: user.Username,
            role: user.UserRole.Rolename,
            permissions: user.UserRole.RolePermissons,
          };
        } else {
          return null;
        }

        // id:1001
        // Username:admin1@example.com
        // PasswordHash:$2a$12$S.EfYuHnJcJ0Z1oVPMxIoefFsJ0xFSZtj0Z4SdKgIbm1ap39.nfJO
        // UserRole:{…} 2 properties
        // RoleName:Admin
        // RolePermissions:DeleteEvent
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

        //         import { hash } from 'bcrypt-ts';
        //
        //         async function hashPassword(plainPassword) {
        //           const hashedPassword = await hash(plainPassword, 10);  // Salt rounds = 10
        //           console.log(hashedPassword);  // Use this hash when creating user records
        //           return hashedPassword;
        //         }
        //
        // // Example usage
        //         const password = "admin123";
        //         hashPassword(password);

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async session({session, token}): Promise<Session | undefined> {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.user.id = token.id;
      // session.user.role = token.role;
      // session.user.permissions = token.permissions;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signincomponent"
  }
});