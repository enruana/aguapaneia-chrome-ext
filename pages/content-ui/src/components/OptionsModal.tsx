import React, { useState } from "react";
import { Button, Input, Header, Footer } from "@extension/ui";
import { ClipboardIcon, AguapaneIAIcon } from "./Icons";
import { EN_ES_PROMPT, ES_EN_PROMPT, REFACTOR_TEXT_PROMPT } from '@extension/shared';

interface OptionsModalProps {
  onClose: () => void;
  selectedText: string;
  onOptionSelected: (prompt: string) => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  onClose,
  selectedText,
  onOptionSelected,
}) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectedOption = async (prompt: string) => {
    onOptionSelected(prompt);
    setIsLoading(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-w-md overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105">
        <Header icon={<AguapaneIAIcon />} />
        <div className="p-6 space-y-4">
          {selectedText && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <ClipboardIcon className="w-4 h-4 mr-2" />
                Selected Text
              </h3>
              <div className="bg-white p-3 rounded border border-gray-200 max-h-32 overflow-y-auto">
                <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">
                  {selectedText}
                </p>
              </div>
            </div>
          )}
          <Button 
            className="w-full bg-red-500 text-white" 
            onClick={() => handleSelectedOption(REFACTOR_TEXT_PROMPT + selectedText)}
            disabled={isLoading}
          >
            Improve text
          </Button>
          <Button 
            className="w-full bg-red-500 text-white"
            onClick={() => handleSelectedOption(ES_EN_PROMPT + selectedText)}
            disabled={isLoading}
          >
            ES → EN
          </Button>
          <Button 
            className="w-full bg-red-500 text-white"
            onClick={() => handleSelectedOption(EN_ES_PROMPT + selectedText)}
            disabled={isLoading}
          >
            EN → ES
          </Button>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Custom Prompt
            </h3>
            <Input
              as="textarea"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your custom prompt here..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              rows={3}
            />
            <Button
              onClick={() => handleSelectedOption(customPrompt)}
              className="w-full bg-red-500 text-white"
              disabled={isLoading}
            >
              Ask AguapaneIA
            </Button>
          </div>
        </div>
        <Footer onClose={onClose} />
      </div>
    </div>
  );
};

export default OptionsModal;
