import { Logo } from "@/public/assets";
import Image from "next/image";
import Threads from "../components/Threads";
import VerificationForm from "../components/VerificationForm";

const Verification = () => {
  return (
    <section className="flex h-screen justify-center">
      <main className="md:w-1/2 md:py-28 md:px-14 p-4 overflow-hidden relative flex items-center justify-center">
        {/* Threads Components - Behind the form */}
        <div className="absolute top-2 -left-4 transform -rotate-12 z-0">
          <Threads />
        </div>
        <div className="absolute -right-4 transform -rotate-[60deg] z-0">
          <Threads />
        </div>
        <div className="w-full drop-shadow-custom bg-white rounded-4xl md:px-6 md:py-14 p-4 relative z-10">
          {/* Form Content - Above Threads */}
          <div>
            {/* Header */}

            <div className="flex gap-4 items-center justify-center flex-col">
              <Image src={Logo} alt="logo" width={100} />
              <h1 className="text-3xl font-semibold">Activation</h1>
              <p className="text-gray font-medium text-sm">
                Enter the activation code sent to your email address
              </p>
              <VerificationForm />

              {/* <SignupForm /> */}
            </div>
          </div>
        </div>
      </main>
      <main className="w-1/2 signup-banner bg-cover bg-center bg-no-repeat relative px-16 py-10 md:flex items-end hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000BF] to-[rgba(0,0,0,0.75)] opacity-75"></div>

        <div className="z-10 relative">
          <Image src={Logo} alt="logo" width={50} />
          <h1 className="font-semibold text-white text-8xl max-w-xl leading-30">
            Seamless Event Discovery
          </h1>
          <p className="text-xl text-white font-normal">
            Find events that match your vibe.
          </p>
        </div>
      </main>
    </section>
  );
};

export default Verification;