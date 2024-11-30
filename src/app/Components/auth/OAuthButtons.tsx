import React from 'react';
import { FaGoogle, FaTwitter, FaFacebookF, FaApple } from 'react-icons/fa';

const OAuthButtons = () => {
  const providers = [
    { name: 'Google', icon: <FaGoogle className="text-red-500" />, link: '/api/auth/google' },
    { name: 'Twitter', icon: <FaTwitter className="text-blue-400" />, link: '/api/auth/twitter' },
    { name: 'Facebook', icon: <FaFacebookF className="text-blue-600" />, link: '/api/auth/facebook' },
    { name: 'Apple', icon: <FaApple className="text-gray-800" />, link: '/api/auth/apple' },
  ];

  return (
    <div className="flex justify-center items-center gap-4 p-2">
      {providers.map((provider) => (
        <a
          key={provider.name}
          href={provider.link}
          className="flex justify-center items-center w-12 h-12 bg-white rounded-xl shadow-md transition-transform hover:scale-105"
          aria-label={`Sign in with ${provider.name}`}
        >
          <span className="text-2xl">{provider.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default OAuthButtons;
