import {corpusMap} from "../logic/corpus";
import {PageProps} from "../components/App/App";
import {useState} from "react";
import {materializeExerciseRules} from "../logic/Atom";

export function makeAtomPage(id: string) {
    const atom = corpusMap[id];
    if (!atom) {
        throw new Error("unknown atom id: " + id);
    }
    return (_props: PageProps) => {
        const exerciseRules = materializeExerciseRules(atom.exerciseRules ?? {});
        // TODO store score in session / local storage
        const [exerciseDisabled, setExerciseDisabled] = useState(false);
        const [score, setScore] = useState(0);
        const [Exercise, setExercise] = useState(() => atom.exerciseGenerator());
        return <div>
            <h1>{atom.title}</h1>
            <div>{atom.content}</div>
            <hr />
            <h2>Exercise (score: {score} /{exerciseRules.targetScore})</h2>
            <Exercise
                disabled={exerciseDisabled}
                reportResult={(correct: boolean) => {
                    setScore(correct
                        ? Math.min(score + exerciseRules.correctScore, exerciseRules.targetScore)
                        : Math.max(score - exerciseRules.incorrectPenalty, 0)
                    );
                    setExerciseDisabled(true);
                }}
                goToNext={() => {
                    setExercise(() => atom.exerciseGenerator());
                    setExerciseDisabled(false);
                }}
            />
        </div>;
    };
}
