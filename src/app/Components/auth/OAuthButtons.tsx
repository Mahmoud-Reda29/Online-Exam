import React from 'react';
import { signIn } from 'next-auth/react';
import { FaGoogle, FaTwitter, FaFacebookF, FaGithub } from 'react-icons/fa';

interface OAuthButtonsProps {
  mode: 'signin' | 'signup'; // Add mode prop to differentiate login and register
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ mode }) => {
  const providers = [
    { name: 'Google', icon: <FaGoogle className="text-red-500" />, id: 'google' },
    { name: 'Twitter', icon: <FaTwitter className="text-blue-400" />, id: 'twitter' },
    { name: 'Facebook', icon: <FaFacebookF className="text-blue-600" />, id: 'facebook' },
    { name: 'Github', icon: <FaGithub className="text-gray-800" />, id: 'github' },
  ];

  const handleOAuthSignIn = (providerId: string) => {
    // Pass the mode as a query parameter to NextAuth
    signIn(providerId, { callbackUrl: `/${mode}` });
  };

  return (
    <div className="flex justify-center items-center gap-4 p-2">
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleOAuthSignIn(provider.id)}
          className="flex justify-center items-center w-12 h-12 bg-white rounded-xl shadow-md transition-transform hover:scale-105"
          aria-label={`Sign ${mode === 'signup' ? 'up' : 'in'} with ${provider.name}`}
        >
          <span className="text-2xl">{provider.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default OAuthButtons;
