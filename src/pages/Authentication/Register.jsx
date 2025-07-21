import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lotties/register.json";
import { useMutation } from "@tanstack/react-query";
import { saveUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { createUser, setUser, updateUser, loginWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: saveUserToDB } = useMutation({
    mutationFn: saveUser,
  });

  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data?.data?.url;
  };

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    if (!image[0]) return toast.error("Please select an image.");

    try {
      const photoURL = await uploadToImgBB(image[0]);

      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });
      

      await saveUserToDB({ name, email, photoURL });

      if (user.displayName && user.photoURL) {
        Swal.fire("Success", "You have registered successfully!", "success");
        navigate("/");
      } else {
        toast.error("Missing profile info from Google.");
      }
    } catch (error) {
      toast.error("Registration failed: " + error.message);
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

      //  Delay save until user data is fully available
      if (user.displayName && user.photoURL) {
        saveUserToDB(userData);
        setUser(user);
        toast.success("You  Logged in with Google!");
        navigate("/");
      } else {
        toast.error("Missing profile info from Google.");
      }
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-24 px-4 py-4 bg-gray-50">
      <div className="card bg-white w-full max-w-sm py-6 px-4 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Register your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="label">Name</label>
            <input
              {...register("name", { required: true, minLength: 5 })}
              className="input input-bordered w-full"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">Name is too short</p>
            )}
          </div>

          <div>
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">Email is required</p>
            )}
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  validate: {
                    hasUppercase: (v) => /[A-Z]/.test(v),
                    hasLowercase: (v) => /[a-z]/.test(v),
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">Invalid password</p>
            )}
          </div>

          <div className="mb-8">
            <label className="label">Upload Profile Photo</label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-red-400 text-sm">Image is required</p>
            )}
          </div>

          <button className="btn btn-outline w-full bg-[#009fff] text-white px-4 py-1 rounded-lg text-base hover:bg-[#007dff] cursor-pointer">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#009dff]">
            Login
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
        <Lottie animationData={registerAnimation} className="w-80" loop />
      </div>
    </div>
  );
};

export default Register;

