import React from "react";
import { DivisasJSON } from "../../lib/divisas";
import { Link } from "react-router-dom";

export default function Divisas() {
  return (
    <section className="flex flex-col gap-1 sm:p-4 lg:px-[150px]">
      <h2 className="mb-4 text-center text-2xl font-bold">Mis divisas</h2>
      <div className="flex flex-row items-center justify-between text-[20px] font-bold">
        <p>Moneda base</p>
        <p>USD</p>
      </div>
      <h2 className="">Divisas</h2>
      {DivisasJSON.map((divisa, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between border-b-2 border-t-2"
        >
          <p>{divisa.symbol}</p>
          <Link
            className="w-[50px] rounded-md border bg-gray-400 p-2 text-center text-[15px] text-white"
            to={`/divisas/edit/${divisa.symbol}`}
          >
            <p>→</p>
          </Link>
        </div>
      ))}
      <Link
        className="fixed bottom-20 right-5 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400 text-[30px] text-blue-400"
        to={`/divisas/new`}
      >
        +
      </Link>
    </section>
  );
}
