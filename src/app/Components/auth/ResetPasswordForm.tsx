"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigationButtons from "./NavigationButtons";
import OAuthButtons from "./OAuthButtons";

const SignInFormSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number"),
});

type SignInFormInputs = z.infer<typeof SignInFormSchema>;

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(SignInFormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
        const email = localStorage.getItem("email");
        const response = await axios.put("/api/auth/resetpassword", { email: email, newPassword: data.newPassword });
    
        if (response.status === 200) {
          router.push("/signin");
        } else {
          throw new Error(response.data?.error || "Reset password failed");
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(
          (axiosError.response?.data as { message?: string })?.message || "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-10 shadow-md">
      <div className="flex justify-end mb-4">
        <NavigationButtons />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reset Password</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            className={`mt-1 w-full p-2 pr-10 border rounded-md shadow-sm ${
              errors.email
                ? "border-red-500"
                : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            placeholder="Enter Password"
            className={`mt-1 w-full p-2 pr-10 border rounded-md shadow-sm ${
              errors.newPassword
                ? "border-red-500"
                : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("newPassword")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 top-5 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <FiEyeOff className="w-5 h-5" />
            ) : (
              <FiEye className="w-5 h-5" />
            )}
          </button>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-main hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">Or Continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <OAuthButtons mode="signin" />
    </div>
  );
};

export default SignInForm;
