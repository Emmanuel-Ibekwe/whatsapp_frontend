import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../store/userSlice";
import Input from "./Input";
import { setExpirationInLocalStorage } from "../../utils/auth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema)
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);

  const onSubmit = async data => {
    let res = await dispatch(loginUser(data));
    console.log(res);
    if (!res.error) {
      setExpirationInLocalStorage();
    }
    if (res?.payload?.user) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <Input
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {error && (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <button
            className="w-full flex justify-center bg-green_1 
            text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 
            shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign in"
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>You do not have an account?</span>
            <Link
              to="/signup"
              className="hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
