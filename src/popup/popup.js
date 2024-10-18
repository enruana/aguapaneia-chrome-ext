/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";

function Popup() {
  const handleOpenOptions = () => {
    // Abrir la página de configuración de la extensión
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage(() => {
        console.log("Página de configuración abierta");
      });
    } else {
      // Si la API no está disponible (rara vez en versiones antiguas), abrir manualmente la página
      window.open(chrome.runtime.getURL("options.html"));
    }
  };

  return (
    <div>
      <h1>Mi Extensión de Chrome</h1>
      <button onClick={handleOpenOptions}>Abrir Configuración</button>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById("root"));
