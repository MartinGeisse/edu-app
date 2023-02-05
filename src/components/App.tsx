import React from "react";
import {OverviewPage} from "../pages/OverviewPage";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {AtomPage} from "../pages/AtomPage";
import "./App.css";
import {MenuPage} from "../pages/admin/MenuPage";
import {DependencyInjectorProvider} from "../di/useDependencies";

function AtomPageWrapper() {
  const {id} = useParams<{ id: string }>();
  if (!id) {
    throw new Error("no atom id");
  }
  return <AtomPage id={id} />;
}

function App() {
  return <DependencyInjectorProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/x/menu" element={<MenuPage />} />
        <Route path="/:id" element={<AtomPageWrapper />} />
        <Route path="/" element={<OverviewPage />} />
      </Routes>
    </BrowserRouter>
  </DependencyInjectorProvider>;
}

export default App;
