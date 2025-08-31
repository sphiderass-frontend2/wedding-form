import { Button } from "./ui/button";
import { Input } from "./ui/input";

const VerificationForm = () => {
  return (
    <>
      <main className="flex items-center gap-4 ">
        <Input
          type="text "
          className="w-[50px] h-[50px] rounded-[5px] text-3xl font-medium"
        />
        <Input
          type="text"
          className="w-[50px] h-[50px] rounded-[5px] text-3xl font-medium"
        />
        <Input
          type="text"
          className="w-[50px] h-[50px] rounded-[5px] text-3xl font-medium"
        />
        <Input
          type="text"
          className="w-[50px] h-[50px] rounded-[5px] text-3xl font-medium"
        />
      </main>

      <p className="text-lg text-red-500 font-medium">00:30</p>
      <Button className="w-full" type="button">
        Verify
      </Button>

      <div className="flex items-center justify-center gap-2 text-lg font-medium">
        <p className="text-gray ">If you didn't receive a code!</p>

        <button className="text-accent">Resend</button>
      </div>
    </>
  );
};

export default VerificationForm;