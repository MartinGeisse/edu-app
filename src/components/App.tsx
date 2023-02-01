import React, {useState} from "react";
import {OverviewPage} from "../pages/OverviewPage";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {SelfLoadingAtomPage} from "../pages/SelfLoadingAtomPage";
import "./App.css";
import {AllExercisesScore, initialAllExercisesScore} from "../state/AllExercisesScore";

function AtomPageWrapper() {
  const {id} = useParams<{ id: string }>();
  if (!id) {
    throw new Error("no atom id");
  }
  return <SelfLoadingAtomPage id={id} />;
}

function App() {
  const [allExercisesScore, setAllExercisesScore] = useState<AllExercisesScore>(initialAllExercisesScore);
  return <BrowserRouter>
    <Routes>
      <Route path="/:id" element={<AtomPageWrapper />} />
      <Route path="/" element={<OverviewPage allExercisesScore={allExercisesScore} />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
