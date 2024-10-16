import React, { useEffect } from "react";
import allDivisas from "../../lib/jsons/allDivisas.json";
import ExchangeChart from "@/components/charts/ExchangeChart.tsx";

export default function Home() {
  interface Divisa {
    id: number;
    name: string;
    symbol: string;
    country: string;
    valueInDolar: number;
    flag: string;
  }

  const [divisas, setDivisas] = React.useState<Divisa[]>([]);
  const [result, setResult] = React.useState<number>(0);
  const [selectedFrom, setSelectedFrom] = React.useState<Divisa | null>(null);
  const [selectedTo, setSelectedTo] = React.useState<Divisa | null>(null);

  useEffect(() => {
    handleGetDivisas();
  }, []);

  const handleGetDivisas = () => {
    setDivisas(allDivisas);
    setSelectedFrom(allDivisas[0]); // Peso Mexicano
    setSelectedTo(allDivisas[1]); // Dólar Americano
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const montoEnPesos = Number(e.target.value);
    if (!selectedFrom || !selectedTo) return;
    const montoEnDolares = montoEnPesos / selectedFrom.valueInDolar;
    const montoConvertido = montoEnDolares * selectedTo.valueInDolar;
    setResult(montoConvertido);
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
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
              =
              {selectedFrom && selectedTo
                ? ` ${selectedTo.valueInDolar / selectedFrom.valueInDolar} ${selectedTo.symbol}`
                : " Selecciona una moneda"}
            </p>
          </section>

          <section className="flex h-[200px] flex-row items-center justify-between gap-3">
            <div className="flex h-full w-full flex-col items-center gap-3 px-3 shadow-xl">
              <select
                className="w-full"
                onChange={handleFromCurrencyChange}
                value={selectedFrom?.symbol}
              >
                {divisas.map((divisa) => (
                  <option key={divisa.id} value={divisa.symbol}>
                    {divisa.name} ({divisa.symbol})
                  </option>
                ))}
              </select>

              <img
                className="h-[100px] w-full object-contain"
                src={selectedFrom?.flag}
                alt={`Bandera de ${selectedFrom?.country}`}
              />

              <button className="w-full rounded-md border border-gray-500 p-2 text-black">
                <input
                  type="number"
                  className="w-full bg-transparent"
                  placeholder={`Monto ${selectedFrom?.symbol}`}
                  onChange={handleOnChange}
                />
              </button>
            </div>
            =
            <div className="flex h-full w-full flex-col items-center gap-3 px-3 shadow-xl">
              <select
                className="w-full"
                onChange={handleToCurrencyChange}
                value={selectedTo?.symbol}
              >
                {divisas.map((divisa) => (
                  <option key={divisa.id} value={divisa.symbol}>
                    {divisa.name} ({divisa.symbol})
                  </option>
                ))}
              </select>

              <img
                className="h-[100px] w-full object-contain"
                src={selectedTo?.flag}
                alt={`Bandera de ${selectedTo?.country}`}
              />

              <button className="w-full rounded-md border border-gray-500 p-2 text-black">
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
