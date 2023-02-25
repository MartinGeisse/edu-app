import React from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import {DependencyInjectorProvider} from "./DependencyInjection/useDependencyInjector";
import {AppRoutes} from "./AppRoutes";

export function App() {
  return <DependencyInjectorProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </DependencyInjectorProvider>;
}
