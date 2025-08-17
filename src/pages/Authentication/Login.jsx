import React, { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lotties/login.json";
import { useMutation } from "@tanstack/react-query";
import { saveUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login, loginWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: saveUserToDB } = useMutation({
    mutationFn: saveUser,
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await login(email, password);
      const user = result.user;
      setUser(user);
      toast.success("You have Logged in successfully!");
      navigate(location.state || "/");
    } catch (err) {
      setError(err.message);
      toast.error("Login failed: " + err.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      if (user.displayName && user.photoURL) {
        saveUserToDB(userData);
        setUser(user);
        toast.success("You have Logged in with Google!");
        navigate("/");
      } else {
        toast.error("Missing profile info from Google.");
      }
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-24 px-4 pt-8 pb-26 bg-blue-50 dark:bg-gray-800 dark:text-white">
      <div className="card bg-base-100 w-full max-w-sm py-6 px-4 shadow-md dark:bg-gray-800 dark:text-white dark:border dark:border-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="label dark:text-white">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full dark:text-white dark:bg-gray-800 dark:border dark:border-white"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-error text-sm dark:text-white">Email is required</p>
            )}
          </div>

          <div>
            <label className="label dark:text-white">Password</label>
            <div className="relative">
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full dark:text-white dark:bg-gray-800 dark:border dark:border-white"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash  className="dark:text-white"/> : <FaEye className="dark:text-white"/>}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm dark:text-white">Password is required</p>
            )}
          </div>

          {error && <p className="text-error text-sm dark:text-white">{error}</p>}

          <button
            className="btn btn-outline mt-4 w-full  bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-[#009dff]">
            Register
          </Link>
        </p>

        <div className="divider my-6">OR</div>

        <button
          onClick={handleLoginWithGoogle}
          className="btn btn-outline w-full bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer"
        >
          Continue with Google
        </button>
      </div>

      <div>
        <Lottie animationData={loginAnimation} className="w-80" loop />
      </div>
    </div>
  );
};

export default Login;

