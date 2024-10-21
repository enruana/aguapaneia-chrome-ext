import { Button } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import TextSelectionHandler from './components/TextSelectionHandler';

export default function App() {
  const theme = useStorage(exampleThemeStorage);


  return (
    <div>
      <TextSelectionHandler />
    </div>
  );
}
