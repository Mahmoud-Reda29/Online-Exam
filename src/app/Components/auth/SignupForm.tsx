"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const SignUpFormSchema = z
  .object({
    userName: z
      .string()
      .min(4, { message: "Username must be at least 4 characters long." })
      .max(25, { message: "Username must not exceed 25 characters." })
      .regex(/^[a-zA-Z]+$/, { message: "Username must contain only letters." }),
    firstName: z
      .string()
      .regex(/^[a-zA-Z]+$/, { message: "First name must contain only letters." }),
    lastName: z
      .string()
      .regex(/^[a-zA-Z]+$/, { message: "Last name must contain only letters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters long." })
      .max(15, { message: "Phone number must not exceed 15 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." }),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });

type SignUpFormInputs = z.infer<typeof SignUpFormSchema>;

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent auto-redirect for better control
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        window.location.href = "/home"; // Redirect after successful signup
      }
    } catch (err) {
      setError(err as string || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="userName"
            placeholder="Enter your username"
            className={`mt-1 w-full p-2 border rounded-md shadow-sm ${
              errors.userName ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("userName")}
          />
          {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            className={`mt-1 w-full p-2 border rounded-md shadow-sm ${
              errors.firstName ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("firstName")}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            className={`mt-1 w-full p-2 border rounded-md shadow-sm ${
              errors.lastName ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("lastName")}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            className={`mt-1 w-full p-2 border rounded-md shadow-sm ${
              errors.email ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="1234567890"
            className={`mt-1 w-full p-2 border rounded-md shadow-sm ${
              errors.phone ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter password"
            className={`mt-1 w-full p-2 border rounded-md shadow-sm ${
              errors.password ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type={showRePassword ? "text" : "password"}
            id="rePassword"
            placeholder="Confirm password"
            className={`mt-1 w-full p-2 border rounded-md shadow-sm ${
              errors.rePassword ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("rePassword")}
          />
          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showRePassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
          {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-main hover:bg-main-dark text-white py-2 px-4 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/signin" className="text-main hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
