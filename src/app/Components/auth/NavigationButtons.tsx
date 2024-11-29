'use client'
import { useState } from "react";
import Link from "next/link";

const NavigationButtons: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
    // Add language handling logic here (e.g., with i18next or Next.js router locales)
  };

  return (
    <div className="flex items-center justify-end space-x-4">
      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {selectedLanguage} ▾
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
            <button
              onClick={() => handleLanguageChange("English")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("Arabic")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Arabic
            </button>
          </div>
        )}
      </div>

      {/* Sign In Link */}
      <Link
        href="/signin"
        className="text-sm text-blue-600 hover:underline font-medium"
      >
        Sign in
      </Link>

      {/* Register Link */}
      <Link
        href="/signup"
        className="px-4 py-2 text-sm bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 hover:shadow-md transition"
      >
        Register
      </Link>
    </div>
  );
};

export default NavigationButtons;
