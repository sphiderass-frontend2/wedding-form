"use client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

import React, { useState, useEffect } from "react";

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  agree?: string;
}

const SignupForm = () => {
  const route = useRouter();
  const { register, pending } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [globalError, setGlobalError] = useState("");

  // Validation functions
  const validateUsername = (value: string): string => {
    if (!value.trim()) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(value))
      return "Username can only contain letters, numbers, and underscores";
    return "";
  };

  const validateEmail = (value: string): string => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value: string): string => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(value))
      return "Password must contain at least one number";
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value))
      return "Password must contain at least one special character";
    return "";
  };

  const validateAgree = (value: boolean): string => {
    if (!value)
      return "You must agree to the Terms & Conditions and Privacy Policy";
    return "";
  };

  // Real-time validation
  useEffect(() => {
    const newErrors: ValidationErrors = {};

    if (touched.username) {
      newErrors.username = validateUsername(username);
    }
    if (touched.email) {
      newErrors.email = validateEmail(email);
    }
    if (touched.password) {
      newErrors.password = validatePassword(password);
    }
    if (touched.agree) {
      newErrors.agree = validateAgree(agree);
    }

    setErrors(newErrors);
  }, [username, email, password, agree, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSignup = async () => {
    // Mark all fields as touched to show validation errors
    setTouched({
      username: true,
      email: true,
      password: true,
      agree: true,
    });

    // Validate all fields
    const validationErrors: ValidationErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      agree: validateAgree(agree),
    };

    setErrors(validationErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
    if (hasErrors) {
      return;
    }

    setGlobalError("");

    try {
      await register({
        username,
        email,
        password,
      });

      // Assuming the token is saved inside your useAuth hook
      // You can redirect to /verify or dashboard after registration
      route.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setGlobalError(err.message);
      } else {
        setGlobalError("Failed to register");
      }
    }
  };

  return (
    <form className="space-y-6 md:px-6 py-2 px-2 mt-4">
      <div className="flex flex-col gap-2">
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="sinmi_ogedengbe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => handleBlur("username")}
          className={
            errors.username ? "border-red-500 focus:border-red-500" : ""
          }
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Input Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          className={errors.email ? "border-red-500 focus:border-red-500" : ""}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Password</Label>
        <PasswordInput
          placeholder="Input password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          className={
            errors.password ? "border-red-500 focus:border-red-500" : ""
          }
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={agree}
            onCheckedChange={(val) => {
              setAgree(Boolean(val));
              handleBlur("agree");
            }}
          />
          <p className="font-normal text-sm">
            I agree to Richlist's{" "}
            <span className="text-accent">Terms & Conditions</span> &{" "}
            <span className="text-accent">Privacy Policy.</span>
          </p>
        </div>
        {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}
      </div>

      {globalError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{globalError}</p>
        </div>
      )}

      <Button
        className="w-full"
        type="button"
        onClick={handleSignup}
        disabled={pending}
      >
        {pending ? "Signing Up..." : "Sign Up"}
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
