import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

const Input: React.FC<InputProps> = ({ label, className = "", as = 'input', rows, ...props }) => {
  const InputComponent = as === 'textarea' ? 'textarea' : 'input';
  
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <InputComponent
        className={`w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 ${className}`}
        rows={as === 'textarea' ? rows : undefined}
        {...props}
      />
    </div>
  );
};

export { Input };