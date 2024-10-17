import React, { useEffect } from "react";
import ExchangeChart from "@/components/charts/ExchangeChart.tsx";

export default function Home() {
  interface Divisa {
    id: number;
    symbol: string;
    valueInDollar: number;
    flag: string;
  }

  const [divisas, setDivisas] = React.useState<Divisa[]>([]);
  const [result, setResult] = React.useState<number>(0);
  const [selectedFrom, setSelectedFrom] = React.useState<Divisa | null>(null);
  const [selectedTo, setSelectedTo] = React.useState<Divisa | null>(null);

  const handleGetDivisas = () => {
    const allDivisas = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    console.log("allDivisas obtenidas de localStorage:", allDivisas);
    setDivisas(allDivisas);
    setSelectedFrom(allDivisas[0]);
    setSelectedTo(allDivisas[1]);
  };

  useEffect(() => {
    console.log(
      "LocalStorage antes de obtener divisas:",
      localStorage.getItem("allDivisas")
    );
    handleGetDivisas();
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const montoEnPesos = Number(e.target.value);
    if (!selectedFrom || !selectedTo) return;
    const montoEnDolares = montoEnPesos / selectedFrom.valueInDollar;
    const montoConvertido = montoEnDolares * selectedTo.valueInDollar;
    setResult(montoConvertido);
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = divisas.find((divisa) => divisa.symbol === e.target.value);
    setSelectedFrom(selected || null);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = divisas.find((divisa) => divisa.symbol === e.target.value);
    setSelectedTo(selected || null);
  };

  return (
    <div className="flex flex-col gap-3 sm:p-4 lg:px-[150px]">
      <h2 className="mb-4 text-center text-2xl font-bold">Tipo de cambio</h2>

      {divisas.length >= 2 ? (
        <>
          <section className="flex flex-row items-center justify-center gap-5 text-[20px]">
            <p>
              {selectedFrom
                ? `1 ${selectedFrom.symbol}`
                : "Selecciona una moneda"}{" "}
              ={/**limita las decimales */}
              {selectedTo
                ? ` ${(1 * selectedTo.valueInDollar).toFixed(2)} ${
                  selectedTo.symbol
                }`
                : "Selecciona una moneda"}
            </p>
          </section>

          <section className="flex h-[200px] flex-row items-center justify-between gap-3">
            <div className="flex h-full w-full flex-col items-center gap-3 px-3 shadow-xl">
              <select
                className="w-full text-black"
                onChange={handleFromCurrencyChange}
                value={selectedFrom?.symbol}
              >
                {divisas.map((divisa) => (
                  <option key={divisa.id} value={divisa.symbol}>
                    ({divisa.symbol})
                  </option>
                ))}
              </select>

              <img
                className="h-[100px] w-full object-contain"
                src={selectedFrom?.flag}
                alt={`Bandera de ${selectedFrom?.symbol}`}
              />

              <button className="w-full rounded-md border border-gray-500 p-2">
                <input
                  type="number"
                  className="w-full bg-transparent focus:outline-none"
                  placeholder={`Monto ${selectedFrom?.symbol}`}
                  onChange={handleOnChange}
                />
              </button>
            </div>
            =
            <div className="flex h-full w-full flex-col items-center gap-3 px-3 shadow-xl">
              <select
                className="w-full text-black"
                onChange={handleToCurrencyChange}
                value={selectedTo?.symbol}
              >
                {divisas.map((divisa) => (
                  <option key={divisa.id} value={divisa.symbol}>
                    ({divisa.symbol})
                  </option>
                ))}
              </select>

              <img
                className="h-[100px] w-full object-contain"
                src={selectedTo?.flag}
                alt={`Bandera de ${selectedTo?.symbol}`}
              />

              <button className="w-full rounded-md border border-gray-500 p-2">
                {result.toFixed(2)} {selectedTo?.symbol}
              </button>
            </div>
          </section>
        </>
      ) : (
        <p>Cargando datos de divisas...</p>
      )}

      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <h1>Historial de cambio</h1>
        </div>
        <button className="w-[150px] rounded-md bg-gray-200 p-2 text-blue-500">
          Generar ticket
        </button>
      </section>
      <ExchangeChart />

    </div>
  );
}
