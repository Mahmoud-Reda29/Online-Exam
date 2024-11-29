// src/components/auth/SignUpForm.tsx
import React from "react";
import NavigationButtons from "./NavigationButtons";

const SignUpForm: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
       <div className="flex justify-end mb-4">
        <NavigationButtons />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Sign up
      </h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

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
            className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Sign up
        </button>
      </form>

      <div className="text-center mt-6 text-sm">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default SignUpForm;
