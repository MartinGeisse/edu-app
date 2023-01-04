import {Atom, materializeExerciseRules} from "../atom/Atom";
import {AtomState} from "../atom/AtomState";
import {useState} from "react";
import {AtomContentView} from "../content/AtomContentView";

export type PreLoadedAtomPageProps = {
    atom: Atom;
    state: AtomState;
    onStateChanged: (newState: AtomState) => void;
};

export function PreLoadedAtomPage(props: PreLoadedAtomPageProps) {
    const {atom} = props;
    const exerciseRules = materializeExerciseRules(atom.exerciseRules ?? {});
    const [exerciseDisabled, setExerciseDisabled] = useState(false);
    const [score, setScore] = useState(props.state.score);
    const [Exercise, setExercise] = useState(() => atom.exerciseGenerator());
    return <div>
        <h1>{atom.title}</h1>
        <div><AtomContentView content={atom.content} /></div>
        <hr />
        <h2>Exercise (score: {score} /{exerciseRules.targetScore})</h2>
        <Exercise
            disabled={exerciseDisabled}
            reportResult={(correct: boolean) => {
                const newScore = correct
                    ? Math.min(score + exerciseRules.correctScore, exerciseRules.targetScore)
                    : Math.max(score - exerciseRules.incorrectPenalty, 0);
                setScore(newScore);
                props.onStateChanged({score: newScore});
                setExerciseDisabled(true);
            }}
            goToNext={() => {
                setExercise(() => atom.exerciseGenerator());
                setExerciseDisabled(false);
            }}
        />
    </div>;
}