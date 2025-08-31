"use client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

import React, { useState } from "react";

const SignupForm = () => {
  const route = useRouter();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password || !agree) {
      setError("All fields are required and Terms must be accepted.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await register({
       username,
        email,
        password,
      });

      // Assuming the token is saved inside your useAuth hook
      // You can redirect to /verify or dashboard after registration
      route.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6 md:px-6 py-2 px-2 mt-4">
      <div className="flex flex-col gap-4">
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="sinmi_ogedengbe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Input Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <Label>Password</Label>
        <PasswordInput
          placeholder="Input password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox checked={agree} onCheckedChange={(val) => setAgree(Boolean(val))} />
        <p className="font-normal text-sm">
          I agree to Richlist’s{" "}
          <span className="text-accent">Terms & Conditions</span> &{" "}
          <span className="text-accent">Privacy Policy.</span>
        </p>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button className="w-full" type="button" onClick={handleSignup} disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>

      <div className="flex items-center justify-center gap-2 text-lg font-medium">
        <p className="text-gray ">Already have an account?</p>
        <Link href={"/signin"} className="text-accent">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
