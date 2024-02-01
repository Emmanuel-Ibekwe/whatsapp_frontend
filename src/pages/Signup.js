import SignupForm from "../components/auth/SignupForm";

function Signup() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden text-white">
      <div className="flex w-[1600px] mx-auto h-full">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
