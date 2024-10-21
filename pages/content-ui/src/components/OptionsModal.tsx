import React, { useState } from "react";
import { AguapaneIAIcon } from "./Icons";

interface OptionsModalProps {
  onClose: () => void;
  selectedText: string; // Nuevo prop para el texto seleccionado
}

const OptionsModal: React.FC<OptionsModalProps> = ({ onClose, selectedText }) => {
  const [customPrompt, setCustomPrompt] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-md overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-12 h-12 mr-2 text-red-600">
              <AguapaneIAIcon />
            </div>
            AguapaneIA
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          {selectedText && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
                Selected Text
              </h3>
              <div className="bg-white p-3 rounded border border-gray-200 max-h-32 overflow-y-auto">
                <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">{selectedText}</p>
              </div>
            </div>
          )}
          <button className="w-full py-3 px-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg hover:from-red-800 hover:to-red-900 transition duration-300 transform hover:scale-105 shadow-md">
            ES → EN
          </button>
          <button className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300 transform hover:scale-105 shadow-md">
            EN → ES
          </button>
          
          {/* New custom prompt section */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Custom Prompt</h3>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your custom prompt here..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              rows={3}
            />
            <button
              onClick={() => {
                // Handle custom prompt submission
                console.log("Custom prompt:", customPrompt);
                // Add your logic here
              }}
              className="mt-2 w-full py-2 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Ask AguapaneIA
            </button>
          </div>
        </div>
        <div className="p-6 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-6 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition duration-200 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;
