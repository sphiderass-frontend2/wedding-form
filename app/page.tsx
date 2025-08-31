import Image from "next/image";
import { Facebook, Google, Logo } from "@/public/assets";
import SignupForm from "./components/SignupForm";
import Threads from "./components/Threads";

const SignUp = () => {
  return (
    <section className="flex justify-center">
      {/* Left: Signup Form */}
      <main className="relative flex items-center justify-center w-full md:w-1/2 p-4 md:px-14 md:py-28 overflow-hidden">
        {/* Decorative Threads */}
        <div className="absolute -top-4 -left-4 -rotate-12 z-0">
          <Threads />
        </div>
        <div className="absolute -bottom-20 -right-4 -rotate-[60deg] z-0">
          <Threads />
        </div>

        {/* Signup Card */}
        <div className="relative z-10 w-full rounded-4xl bg-background drop-shadow-custom p-4 md:p-6">
          <div className="space-y-2">
            {/* Title */}
            <h1 className="text-3xl font-semibold">Join The Richlist</h1>
            <p className="text-sm font-medium text-gray">
              Access exclusive events and experiences
            </p>

            {/* Social Buttons */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <button className="flex items-center justify-center gap-2 w-full rounded-3xl border border-gray p-3 md:py-4 md:px-6 text-sm font-normal">
                <Image src={Google} alt="google-icon" width={20} />
                Sign in with Google
              </button>
              <button className="flex items-center justify-center gap-2 w-full rounded-3xl bg-accent text-white p-3 md:py-4 md:px-6 text-sm font-normal">
                <Image src={Facebook} alt="facebook-icon" width={20} />
                Sign in with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <hr className="w-full border border-[#E6E8EC]" />
              <span className="text-gray/50">OR</span>
              <hr className="w-full border border-[#E6E8EC]" />
            </div>

            {/* Signup Form */}
            <SignupForm />
          </div>
        </div>
      </main>

      {/* Right: Banner */}
      <main className="relative hidden md:flex w-1/2 items-end px-16 py-10 signup-banner bg-cover bg-center bg-no-repeat">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 to-black/60 opacity-75"></div>

        {/* Banner Content */}
        <div className="relative z-10">
          <Image src={Logo} alt="logo" width={50} />
          <h1 className="mt-4 max-w-xl text-8xl font-semibold leading-[1.1] text-white">
            Seamless Event Discovery
          </h1>
          <p className="mt-4 text-xl font-normal text-white">
            Find events that match your vibe.
          </p>
        </div>
      </main>
    </section>
  );
};

export default SignUp;
