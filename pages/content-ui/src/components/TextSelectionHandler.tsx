import { useEffect, useState } from "react";
import AguapaneIAButton from "./AguapaneIAButton";
import OptionsModal from "./OptionsModal";
import AIResponseToast from "./AIResponseToast";
import { aiService, REFACTOR_TEXT_PROMPT } from "@extension/shared";

interface ButtonPosition {
  top: number;
  left: number;
}

export default function TextSelectionHandler() {
  const [selectedText, setSelectedText] = useState("");
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({
    top: 0,
    left: 0,
  });
  const [isButtonShown, setIsButtonShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (isModalOpen) return; // Ignore selection changes when modal is open

      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== "") {
        setSelectedText(selection.toString().trim());
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setButtonPosition({ top: rect.bottom, left: rect.left });
        setIsButtonShown(true);
      } else {
        setSelectedText("");
        setIsButtonShown(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [isModalOpen]); // Add isModalOpen to the dependency array

  const handleOptionsClick = () => {
    setIsModalOpen(true);
    setIsButtonShown(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeToast = () => {
    setIsToastOpen(false);
  };


  const handleAIRequest = async (prompt: string) => {
    try {
      setIsLoading(true);
      setIsToastOpen(true);
      const response = await aiService.ask(prompt);
      setResponse(response.text);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setResponse("Lo siento, hubo un error al procesar tu solicitud.");
    } finally {
      setIsLoading(false);
      setIsButtonShown(false);
    }
  };

  return (
    <>
      {isButtonShown && (
        <AguapaneIAButton
          onClick={() => handleAIRequest(REFACTOR_TEXT_PROMPT + selectedText)}
          position={buttonPosition}
          onOptionsClick={handleOptionsClick}
        />
      )}
      {isModalOpen && (
        <OptionsModal
          onClose={closeModal}
          selectedText={selectedText}
          onOptionSelected={handleAIRequest}
        />
      )}
      {isToastOpen && (
        <AIResponseToast
          onClose={closeToast}
          response={response}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
