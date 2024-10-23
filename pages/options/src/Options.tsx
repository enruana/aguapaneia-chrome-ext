import '@src/Options.css';
import { useState, useEffect } from 'react';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { anthropicTokenStorage } from '@extension/storage';
import { Button, Input, Header, Footer } from '@extension/ui';

const Options = () => {
  const [anthropicToken, setAnthropicToken] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await anthropicTokenStorage.get();
      setAnthropicToken(token || '');
    };
    loadToken();
  }, []);

  const saveAnthropicToken = async () => {
    await anthropicTokenStorage.set(anthropicToken);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-[400px] max-w-md overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105">
        <Header title="AguapaneIA" />
        <div className="p-8 space-y-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Token de Anthropic</h2>
            <p className="text-sm text-gray-600 mb-4">
              Para utilizar AguapaneIA, necesitas agregar tu token de Anthropic. 
              Puedes obtenerlo en la <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">página oficial de Anthropic</a>.
            </p>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Ingrese su token de Anthropic"
              value={anthropicToken}
              onChange={(e) => setAnthropicToken(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
            />
            {isSaved && (
              <span className="absolute right-3 top-3 text-green-500 animate-pulse">
                ✓ Guardado
              </span>
            )}
          </div>
          <Button 
            onClick={saveAnthropicToken} 
            className='w-full bg-red-500 text-white py-3 rounded-lg transition-all duration-300 transform hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
          >
            Guardar Token
          </Button>
        </div>
        <Footer>
          <p className="text-sm text-gray-600">Hecho con ❤️ en Boyacá</p>
        </Footer>
      </div>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(Options, <div className="text-2xl font-bold animate-pulse">Cargando...</div>),
  <div className="text-2xl font-bold text-red-500">Error Ocurrido</div>
);
