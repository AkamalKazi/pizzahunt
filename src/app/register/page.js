"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();

    setCreatingUser(true);
    setError(false);
    var response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    }
    if (!response.ok) {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <>
      <section className="mt-8 mb-5">
        <h1 className="text-center text-primary text-4xl font-bold">
          Register
        </h1>
        {userCreated && (
          <div className="my-4 text-center bg-green-400 text-sm  text-white max-w-xs px-4 py-2 rounded-lg mx-auto">
            User Created, Now you can{" "}
            <Link href={"/login"} className="font-bold mx-1">
              {" "}
              Login.
            </Link>
          </div>
        )}
        {error && (
          <div className="text-white mx-auto  max-w-xs  text-sm rounded-md px-4 py-2 mt-4 bg-red-600">
            An error occurred! Please try again
          </div>
        )}
        <form className="max-w-xs mx-auto block" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={creatingUser}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            disabled={creatingUser}
          />
          <button type="submit" disabled={creatingUser}>
            Register
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
            Already have an account?{" "}
            <span className="text-primary ">
              <Link href={"/login"}>Login Here.</Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
}
