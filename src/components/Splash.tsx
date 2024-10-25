import React, { useEffect } from "react";
import { Router, useNavigate } from "react-router-dom";
import OneFlag from "../lib/jsons/oneFlag.json";

export default function Splash() {
  const router = useNavigate();
  useEffect(() => {

    //Despues de 3 segundos redirigir a la ruta /home
    setTimeout(() => {
      router("/home");
    }, 3000);
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 sm:p-4 lg:px-[150px] bg-gray-400">
      {/* <h2 className="mb-4 text-center text-2xl font-bold text-white">
        App de divisas
      </h2> */}
      <img
        className="lg:h-[450px] sm:h-[180px] w-3/4 rounded-lg"
        src={`/${OneFlag.flag}`}
        alt="bandera"
      ></img>
    </div>
  );
}
