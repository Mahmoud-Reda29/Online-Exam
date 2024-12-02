"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigationButtons from "./NavigationButtons";
import OAuthButtons from "./OAuthButtons";
import Link from "next/link";

const SignInFormSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z
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
      const result = await signIn("credentials", {
        redirect: false, // Handle redirection manually
        email: data.email,
        password: data.password,
        callbackUrl: "/home", // Ensure this matches `route.ts` configuration
      });

      setIsLoading(false);

      if (result?.error) {
        // Update error message based on API error response format in `route.ts`
        const message =
          result.error === "CredentialsSignin"
            ? "Invalid email or password. Please try again."
            : result.error;
        setError(message);
      } else if (result?.ok) {
        // Redirect to `callbackUrl` or default route
        router.push(result.url || "/home");
      }
    } catch (err) {
      setIsLoading(false);
      setError(err  as string || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-10 shadow-md">
      <div className="flex justify-end mb-4">
        <NavigationButtons />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign in</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            className={`mt-1 w-full p-2 pr-10 border rounded-md shadow-sm ${
              errors.email ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter Password"
            className={`mt-1 w-full p-2 pr-10 border rounded-md shadow-sm ${
              errors.password ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 top-5 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <div className="flex justify-end mt-4">
          <Link href="/forgetpassword" className="text-xs text-blue-600 hover:underline">
            Recover Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-main hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Signing in..." : "Sign in"}
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
