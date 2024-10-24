import React, { useEffect } from "react";
import allDivisas from "../../lib/jsons/allDivisas.json";
import { GetExchangeRateAsync, GetStantarCurrency } from "@/lib/services/currency";

interface Divisa {
  id: number;
  symbol: string;
  valueInDollar: number;
  flag: string;
  isEditing: boolean;
  currencyPrincipal: boolean;
}
export default function Ajustes() {
  const [activeTab, setActiveTab] = React.useState(false);
  const [currencyPrincipal, setCurrencyPrincipal] = React.useState("");

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("theme") || "false");
    setActiveTab(theme);
    if (theme) {
      document.body.classList.add("dark");
    }
    const DIVSALOCALSTORAGE = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    const currencyPrincipal = DIVSALOCALSTORAGE.find((divisa: any) => divisa.currencyPrincipal);
    setCurrencyPrincipal(currencyPrincipal.symbol);
  }, []);

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

  const handleToDoCalculate = async (divisas: Divisa[]) => {
    const currencyPrincipal = divisas.find((divisa) => divisa.currencyPrincipal);
    let NewValues =[];
    if (currencyPrincipal) {
      try {
        const response = await GetStantarCurrency(currencyPrincipal.symbol);
        NewValues = response?.data.conversion_rates;

      } catch (error) {
      }
    } 
const updatedDivisas = divisas.map((divisa) => {
  const newValue = NewValues[divisa.symbol];
  if (newValue) {
    return {
      ...divisa,
      valueInDollar: newValue,
    };
  }
  return divisa;
});
updatedDivisas.sort((a, b) => {
  if (a.currencyPrincipal) {
    return -1;
  }
  if (b.currencyPrincipal) {
    return 1;
  }
  return a.symbol.localeCompare(b.symbol);
});
localStorage.setItem("allDivisas", JSON.stringify(updatedDivisas));
};
  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const DIVSALOCALSTORAGE = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    let newDivisas = DIVSALOCALSTORAGE.map((divisa: any) => {
      if (divisa.currencyPrincipal) {
        divisa.currencyPrincipal = false;
      }
      if (divisa.symbol === e.target.value) {
        divisa.currencyPrincipal = true;
      }
      return divisa;
    });
    handleToDoCalculate(newDivisas);
    // localStorage.setItem("allDivisas", JSON.stringify(newDivisas));
  };
  

  return (
    <section className="flex flex-col gap-4 sm:p-4 lg:px-[150px]">
      <h2 className="text-[28px] font-bold">Configuración</h2>
      <div className="flex w-full items-center justify-between">
        <h4 className="text-lg">Cambiar Tema</h4>
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
      <div className="flex flex-row items-center justify-between">
        <h4 className="text-lg">Moneda Base</h4>
        <select className="rounded-md border border-gray-300 px-2 py-1 text-black"
  name="moneda"
  id="moneda"
  onChange={handleChangeCurrency}
>
  {allDivisas.map((divisa) => (
    <option
      key={divisa.symbol}
      value={divisa.symbol}
      className="flex flex-row text-black"
      selected={currencyPrincipal === divisa.symbol}
    >
      {divisa.symbol}
    </option>
  ))}
</select>
      </div>
    </section>
  );
}
