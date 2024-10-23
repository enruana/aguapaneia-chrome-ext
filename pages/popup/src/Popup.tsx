import "@src/Popup.css";
import { useStorage, withErrorBoundary, withSuspense } from "@extension/shared";
import type { ComponentPropsWithoutRef } from "react";
import { Button, Footer } from "@extension/ui";

const notificationOptions = {
  type: "basic",
  iconUrl: chrome.runtime.getURL("icon-34.png"),
  title: "Injecting content script error",
  message: "You cannot inject script here!",
} as const;

const Popup = () => {
  const logo = "popup/logo_vertical.svg";

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="bg-white flex items-center justify-center z-[9999] h-screen">
      <div className="bg-white rounded-3xl shadow-2xl w-96 max-w-md overflow-hidden">
        <div className="p-10 space-y-8">
          <div className="text-center">
            <img
              src={chrome.runtime.getURL(logo)}
              alt="Logo"
              className="w-28 h-28 mx-auto mb-6 drop-shadow-xl "
            />
            <h1 className="text-4xl font-extrabold mb-2 text-gray-800 tracking-tight">
              AguapaneIA
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Tu asistente inteligente personal
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
            
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="mr-2">🔄</span> Refactorizar texto
              </li>
              <li className="flex items-center">
                <span className="mr-2">🌐</span> Traducir texto
              </li>
              <li className="flex items-center">
                <span className="mr-2">💡</span> Generar resultados con prompts personalizados
              </li>
            </ul>
          </div>
          
          <Button
            onClick={openOptionsPage}
            className="w-full bg-red-500 text-white py-4 text-lg font-semibold rounded-xl hover:bg-red-600 transition-colors duration-300 transform hover:scale-105"
          >
            Configurar AguapaneIA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(
    Popup,
    <div className="text-xl font-bold animate-pulse">Cargando...</div>
  ),
  <div className="text-xl font-bold text-red-500">Error Ocurrido</div>
);
