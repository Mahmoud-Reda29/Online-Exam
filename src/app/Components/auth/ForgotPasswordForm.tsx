'use client';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import OAuthButtons from "./OAuthButtons";
import NavigationButtons from "./NavigationButtons";

const ResetPasswordFormSchema = z.object({
  email: z.string().email("Email is Required").nonempty("Email is required"),
});

type ResetPasswordFormInputs = z.infer<typeof ResetPasswordFormSchema>;

const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(ResetPasswordFormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    setError(null);
    setIsLoading(true);
    localStorage.setItem("email", data.email);
  
    try {
      const response = await axios.post("/api/auth/forgetpassword", { email: data.email });
  
      if (response.status === 200) {
        router.push("/verifycode");
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
    <div className="w-full max-w-md bg-white rounded-lg p-10">
      <div className="flex justify-end mb-4">
        <NavigationButtons />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Forgot your Password?
      </h2>
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
          {isLoading ? "Resetting Password..." : "Reset Password"}
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

export default ForgotPasswordForm;
