import React from 'react';
import {AllAtomsPage} from "./pages/AllAtomsPage";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {SelfLoadingAtomView} from "./logic/SelfLoadingAtomView";

function AtomPageWrapper() {
  const {id} = useParams<{ id: string }>();
  if (!id) {
    throw new Error("no atom id");
  }
  return <SelfLoadingAtomView id={id} />;
}

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<AtomPageWrapper />} />
      <Route path="/" element={<AllAtomsPage />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
