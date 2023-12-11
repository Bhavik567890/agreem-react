import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-4 border-gray-200 rounded-full border-t-4 border-b-4 h-12 w-12 animate-spin"></div>
    </div>
  );
};

