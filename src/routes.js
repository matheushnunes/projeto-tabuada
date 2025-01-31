import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Tabuada from "./components/tabuada";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tabuada/:operatorParam" element={<Tabuada />} />
    </Routes>
  );
}

export default AppRoutes;
