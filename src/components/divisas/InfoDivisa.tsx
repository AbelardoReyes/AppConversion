import { useState } from "react";

export default function InfoDivisa() {
  const [form, setForm] = useState({
    name: "",
    value: "",
  });
  const [disabled, setDisabled] = useState({
    name: true,
    value: true,
  });
  const handleDisabled = (name: keyof typeof disabled) => {
    setDisabled({
      ...disabled,
      [name]: !disabled[name],
    });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="flex flex-col gap-3 sm:p-4 lg:px-[150px]">
      <div className="flex flex-col">
        <h2>Nombre</h2>
        <div className="relative flex w-full items-center">
          <input
            name="name"
            value={form.name}
            disabled={disabled.name}
            type="text"
            className={`h-[44px] w-full rounded-xl border-2 bg-gray-400 p-2 focus:outline-none ${disabled.name ? "opacity-50" : ""} `}
            onChange={handleOnChange}
          />
          <button
            className="absolute right-5"
            onClick={() => handleDisabled("name")}
          >
            ✍🏿
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <h2>Valor</h2>
        <div className="relative flex w-full items-center">
          <input
            name="value"
            value={form.value}
            disabled={disabled.value}
            type="text"
            className={`h-[44px] w-full rounded-xl border-2 bg-gray-400 p-2 focus:outline-none ${disabled.value ? "opacity-50" : ""} `}
            onChange={handleOnChange}
          />
          <button
            className="absolute right-5"
            onClick={() => handleDisabled("value")}
          >
            ✍🏿
          </button>
        </div>
      </div>
      <button className="mt-2 w-full rounded-xl bg-blue-500 p-2 text-white hover:bg-blue-600">
        Guardar
      </button>
    </section>
  );
}
