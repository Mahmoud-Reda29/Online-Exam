'use client';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import OAuthButtons from "./OAuthButtons";
import NavigationButtons from "./NavigationButtons";

// Update Zod schema to validate 6-digit string
const VerifyCodeFormSchema = z.object({
  resetCode: z
    .string()
    .length(6, "Verification code must be exactly 6 digits.")
});

type VerifyCodeFormInputs = z.infer<typeof VerifyCodeFormSchema>;

const VerifyCodeForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeFormInputs>({
    resolver: zodResolver(VerifyCodeFormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<VerifyCodeFormInputs> = async (data) => {
    setError(null);  // Clear any previous errors
    setIsLoading(true);  // Set loading state to true
  
    try {
      // Send resetCode as string, as expected by the backend
      const response = await axios.post("/api/auth/codeVerification", {
        resetCode: data.resetCode,
      });
  
      // Check if the response status is 'Success'
      if (response.data?.status === "Success") {
        // Successfully verified, redirect to reset password page
        router.push("/resetpassword");
      } else {
        // If the response does not contain 'Success', throw an error
        throw new Error("Verification failed");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      // Set error message from backend response or default message
      setError(
        (axiosError.response?.data as { error?: string })?.error ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);  // Set loading state back to false
    }
  };
  

  const handleResendCode = async () => {
    setResendLoading(true);
    setError(null); // Clear any previous errors
    const email = localStorage.getItem("email"); // Get the email from localStorage
    try {
      const response = await axios.post("/api/auth/forgetpassword", { email: email }); // Endpoint to resend code
  
      if (response.data?.status === "Success") {
        alert("Verification code has been resent! Please check your email.");
      } else {
        throw new Error(response.data?.error || "Failed to resend the verification code.");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        (axiosError.response?.data as { error?: string })?.error ||
        "Something went wrong. Please try again."
      );
    } finally {
      setResendLoading(false);
    }
  };
  

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-10 shadow-md">
      <div className="flex justify-end mb-4">
        <NavigationButtons />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Verify Your Code</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            type="text"
            id="resetCode"
            placeholder="Enter your code"
            className={`mt-1 w-full p-2 pr-10 border rounded-md shadow-sm ${
              errors.resetCode ? "border-red-500" : "focus:ring-2 focus:ring-main focus:outline-none"
            }`}
            {...register("resetCode")}
          />
          {errors.resetCode && (
            <p className="text-red-500 text-sm mt-1">{errors.resetCode.message}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-end mt-4">
          <p className="text-xs text-gray-600 pr-1">Didn't receive a code? </p>
          <button
            type="button"
            onClick={handleResendCode} // Trigger resend code
            disabled={resendLoading}
            className={`text-xs ${resendLoading ? "text-gray-400" : "text-blue-600 hover:underline"}`}
          >
            {resendLoading ? "Resending..." : "Resend"}
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-main hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
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

export default VerifyCodeForm;
