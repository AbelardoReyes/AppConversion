import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Divisas() {
  interface Divisa {
    id: number;
    symbol: string;
    valueInDollar: number;
    flag: string;
    isEditing: boolean;
    currencyPrincipal: boolean;
    name: string;
  }
  const [allDivisas, setAllDivisas] = React.useState([] as Divisa[]);
  React.useEffect(() => {
    const allDivisas = localStorage.getItem("allDivisas");
    if (allDivisas) {
      setAllDivisas(JSON.parse(allDivisas));
    }
  }, []);
  return (
    <section className="flex flex-col gap-1 sm:p-4 lg:px-[150px]">
      <h2 className="mb-4 text-center text-2xl font-bold">Mis divisas</h2>
      <div className="flex flex-row items-center justify-between text-[20px] font-bold">
        <p>Moneda base</p>
        {allDivisas.map((divisa, index) => (
          divisa.currencyPrincipal && <p key={index}>{divisa.symbol}</p>
        ))}
      </div>
      <h2 className="">Divisas</h2>
      {allDivisas.map((divisa, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between border-b-2 border-t-2 p-1"
        >
          <div>
            <p>{divisa.symbol}</p>
            <p>
              {divisa.name}
            </p>
            <img src={divisa.flag} alt="" className="w-8" />
          </div>
          <Link
            className={`w-[50px] rounded-md border bg-gray-400 p-1 text-center text-[15px] text-white `}
            to={`/divisas/edit/${divisa.symbol}`}
          >
            
              {divisa.isEditing ? (<p className="flex items-center justify-center"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></p>):(<p className="flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              </p>)}
             
          </Link>
        </div>
      ))}
      <Link
        className={`fixed bottom-20 right-5 flex h-10 w-10 items-center justify-center rounded-xl border bg-blue-400 text-[30px] text-white`}
        to={`/divisas/new`}
      >
        +
      </Link>
    </section>
  );
}
