import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfoDivisa from "./InfoDivisa";
import { Params } from "react-router-dom";

interface Divisa {
  id: number;
  symbol: string;
  valueInDollar: number;
  flag: string;
}

export default function EditDivisa() {
  const [activeTab, setActiveTab] = useState("info");
  const [divisa, setDivisa] = useState({} as Divisa);
  const params = useParams<Params>();
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

  useEffect(() => {
    const allDivisas = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    const divisa = allDivisas.find(
      (divisa: Divisa) => divisa.symbol === params.divisa,
    );
    if (divisa) {
      setDivisa(divisa);
    }
  }, []);

  return (
    <section className="flex w-full flex-col items-center gap-4 sm:p-4 lg:px-[150px]">
      <div className="flex w-full flex-row items-center justify-between">
        <Link to={`/divisas`} className="text-blue-400">
          <p>Mis divisas</p>
        </Link>
        <h2 className="text-2xl font-bold">{divisa.symbol}</h2>
        <p></p>
      </div>
      <img
        className="h-[100px] w-full object-contain"
        src={`/${divisa?.flag}`}
        alt={`Bandera de ${divisa?.symbol}`}
      />
      {/* <section className="flex w-full flex-row items-center justify-between px-10">
        <div className="flex flex-col items-center">
          <h2>Valor en dolar</h2>
          <p>${divisa.valueInDollar}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2>Symbolo</h2>
          <p>{divisa.symbol}</p>
        </div>
      </section> */}
      <section className="bg-card flex w-full justify-around py-2">
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
      <div className="item bg-card flex h-full w-full flex-col">
        {renderContent()}
      </div>{" "}
    </section>
  );
}
