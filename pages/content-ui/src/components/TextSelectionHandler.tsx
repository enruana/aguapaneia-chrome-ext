import { useEffect, useState } from 'react';
import AguapaneIAButton from './AguapaneIAButton';
import OptionsModal from './OptionsModal';

interface ButtonPosition {
  top: number;
  left: number;
}

export default function TextSelectionHandler() {
  const [selectedText, setSelectedText] = useState('');
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({ top: 0, left: 0 });
  const [isButtonShown, setIsButtonShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const handleSelectionChange = () => {
      if (isModalOpen) return; // Ignore selection changes when modal is open

      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== '') {
        setSelectedText(selection.toString().trim());
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setButtonPosition({ top: rect.bottom, left: rect.left });
        setIsButtonShown(true);
      } else {
        setSelectedText('');
        setIsButtonShown(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [isModalOpen]); // Add isModalOpen to the dependency array

  const handleButtonClick = () => {
    console.log('Selected text:', selectedText);
    // Add your logic here for what should happen when the button is clicked
  };



  const handleOptionsClick = () => {
    setIsModalOpen(true);
    setIsButtonShown(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isButtonShown && (
        <AguapaneIAButton onClick={handleButtonClick} position={buttonPosition} onOptionsClick={handleOptionsClick} />
      )}
      {isModalOpen && <OptionsModal onClose={closeModal} selectedText={selectedText} />}
    </>
  );
}
