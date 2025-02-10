import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createContext, useContext, useState} from "react";

import Home from "./components/home";
import Tabuada from "./components/tabuada";
import { StatesContext, ContextProvider } from "./components/globalStates";

function AppRoutes() {
  return (
    <ContextProvider>
      <BrowserRouter basename="process.env.PUBLIC_URL">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Tabuada/:operatorParam" element={<Tabuada />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export {AppRoutes, ContextProvider, StatesContext};
