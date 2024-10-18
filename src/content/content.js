document.addEventListener('mouseup', function (event) {
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText.length > 0) {
      // Si ya existe el botón, eliminarlo primero para evitar duplicados
      const existingButton = document.getElementById('my-extension-button');
      if (existingButton) {
        existingButton.remove();
      }
  
      // Crear el botón
      const button = document.createElement('button');
      button.id = 'my-extension-button';
      button.innerText = 'Click me';
      button.style.position = 'absolute';
      button.style.left = `${event.pageX + 10}px`;
      button.style.top = `${event.pageY + 10}px`;
      button.style.zIndex = '9999';
      button.style.padding = '5px';
      button.style.fontSize = '12px';
      button.style.background = '#4CAF50';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '3px';
      button.style.cursor = 'pointer';
  
      // Agregar el botón al documento
      document.body.appendChild(button);
  
      // Manejar el clic del botón
      button.addEventListener('click', function () {
        alert(`Texto seleccionado: "${selectedText}"`);
        // Eliminar el botón después de hacer clic
        button.remove();
      });
  
      // Eliminar el botón si se hace clic fuera de él
      document.addEventListener('mousedown', function (event) {
        if (!button.contains(event.target)) {
          button.remove();
        }
      }, { once: true });
    }
  });
  