"use client";
import { Facebook, Google, Logo } from "@/public/assets";
import Image from "next/image";
import Threads from "../components/Threads";
import SigninForm from "../components/SigninForm";
import { useAuth } from "../hooks/useAuth";

const SignIn = () => {
  const { pending } = useAuth();

  return (
    <>
      {/* Full Page Loading Overlay */}
      {pending && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Signing You In
            </h2>
            <p className="text-gray-600">
              Please wait while we authenticate your account...
            </p>
          </div>
        </div>
      )}

      <section className="flex flex-row-reverse justify-center min-h-screen">
        <main className="md:w-1/2 md:py-28 md:px-14 p-4 overflow-hidden relative w-full flex items-center justify-center">
          {/* Threads Components - Behind the form */}
          <div className="absolute -top-[35rem]  -left-4 transform -rotate-12 z-0">
            <Threads />
          </div>
          <div className="absolute  top-50 -right-20 transform -rotate-[60deg] z-0">
            <Threads />
          </div>

          <div className="w-full drop-shadow-custom bg-white rounded-4xl md:p-6 p-4 relative z-10">
            {/* Form Content - Above Threads */}
            <div>
              {/* Header */}

              <div className="space-y-2">
                <h1 className="text-3xl font-semibold">Join The Richlist</h1>
                <p className="text-gray font-medium text-sm">
                  Access exclusive events and experience
                </p>

                <div className="flex md:flex-row flex-col items-center gap-4 justify-center">
                  <button
                    className="flex items-center justify-center gap-2 rounded-3xl md:py-4 md:px-6 p-3 border border-gray text-sm font-normal w-full"
                    disabled={pending}
                  >
                    <span>
                      <Image src={Google} alt="google-icon" width={20} />
                    </span>
                    Sign in with Google
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 rounded-3xl md:py-4 md:px-6 p-3 bg-accent text-white text-sm font-normal w-full"
                    disabled={pending}
                  >
                    <span>
                      <Image src={Facebook} alt="google-icon" width={20} />
                    </span>
                    Sign in with Facebook
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <hr className="border border-[#E6E8EC] w-full" />

                  <p className="text-gray/50">OR</p>
                  <hr className="border border-[#E6E8EC] w-full" />
                </div>

                <SigninForm />

                {/* <SignupForm /> */}
              </div>
            </div>
          </div>
        </main>
        <main className="w-1/2 signup-banner bg-cover bg-center bg-no-repeat relative px-5 py-10 md:flex items-end hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000BF] to-[rgba(0,0,0,0.75)] opacity-75"></div>

          <div className="z-10 relative">
            <Image src={Logo} alt="logo" width={50} />
            <h1 className="font-semibold text-white text-8xl">
              Join a Community Tastemakers
            </h1>
          </div>
        </main>
      </section>
    </>
  );
};

export default SignIn;
