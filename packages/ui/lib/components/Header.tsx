import React from "react";

interface HeaderProps {
  title?: string;
  icon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title = "AguapaneIA", icon }) => {
  return (
    <header className="p-6 border-b border-gray-200 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center">
        {icon && <div className="w-12 h-12 mr-2 text-red-600">{icon}</div>}
        {title}
      </h1>
    </header>
  );
};

export { Header };
