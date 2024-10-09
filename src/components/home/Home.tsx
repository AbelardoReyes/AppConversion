import React from "react";

export default function Home() {
  const Monedas = [
    {
      id: 1,
      nombre: "Peso Mexicano",
      simbolo: "MXN",
      tasa: 18,
    },
    {
      id: 2,
      nombre: "Dólar",
      simbolo: "USD",
      tasa: 20,
    },
  ];
  return (
    <div className="flex flex-col gap-3 sm:p-4 lg:px-[150px]">
      <h2 className="mb-4 text-center text-2xl font-bold">Tipo de cambio</h2>
      <section className="flex flex-row items-center justify-center gap-5 text-[20px]">
        <p>
          ${Monedas[0].tasa} {Monedas[0].simbolo}
        </p>
        =
        <p>
          ${Monedas[1].tasa} {Monedas[1].simbolo}
        </p>
      </section>
      <section className="flex h-[200px] flex-row items-center justify-between gap-3">
        <div className="flex h-full w-full flex-col items-center gap-3 px-3 shadow-xl">
          <h1>{Monedas[0].simbolo}</h1>
          <div className="h-[100px] w-full border border-gray-500"></div>
          <button className="w-full rounded-md border border-gray-500 p-2 text-black">
            $ 18,000
          </button>
        </div>
        =
        <div className="flex h-full w-full flex-col items-center gap-3 px-3 shadow-xl">
          <h1>{Monedas[1].simbolo}</h1>
          <div className="h-[100px] w-full border border-gray-500"></div>
          <button className="w-full rounded-md border border-gray-500 p-2 text-black">
            $ 20,000
          </button>
        </div>
      </section>
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <h1>Historial de cambio</h1>
        </div>
        <button className="w-[150px] rounded-md bg-gray-200 p-2 text-blue-500">
          Generar ticket
        </button>
      </section>
      {/* Puedes agregar campos de configuración, opciones, etc. */}
    </div>
  );
}
