import {signIn, SignInResponse} from "next-auth/react";
import {FormEvent, useState} from "react";
import {NextRouter, useRouter} from "next/router";
// import { client } from "../auth/sanity-client";

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router: NextRouter = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    // const query = '*[_type == "UserAccount"]';

    // const query = `*[_type == "UserAccount" && lower(Username) == lower($email)][0] {
    //   "id": UserId,
    //   Username,
    //   PasswordHash,
    //   UserRole-> {
    //     RoleName,
    //     RolePermissions
    //   }
    // }`;

    // let user = null;
    // try {
    //   user = await client.fetch(query, {}, {filterResponse: false});
    //   // user = await client.fetch(encodeURIComponent(query), {}, {filterResponse: false});
    // } catch (error) {
    //   console.error('Error fetching from Sanity:', error);
    // }
    // console.log("user: ", user);

    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Check credentials and start over");
      setEmail("");
      setPassword("");
    } else {
      await router.push("/dashboard");
    }
  };

  return (
    <div className="w-4/12 mx-auto my-24 border border-gray-200">
      <div className="h=10 my-2 text-neutral-500">Login here, please</div>
      <div className="h-10 my-2">{error && <span className="text-red-500">{error}</span>}</div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="floating_email" id="floating_email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required/>
          <label htmlFor="floating_email"
                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
            address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="floating_password" id="floating_password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 placeholder=" " required/>
          <label htmlFor="floating_password"
                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <button
          className="inlne-block mx-1 py-1 px-3 bg-blue-600 rounded hover:bg-blue-200 hover:text-blue-800 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          type="submit">Login
        </button>
      </form>
    </div>
  );

}