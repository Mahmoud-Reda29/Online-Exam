// src/components/auth/SignInForm.tsx
import React from "react";
import OAuthButtons from "./OAuthButtons";

const SignInForm: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-12">
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

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-main focus:border-main"
          />
          <a
            href="#"
            className="text-sm text-main hover:underline float-right mt-2"
          >
            Recover Password?
          </a>
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
