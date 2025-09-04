"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useAuth } from "../hooks/useAuth";

const SigninForm = () => {
  const route = useRouter();

  const { login, error, pending, dismissError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      // showToast({ message: error });
      dismissError();
    }

    return () => {
      dismissError();
    };
  }, [error, dismissError]);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Attempting login with:", { email, password: "***" });
      await login({ email, password });
      route.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      // Error is now handled in useAuth hook
    }
  };

  return (
    <form
      action=""
      className="space-y-6 md:px-6 py-2 px-2 mt-4 border border-[#F4F5F6]"
      onSubmit={handleSubmit}
    >
      {/* Global Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm font-medium">
            Login Error: {error}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Label>Username/Email Address</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Input username or email address"
          disabled={pending}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <Label>Password</Label>
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Input password"
          disabled={pending}
        />

        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox disabled={pending} />
          <p className="font-normal text-sm">Remember Me </p>
        </div>

        <Link href={"/forgot-password"} className="text-accent">
          Forgot Password?
        </Link>
      </div>

      <Button
        className="w-full"
        type="submit"
        disabled={pending}
        // onClick={() => route.push("/verify")}
      >
        {pending ? "Signing In..." : "Sign In"}
      </Button>

      <div className="flex items-center justify-center gap-2 text-lg font-medium">
        <p className="text-gray ">Already have an account?</p>

        <Link href={"/"} className="text-accent">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SigninForm;
