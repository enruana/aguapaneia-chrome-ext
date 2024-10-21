import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';
import { Button, MoonIcon, SunIcon } from '@extension/ui';

const notificationOptions = {
  type: 'basic',
  iconUrl: chrome.runtime.getURL('icon-34.png'),
  title: 'Injecting content script error',
  message: 'You cannot inject script here!',
} as const;

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';
  const goGithubSite = () =>
    chrome.tabs.create({ url: 'https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite' });

  const injectContentScript = async () => {
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });

    if (tab.url!.startsWith('about:') || tab.url!.startsWith('chrome:')) {
      chrome.notifications.create('inject-error', notificationOptions);
    }

    await chrome.scripting
      .executeScript({
        target: { tabId: tab.id! },
        files: ['/content-runtime/index.iife.js'],
      })
      .catch(err => {
        if (err.message.includes('Cannot access a chrome:// URL')) {
          chrome.notifications.create('inject-error', notificationOptions);
        }
      });
  };

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className={`App ${isLight ? 'bg-gradient-to-br from-blue-100 to-purple-100' : 'bg-gradient-to-br from-gray-800 to-purple-900'} min-h-screen flex flex-col items-center justify-center p-6`}>
      <div className={`m-6 ${isLight ? 'bg-white' : 'bg-gray-700'} rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300`}>
        <img src={chrome.runtime.getURL(logo)} alt="Logo" className="w-32 h-32 mx-auto mb-6" />
        <h1 className={`text-3xl font-extrabold mb-6 text-center ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>
          Chrome Extension
        </h1>
        <Button
          onClick={injectContentScript}
          theme={theme}
          className='w-full mb-4 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
        >
          Inject Content Script
        </Button>
        <Button
          onClick={openOptionsPage}
          theme={theme}
          className='w-full mb-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
        >
          Open Options Page
        </Button>
        <div className="flex justify-center">
          <ToggleButton>
            {isLight ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            
          </ToggleButton>
        </div>
      </div>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorage(exampleThemeStorage);
  return (
    <button
      className={`
        ${props.className}
        font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 flex items-center justify-center transition-all duration-300
        ${theme === 'light' 
          ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-purple-300/50' 
          : 'bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-blue-300/50'}
      `}
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div className="text-xl font-bold animate-pulse"> Loading ... </div>), <div className="text-xl font-bold text-red-500"> Error Occurred </div>);
