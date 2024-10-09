import { useState } from "react";
import { Link } from "react-router-dom";
import InfoDivisa from "./InfoDivisa";

export default function EditDivisa() {
  const [activeTab, setActiveTab] = useState("info");
  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <InfoDivisa />;
      case "history":
        return (
          <section className="flex w-full flex-col items-center gap-2">
            <h2>history</h2>
            <div className="flex w-full flex-col items-center gap-2">
              <p>Fecha: 01/01/2021</p>
              <p>Valor: $20,000</p>
            </div>
          </section>
        );
    }
  };
  return (
    <section className="flex w-full flex-col items-center gap-4 sm:p-4 lg:px-[150px]">
      <div className="flex w-full flex-row items-center justify-between">
        <Link to={`/divisas`} className="text-blue-400">
          <p>Mis divisas</p>
        </Link>
        <h2 className="text-2xl font-bold">USD</h2>
        <p></p>
      </div>
      <div className="h-[140px] w-3/4 border-2 border-black"></div>
      <section className="flex w-full flex-row items-center justify-between px-10">
        <div className="flex flex-col">
          <h2>Valor actual</h2>
          <p>$20,000</p>
        </div>
        <div className="flex flex-col">
          <h2>Moneda base</h2>
          <p>MXN</p>
        </div>
      </section>
      <section className="flex w-full justify-around bg-gray-100 py-2">
        <button
          className={`flex w-full cursor-pointer flex-col items-center ${activeTab === "info" ? "border-b border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => handleSelectTab("info")}
        >
          <span className="text-2xl">💱</span>
          <p className="text-xs">Información</p>
        </button>
        <button
          className={`flex w-full cursor-pointer flex-col items-center ${activeTab === "history" ? "border-b border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => handleSelectTab("history")}
        >
          <span className="text-2xl">🏠</span>
          <p className="text-xs">Historial</p>
        </button>
      </section>
      <div className="item flex h-full w-full flex-col bg-gray-100">
        {renderContent()}
      </div>{" "}
    </section>
  );
}
