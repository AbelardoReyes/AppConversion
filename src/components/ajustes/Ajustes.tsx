import React, { useEffect } from "react";

export default function Ajustes() {
  const [activeTab, setActiveTab] = React.useState(false);

  const handleToggle = () => {
    handleSaveLocalStorage();
    setActiveTab(!activeTab);
    // Cambiar la clase "dark" en el body para activar/desactivar el tema oscuro
    if (!activeTab) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const handleSaveLocalStorage = () => {
    localStorage.setItem("theme", JSON.stringify(!activeTab));
  };

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme") || "false");
    setActiveTab(theme);
    if (theme) {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <section className="flex flex-col gap-4 sm:p-4 lg:px-[150px]">
      <h2 className="text-xl font-bold">Configuración</h2>
      <div className="flex w-full items-center justify-between">
        <p className="text-lg">Cambiar Tema</p>
        {/* Switch */}
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="sr-only"
            onChange={handleToggle}
            checked={activeTab}
          />
          <div
            className={`h-6 w-11 rounded-full transition-colors ${
              activeTab ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                activeTab ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </section>
  );
}
