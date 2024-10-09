import React, { useState } from "react";
import Divisas from "./components/divisas/Divisas";
import Home from "./components/home/Home";
import Ajustes from "./components/ajustes/Ajustes";
import { Link, Route, Routes } from "react-router-dom";
import NewDivisa from "./components/divisas/NewDivisa";
import EditDivisa from "./components/divisas/EditDivisa";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="item relative flex h-screen w-full flex-col bg-gray-100">
        {/* {renderContent()} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/divisas" element={<Divisas />} />
          <Route path="/divisas/new" element={<NewDivisa />} />
          <Route path="/divisas/edit/:divisa" element={<EditDivisa />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </div>{" "}
      <section className="fixed bottom-0 flex w-full justify-around border-t border-gray-300 bg-gray-100 py-2">
        <Link
          className={`flex cursor-pointer flex-col items-center ${activeTab === "divisas" ? "text-blue-500" : "text-gray-500"}`}
          to="/divisas"
          onClick={() => handleSelectTab("divisas")}
        >
          <span className="text-2xl">💱</span>
          <p className="text-xs">Divisas</p>
        </Link>
        <Link
          className={`flex cursor-pointer flex-col items-center ${activeTab === "home" ? "text-blue-500" : "text-gray-500"}`}
          to="/"
          onClick={() => handleSelectTab("home")}
        >
          <span className="text-2xl">🏠</span>
          <p className="text-xs">Home</p>
        </Link>
        <Link
          className={`flex cursor-pointer flex-col items-center ${activeTab === "ajustes" ? "text-blue-500" : "text-gray-500"}`}
          to="/ajustes"
          onClick={() => handleSelectTab("ajustes")}
        >
          <span className="text-2xl">⚙️</span>
          <p className="text-xs">Ajustes</p>
        </Link>
      </section>
    </>
  );
}
