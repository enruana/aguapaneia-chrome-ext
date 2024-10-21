import '@src/Options.css';
import { useState, useEffect } from 'react';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage, anthropicTokenStorage } from '@extension/storage';
import { Button, Input, MoonIcon, SunIcon } from '@extension/ui';

const Options = () => {
  const theme = useStorage(exampleThemeStorage);
  const [anthropicToken, setAnthropicToken] = useState('');
  const isLight = theme === 'light';
  const logo = isLight ? 'options/logo_horizontal.svg' : 'options/logo_horizontal_dark.svg';

  useEffect(() => {
    const loadToken = async () => {
      const token = await anthropicTokenStorage.get();
      setAnthropicToken(token || '');
    };
    loadToken();
  }, []);

  const saveAnthropicToken = async () => {
    await anthropicTokenStorage.set(anthropicToken);
    console.log('Token guardado:', anthropicToken);
  };

  return (
    <div className={`App ${isLight ? 'bg-gradient-to-br from-blue-100 to-purple-100' : 'bg-gradient-to-br from-gray-800 to-purple-900'} min-h-screen flex flex-col items-center justify-center p-8`}>
      <img src={chrome.runtime.getURL(logo)} className="App-logo mb-8 w-64 animate-pulse" alt="logo" />
      <div className={`${isLight ? 'bg-white' : 'bg-gray-700'} rounded-2xl shadow-2xl p-10 w-full max-w-xl transform transition-all duration-300 hover:scale-105`}>
        <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Configuración de Anthropic</h1>
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Ingrese su token de Anthropic"
            value={anthropicToken}
            onChange={(e) => setAnthropicToken(e.target.value)}
            className="w-full transition-all duration-300 focus:ring-4 focus:ring-purple-300"
            theme={theme}
          />
        </div>
        <Button 
          onClick={saveAnthropicToken} 
          theme={theme}
          className='w-full mb-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
        >
          Guardar Token
        </Button>
        <div className="flex justify-center">
          <button 
            onClick={exampleThemeStorage.toggle} 
            className={`p-3 rounded-full ${isLight ? 'bg-purple-100 hover:bg-purple-200' : 'bg-gray-600 hover:bg-gray-500'} transition-all duration-300 transform hover:scale-110`}
          >
            {isLight ? <MoonIcon className="w-6 h-6 text-purple-600" /> : <SunIcon className="w-6 h-6 text-yellow-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Options, <div className="text-2xl font-bold animate-pulse">Cargando...</div>),
  <div className="text-2xl font-bold text-red-500">Error Ocurrido</div>
);
