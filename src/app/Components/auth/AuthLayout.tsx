import React from "react";
import Image from "next/image"; // Import Next.js Image component
import NavigationButtons from "./NavigationButtons";
type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center bg-[#F0F4FC] p-8 shadow-2xl rounded-tr-[100px] rounded-br-[100px]">
        <div className="items-start font-poppins">
          <h1 className="text-5xl font-semibold font-poppins leading-tight">
            Welcome to{" "}
            <span className="block text-[#122D9C] leading-loose">Elevate</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
          </p>
        </div>
        <div className="flex items-start">
          <Image
            src={"/bro.png"}
            alt="Illustration"
            width={350}
            height={350}
            priority
          />
        </div>
      </div>

      {/* Right Side: Dynamic Content */}
      <div className="flex flex-col items-center justify-center p-8">
        <main className="flex justify-center items-center flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
