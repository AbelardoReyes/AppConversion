import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InfoDivisa from "./InfoDivisa";
import { Params } from "react-router-dom";

interface Divisa {
  id: number;
  symbol: string;
  valueInDollar: number;
  flag: string;
  isEditing: boolean;
  currencyPrincipal: boolean;
  name: string;
}

export default function EditDivisa() {
  const [currencyPrincipal, setCurrencyPrincipal] = useState("");
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
    handleGetCurrencyPrincipal();
  }, []);

  const handleGetCurrencyPrincipal = () => {
    const allDivisas = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    const divisa = allDivisas.find(
      (divisa: Divisa) => divisa.currencyPrincipal,
    );
    if (divisa) {
      setCurrencyPrincipal(divisa.symbol);
    }
  }
  return (
    <section className="flex w-full flex-col items-center gap-4 sm:p-4 lg:px-[150px]">
      <div className="flex w-full flex-row items-center justify-between">
        <Link to={`/divisas`} className="text-blue-400">
          <p>Mis divisas</p>
        </Link>
        <h2 className="ml-[-80px] text-2xl font-bold">{divisa.symbol}</h2>
        <h2></h2>
      </div>
      <img
        className="h-[100px] w-full rounded-sm object-contain"
        src={`/${divisa?.flag}`}
        alt={`Bandera de ${divisa?.symbol}`}
      />
      <section className="flex w-full flex-row items-center justify-between px-10">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold">Valor actual</h2>
          <p className="text-lg">${divisa.valueInDollar}</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold">Valor compra</h2>
          <p className="text-lg">${(divisa.valueInDollar * 1.3).toFixed(2)}</p>
        </div>
      </section>
      <section>
       <div className=" flex flex-col items-center">
       <h2 className="text-xl font-bold">Moneda base</h2>
       <p className="text-2xl">{currencyPrincipal}</p>
       </div>
      </section>
      <section className="flex w-full justify-around bg-card py-2">
        <button
          className={`flex w-full cursor-pointer flex-col items-center ${activeTab === "info" ? "border-b border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => handleSelectTab("info")}
        >
          <span className="text-2xl">💱</span>
          <p className="text-xs">Información</p>
        </button>
        {/* <button
          className={`flex w-full cursor-pointer flex-col items-center ${activeTab === "history" ? "border-b border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => handleSelectTab("history")}
        >
          <span className="text-2xl">🏠</span>
          <p className="text-xs">Historial</p>
        </button> */}
      </section>
      <div className="item flex h-full w-full flex-col bg-card">
        {renderContent()}
      </div>{" "}
    </section>
  );
}
