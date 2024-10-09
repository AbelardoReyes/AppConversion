import React from "react";
import { Link } from "react-router-dom";

export default function Ajustes() {
  const settings = [
    {
      name: "Divisa predeterminada",
      href: "/ajustes/divisa",
    },
    {
      name: "Ticket",
      href: "/ajustes/ticket",
    },
    {
      name: "Empresa",
      href: "/ajustes/empresa",
    },
  ];
  return (
    <section className="flex flex-col gap-1 sm:p-4 lg:px-[150px]">
      <h2 className="">Configuración</h2>
      {settings.map((divisa, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between border-b-2 border-t-2"
        >
          <p>{divisa.name}</p>
          <Link
            className="w-[50px] rounded-md border bg-gray-400 p-2 text-center text-[15px] text-white"
            to={divisa.href}
          >
            <p>→</p>
          </Link>
        </div>
      ))}
    </section>
  );
}
