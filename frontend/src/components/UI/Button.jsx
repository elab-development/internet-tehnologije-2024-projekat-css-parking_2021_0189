import React from 'react';

const Button = ({ children, onClick, type = 'button', className }) => {
  // Zajedničke klase za sve dugmiće
  const baseClasses = 'w-full py-5 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center space-x-2 text-white';

  // Dinamičke klase zasnovane na tipu dugmića
  let specificClasses = '';
  switch (className) {
    case 'login':
      specificClasses = 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700';
      break;
    case 'register':
      specificClasses = 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700';
      break;
    case 'guest':
      specificClasses = 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700';
      break;
    default:
      specificClasses = className;
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${specificClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;