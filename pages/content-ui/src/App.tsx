import { useEffect, useState } from 'react';
import { Button } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';

interface ButtonPosition {
  top: number;
  left: number;
}

export default function App() {
  const theme = useStorage(exampleThemeStorage);
  const [showButton, setShowButton] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({ top: 0, left: 0 });

  useEffect(() => {
    console.log('content ui loaded');

    const messageListener = (message: any) => {
      if (message.type === 'SHOW_BUTTON') {
        setShowButton(true);
        setSelectedText(message.payload.text);
        setButtonPosition(message.payload.position);
      } else if (message.type === 'HIDE_BUTTON') {
        setShowButton(false);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const handleButtonClick = () => {
    // Add your logic here for what should happen when the button is clicked
    console.log('Selected text:', selectedText);
    // For example, you could open a popup or send the text to an API
  };

  return (
    <div>
      {showButton && (
        <div
          style={{
            position: 'absolute',
            top: `${buttonPosition.top}px`,
            left: `${buttonPosition.left}px`,
            zIndex: 9999,
          }}
        >
          <Button theme={theme} onClick={handleButtonClick}>
            Process Selected Text
          </Button>
        </div>
      )}
    </div>
  );
}
