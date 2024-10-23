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
      if (isModalOpen) return;

      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== "") {
        const selectedText = selection.toString().trim();
        setSelectedText(selectedText);

        // Get the bounding rectangle of the selection
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Calculate the position for the button
        const buttonWidth = 100; // Adjust based on your button's actual width
        const buttonHeight = 40; // Adjust based on your button's actual height
        const margin = 10; // Margin from the selection

        // Get scroll position
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Calculate position considering scroll
        let top = rect.bottom + scrollY + margin;
        let left = rect.left + scrollX + (rect.width / 2) - (buttonWidth / 2);

        // Adjust if the button would go off-screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < scrollX) left = scrollX + margin;
        if (left + buttonWidth > scrollX + viewportWidth) left = scrollX + viewportWidth - buttonWidth - margin;
        if (top + buttonHeight > scrollY + viewportHeight) top = rect.top + scrollY - buttonHeight - margin;

        setButtonPosition({ top, left });
        setIsButtonShown(true);
      } else {
        setSelectedText("");
        setIsButtonShown(false);
      }
    };

    const handleMouseUp = () => {
      // Add a small delay to ensure the selection is complete
      setTimeout(handleSelectionChange, 10);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isModalOpen]);

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
      {isButtonShown && selectedText && (
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
