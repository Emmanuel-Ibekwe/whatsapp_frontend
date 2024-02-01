import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import PulseLoader from "react-spinners/PulseLoader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "./Input";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });
  const { status } = useSelector(state => state.user);

  const onSubmit = data => console.log(data);
  // console.log("values", watch());
  // console.log("errors", errors);

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h1 className="mt-6 text-3xl font-bold">Welcome</h1>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <Input
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          <Input
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <Input
            name="status"
            type="text"
            placeholder="Status"
            register={register}
            error={errors?.status?.message}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          <button
            className="w-full flex justify-center bg-green_1 
            text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 
            shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Have an account?</span>
            <Link
              to="/login"
              className="hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
