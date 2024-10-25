import { useEffect, useState } from "react";
import Divisas from "./components/divisas/Divisas";
import Home from "./components/home/Home";
import Ajustes from "./components/ajustes/Ajustes";
import { Link, Route, Routes } from "react-router-dom";
import NewDivisa from "./components/divisas/NewDivisa";
import EditDivisa from "./components/divisas/EditDivisa";
import Splash from "./components/Splash";
import allDivisasJson from "./lib/jsons/allDivisas.json";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [hidden, setHidden] = useState(true);
  const [path, setPath] = useState("");
  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    localStorage.setItem("allDivisas", JSON.stringify(allDivisasJson));
  }, []);

  const handleSetHidden = () => {
    setHidden(false);
  }
  return (
    <>
      <div className="item relative flex h-screen w-full flex-col ">
        {/* {renderContent()} */}
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Home" element={<Home handleSetHidden={handleSetHidden} />} />
          <Route path="/divisas" element={<Divisas />} />
          <Route path="/divisas/new" element={<NewDivisa />} />
          <Route path="/divisas/edit/:divisa" element={<EditDivisa />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </div>
      {" "}
      {hidden ? (
        <></>
      ) : (
        <>
          <section className="fixed bottom-0 flex w-full justify-around border-t py-2">
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
              to="/home"
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
      )}
    </>
  );
}
