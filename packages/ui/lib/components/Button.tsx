import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-md";

  return (
    <button
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
