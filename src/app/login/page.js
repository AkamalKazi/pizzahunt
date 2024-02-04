"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleLogin(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLoginInProgress(false);
  }

  return (
    <>
      <section className="mt-8 mb-4">
        <h1 className="text-center font-bold text-primary text-4xl">Login</h1>
        <form className="max-w-xs mx-auto block" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={loginInProgress}
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            disabled={loginInProgress}
            name="password"
          />
          <button type="submit" disabled={loginInProgress}>
            Login
          </button>

          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>

          <button
            type="button"
            className="flex items-center gap-4 justify-center"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Image src={"/google.png"} alt="Google" width={24} height={24} />
            Login With Google
          </button>

          <div className="text-center font-semibold text-sm my-6">
            Don &apos;t have an account?{" "}
            <span className="text-primary">
              <Link href={"/register"}>Register Here.</Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
}
