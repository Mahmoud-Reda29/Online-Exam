// src/components/auth/SignInForm.tsx
"use client";
import React, { useState } from "react";
import OAuthButtons from "./OAuthButtons";
import NavigationButtons from "./NavigationButtons";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full first-line:max-w-md bg-white rounded-lg  p-10">
      <div className="flex justify-end mb-4">
        <NavigationButtons />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign in</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`mt-1 w-full p-2 pr-10 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            placeholder="Enter Password"
          />
          {/* Eye Icon */}
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
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-main text-white font-semibold rounded-md hover:bg-main"
        >
          Sign in
        </button>
      </form>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 text-sm">Or Continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <OAuthButtons />
    </div>
  );
};

export default SignInForm;
