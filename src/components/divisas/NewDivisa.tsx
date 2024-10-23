import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import oneFlag from "../../lib/jsons/oneFlag.json";
import { addExchangeToHistory } from "@/lib/store/history";
interface Divisa {
  id: number;
  symbol: string;
  valueInDollar: number;
  flag: string;
  isEditing: boolean;
  currencyPrincipal: boolean;
  name: string;
}
interface banderas {
  id: number;
  flag: string;
}
export default function NewDivisa() {
  const router = useNavigate();
  const [form, setForm] = useState({
    symbol: "",
    valueInDollar: "",
    flag: oneFlag.flag,
    currencyPrincipal: false,
    isEditing: true,
    name: "",
  });
  useEffect(() => {
    //habilitar el boton cuando los campos esten llenos
    if (form.symbol && form.valueInDollar && form.name) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [form]);
  const [disabledButton, setDisabledButton] = useState(true);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveDivisa = () => {
    console.log("Guardando divisa", form);
    const allDivisas = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    allDivisas.push({
      id: allDivisas.length + 1,
      ...form,
    });
    addExchangeToHistory(form.symbol, {
      date: new Date().toISOString(),
      value: parseFloat(form.valueInDollar),
    });
    localStorage.setItem("allDivisas", JSON.stringify(allDivisas));
    router("/divisas");
  };
  return (
    <>
      <section className="flex w-full flex-col items-center gap-4 sm:p-1 lg:px-[150px]">
        <div className="flex w-full flex-row items-center justify-between">
          <Link to={`/divisas`} className="text-blue-400">
            <p>Mis divisas</p>
          </Link>
          <p></p>
        </div>
        <img
          className="w-3/4 sm:h-[140px] lg:h-[240px]"
          src={`/${form.flag}`}
          alt="bandera"
        ></img>

        {/* <section className="flex w-full flex-row items-center justify-between px-10">
        <div className="flex flex-col">
          <h2>Valor actual</h2>
          <p>$20,000</p>
        </div>
        <div className="flex flex-col">
          <h2>Moneda base</h2>
          <p>MXN</p>
        </div>
      </section> */}
      </section>
      <section className="flex flex-col gap-3 sm:p-4 lg:px-[150px]">
        <div className="flex flex-col">
          <h2>Symbol</h2>
          <div className="relative flex w-full items-center">
            <input
              name="symbol"
              value={form.symbol}
              type="text"
              className={`h-[44px] w-full rounded-xl border-2 bg-gray-400 p-2 focus:outline-none`}
              onChange={handleOnChange}
            />
            {/* <button
              className="absolute right-5"
              onClick={() => handleDisabled("name")}
            >
              ✍🏿
            </button> */}
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Valor en Dolar</h2>
          <div className="relative flex w-full items-center">
            <input
              name="valueInDollar"
              value={form.valueInDollar}
              type="number"
              className={`h-[44px] w-full rounded-xl border-2 bg-gray-400 p-2 focus:outline-none`}
              onChange={handleOnChange}
            />
            {/* <button
              className="absolute right-5"
              onClick={() => handleDisabled("value")}
            >
              ✍🏿
            </button> */}
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Nombre de la moneda</h2>
          <div className="relative flex w-full items-center">
            <input
              name="name"
              value={form.name}
              type="text"
              className={`h-[44px] w-full rounded-xl border-2 bg-gray-400 p-2 focus:outline-none`}
              onChange={handleOnChange}
            />
            {/* <button
              className="absolute right-5"
              onClick={() => handleDisabled("value")}
            >
              ✍🏿
            </button> */}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <Link
            to={`/divisas`}
            className="mt-2 w-full rounded-xl bg-gray-500 p-2 text-center text-white hover:bg-gray-600"
          >
            Cancelar
          </Link>
          <button
            className={`hover:bg-blue-600" mt-2 w-full rounded-xl bg-blue-500 p-2 text-white ${disabledButton ? "opacity-70" : "bg-blue-500"} `}
            onClick={handleSaveDivisa}
            disabled={disabledButton}
          >
            <Link
              to={`/divisas`}
              className="w-full text-center text-white"
            >
            Guardar
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
