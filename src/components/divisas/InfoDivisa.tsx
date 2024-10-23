import { addExchangeToHistory } from "@/lib/store/history";
import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
interface Divisa {
  id: number;
  symbol: string;
  valueInDollar: number;
  flag: string;
  isEditing: boolean;
  currencyPrincipal: boolean;
  name: string;
}

export default function InfoDivisa() {
  const [form, setForm] = useState({
    symbol: "",
    valueInDollar: "",
    name: "",
    id: 0,
    flag: "",
    isEditing: false,
    currencyPrincipal: false,
  });
  const [disabledButton, setDisabledButton] = useState(true);
  const params = useParams<Params>();
  const router = useNavigate();
  useEffect(() => {
    const allDivisas = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    const divisa = allDivisas.find(
      (divisa: Divisa) => divisa.symbol === params.divisa,
    );
    if (divisa) {
      setForm({
        symbol: divisa.symbol,
        valueInDollar: divisa.valueInDollar.toString(),
        name: divisa.name,
        id: divisa.id,
        flag: divisa.flag,
        isEditing: divisa.isEditing,
        currencyPrincipal: divisa.currencyPrincipal,
      });
    }
  }, []);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditDivisa = () => {
    console.log("Editando divisa", form);
    // Editar los valores del json
    const allDivisas = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    const index = allDivisas.findIndex(
      (divisa: Divisa) => divisa.symbol === params.divisa,
    );
    allDivisas[index] = {
      ...allDivisas[index],
      symbol: form.symbol,
      valueInDollar: form.valueInDollar,
    };
    addExchangeToHistory(form.symbol, {
      date: new Date().toISOString(),
      value: parseFloat(form.valueInDollar),
    });
    localStorage.setItem("allDivisas", JSON.stringify(allDivisas));
    router(`/divisas`);
  };

  useEffect(() => {
    if (form.symbol && form.valueInDollar && form.name) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [form]);
  return (
    <section className="flex flex-col gap-3 sm:p-4 lg:px-[150px]">
      <div className="flex flex-col">
        <h2>Alias</h2>
        <div className="relative flex w-full items-center">
          <input
            name="symbol"
            value={form.symbol}
            type="text"
            className={`h-[44px] w-full rounded-xl border-2 bg-gray-400 p-2 focus:outline-none`}
            onChange={handleOnChange}
            disabled={!form.isEditing}

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
        <h2>Valor en dolar</h2>
        <div className="relative flex w-full items-center">
          <input
            name="valueInDollar"
            value={form.valueInDollar}
            type="number"
            className={`h-[44px] w-full rounded-xl border-2 bg-gray-400 p-2 focus:outline-none`}
            onChange={handleOnChange}
            disabled={!form.isEditing}

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
            disabled={!form.isEditing}
          />
          {/* <button
            className="absolute right-5"
            onClick={() => handleDisabled("value")}
          >
            ✍🏿
          </button> */}
        </div>
      </div>
      {form.isEditing ? (
         <button
         className={`mt-2 w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-600 ${disabledButton ? "opacity-70" : ""} `}
         onClick={handleEditDivisa}
       >
         Guardar
       </button>
      ): (<></>)}
    </section>
  );
}
