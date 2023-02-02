import React from "react";
import {OverviewPage} from "../pages/OverviewPage";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {AtomPage} from "../pages/AtomPage";
import "./App.css";

function AtomPageWrapper() {
  const {id} = useParams<{ id: string }>();
  if (!id) {
    throw new Error("no atom id");
  }
  return <AtomPage id={id} />;
}

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<AtomPageWrapper />} />
      <Route path="/" element={<OverviewPage />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
