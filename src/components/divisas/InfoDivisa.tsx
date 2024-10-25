import { addExchangeToHistory } from "@/lib/store/history";
import { useEffect, useState } from "react";
import { Link, Params, useNavigate, useParams } from "react-router-dom";
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
  const [currencyPrincipal, setCurrencyPrincipal] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [editInput, setEditInput] = useState(true);
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
    handleGetCurrencyPrincipal();
  }, []);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetCurrencyPrincipal = () => {
    const allDivisas = JSON.parse(localStorage.getItem("allDivisas") || "[]");
    const divisa = allDivisas.find(
      (divisa: Divisa) => divisa.currencyPrincipal,
    );
    if (divisa) {
      setCurrencyPrincipal(divisa.symbol);
    }
  };
  const handleEditDivisa = () => {
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
        <h2>
          Código
        </h2>
        <div className="relative flex w-full items-center">
          <input
            name="symbol"
            value={form.symbol}
            type="text"
            className={`h-[44px] w-full rounded-xl border-2 p-2 focus:outline-none ${editInput ? "bg-gray-400" : "bg-gray-300"}`}
            onChange={handleOnChange}
            disabled={editInput}

          />
            <button
            onClick={() => setEditInput(!editInput)}
            className={`absolute right-5 ${form.isEditing ? "" : "hidden"}`}

          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </button> 
        </div>
      </div>
      <div className="flex flex-col">
        <h2>Nombre</h2>
        <div className="relative flex w-full items-center">
          <input
            name="name"
            value={form.name}
            type="text"
            className={`h-[44px] w-full rounded-xl border-2 p-2 focus:outline-none ${editInput ? "bg-gray-400" : "bg-gray-300"}`}
            onChange={handleOnChange}
            disabled={editInput}
          />
                <button
                onClick={() => setEditInput(!editInput)}
            className={`absolute right-5 ${form.isEditing ? "" : "hidden"}`}

          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </button> 
        </div>
      </div>
      <div className="flex flex-col">
        <h2>Valor equivalente a un {currencyPrincipal}</h2>
        <div className="relative flex w-full items-center">
          <input
            name="valueInDollar"
            value={form.valueInDollar}
            type="number"
            className={`h-[44px] w-full rounded-xl border-2 p-2 focus:outline-none ${editInput ? "bg-gray-400" : "bg-gray-300"}`}
            onChange={handleOnChange}
            disabled={editInput}

          />
           <button
           onClick={() => setEditInput(!editInput)}
            className={`absolute right-5 ${form.isEditing ? "" : "hidden"}`}

          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </button> 
        </div>
      </div>
      {form.isEditing ? (
            <div className="flex flex-row items-center justify-between gap-4">
            <Link
              to={`/divisas`}
              className="mt-2 w-full rounded-xl bg-gray-500 p-2 text-center text-white hover:bg-gray-600"
            >
              Cancelar
            </Link>
            <button
              className={`hover:bg-blue-600" mt-2 w-full rounded-xl bg-blue-500 p-2 text-white ${disabledButton ? "opacity-70" : "bg-blue-500"} `}
              disabled={disabledButton}
              onClick={handleEditDivisa}
            >
              <p
         
                className="w-full text-center text-white"
              >
              Guardar
              </p>
            </button>
          </div>
      ): (<></>)}
    </section>
  );
}
