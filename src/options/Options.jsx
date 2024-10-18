/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";

function Options() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Cargar el token de almacenamiento local cuando se monte el componente
    chrome.storage.sync.get(["anthropicToken"], (result) => {
      if (result.anthropicToken) {
        setToken(result.anthropicToken);
      }
    });
  }, []);

  const handleSave = () => {
    // Guardar el token en el almacenamiento local de Chrome
    chrome.storage.sync.set({ anthropicToken: token }, () => {
      console.log("Token guardado.");
      alert("Token guardado con éxito");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Configuración de la Extensión</h1>
      <label>
        Ingresa tu token de Anthropic:
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginLeft: "10px", width: "300px" }}
        />
      </label>
      <br />
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Guardar Token
      </button>
    </div>
  );
}

export default Options;
