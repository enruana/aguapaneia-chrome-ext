import React from "react";

interface FooterProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ onClose, children }) => {
  return (
    <footer className="p-6 bg-gray-50 flex justify-between items-center">
      <div>{children}</div>
      <div>
        {onClose && (
          <button
            onClick={onClose}
            className="py-2 px-6 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition duration-200 transform hover:scale-105"
          >
            Close
          </button>
        )}
      </div>
    </footer>
  );
};

export { Footer };
