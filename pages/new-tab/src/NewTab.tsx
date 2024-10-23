import "@src/NewTab.css";
import "@src/NewTab.scss";
import { withErrorBoundary, withSuspense } from "@extension/shared";

const NewTab = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br text-gray-900 ">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <img
            src="https://raw.githubusercontent.com/enruana/aguapaneia-chrome-ext/refs/heads/main/pages/content-ui/public/aguapaneia.svg"
            alt="AguapaneIA Logo"
            className="w-32 h-32 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">AguapaneIA</h1>
          <p className="text-xl italic">
            Navega con inteligencia, potencia tu productividad
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Funcionalidades Principales
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span>Selección de Texto Inteligente</span>
              </li>
              <li className="flex items-center">
                <span>Asistente AI Personalizado</span>
              </li>
              <li className="flex items-center">
                <span>Modal de Opciones Avanzadas</span>
              </li>
              <li className="flex items-center">
                <span>Respuestas en Tiempo Real</span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Cómo Usar</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Selecciona texto en cualquier página web.</li>
              <li>Haz clic en el botón flotante de AguapaneIA.</li>
              <li>
                Elige una acción rápida o explora más opciones en el modal.
              </li>
              <li>Recibe y copia la respuesta de IA con facilidad.</li>
            </ol>
          </div>
        </section>

        <footer className="text-center">
          <p className="mb-4">
            ¿Necesitas ayuda? Contáctanos en{" "}
            <a
              href="mailto:felipemantillagomez@gmail.com"
              className="text-blue-500 hover:underline"
            >
              felipemantillagomez@gmail.com
            </a>
          </p>
          <p>Hecho con ❤️ en Boyacá, Colombia</p>
        </footer>
      </div>
    </div>
  );
};

export default withErrorBoundary(
  withSuspense(NewTab, <div>Cargando...</div>),
  <div>Ha ocurrido un error</div>
);
