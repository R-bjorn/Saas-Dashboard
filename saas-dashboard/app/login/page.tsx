"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const userCred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCred.user.getIdToken();

    localStorage.setItem("token", token);

    router.push("/dashboard");
  };

  const handleSignup = async () => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const token = await userCred.user.getIdToken();
    localStorage.setItem("token", token);

    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} className="bg-blue-500 text-white p-2">
        Login
      </button>

      <button onClick={handleSignup} className="bg-green-500 text-white p-2">
        Sign Up
      </button>
    </div>
  );
}