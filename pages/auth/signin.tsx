import {signIn, SignInResponse} from "next-auth/react";
import {FormEvent, useState} from "react";
import {NextRouter, useRouter} from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router: NextRouter = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(result.error);
    } else {
      await router.push("/dashboard");
    }
  };

  return (
    <div style={{maxWidth: "400px", margin: "auto"}}>
      <h2>Sign In</h2>
      {error && <p style={{color: "red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );

}