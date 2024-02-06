import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signupUser, changeStatus } from "../../store/userSlice";
import Input from "./Input";
import Picture from "./Picture";
import axios from "axios";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");

  const onSubmit = async data => {
    dispatch(changeStatus("loading"));
    if (picture) {
      await uploadImage().then(async response => {
        let res = await dispatch(
          signupUser({ ...data, picture: response.secure_url })
        );
        // console.log(res);
        if (res?.payload?.user) navigate("/");
      });
    } else {
      const res = await dispatch(signupUser({ ...data, picture: "" }));
      if (res?.payload?.user) navigate("/");
    }
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    console.log(data);
    return data;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
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
            placeholder="Status (Optional)"
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

          {error && (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          )}
          <Picture
            readablePicture={readablePicture}
            onSetReadablePicture={setReadablePicture}
            onSetPicture={setPicture}
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
