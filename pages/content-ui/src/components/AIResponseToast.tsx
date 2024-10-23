import React, { useState } from "react";
import { Button, Header, Footer } from "@extension/ui";
import { ClipboardIcon, AguapaneIAIcon, CheckIcon } from "./Icons";

interface AIResponseToastProps {
  onClose: () => void;
  response: string;
  isLoading: boolean;
}

const AIResponseToast: React.FC<AIResponseToastProps> = ({
  onClose,
  response,
  isLoading,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] transition-all duration-300 ease-in-out transform translate-x-0">
      <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden">
        <div className="bg-gray-100 p-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2" >
            <AguapaneIAIcon />
            </div>
            <span className="text-sm font-semibold">AguapaneIA</span>
          </div>
          <Button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Cerrar</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="text-center">
              <p>Cargando...</p>
            </div>
          ) : (
            <div>
              <div className="bg-gray-50 p-3 rounded border border-gray-200 max-h-48 overflow-y-auto mb-2">
                <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">
                  {response}
                </p>
              </div>
              <Button
                onClick={copyToClipboard}
                className={`w-full mt-2 py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center ${
                  isCopied
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isCopied ? (
                  <>
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <ClipboardIcon className="w-4 h-4 mr-2" />
                    Copiar respuesta
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIResponseToast;
