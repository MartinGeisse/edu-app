import {Atom, materializeExerciseRules} from "../atom/Atom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DumbAtomPage} from "./DumbAtomPage";

export type PreLoadedAtomPageProps = {
    atom: Atom;
    initialScore: number | true;
    awardScore(increment: number): Promise<number | true>;
};

export function PreLoadedAtomPage({atom, initialScore, awardScore}: PreLoadedAtomPageProps) {
    const navigate = useNavigate();
    const exerciseRules = materializeExerciseRules(atom.exerciseRules ?? {});
    const [score, setScore] = useState(initialScore);
    const [exercise, setExercise] = useState(() => atom.exerciseGenerator());
    const [exerciseDisabled, setExerciseDisabled] = useState(false);
    return <DumbAtomPage
            atom={atom}
            score={score}
            exercise={exercise}
            exerciseDisabled={exerciseDisabled}
            reportExerciseResult={async (correct: boolean) => {
                const newScore = await awardScore(correct ? exerciseRules.correctScore : -exerciseRules.incorrectPenalty);
                setScore(newScore);
                setExerciseDisabled(true);
            }}
            goToNextExercise={() => {
                if (score === true) {
                    navigate("/");
                }
                setExercise(() => atom.exerciseGenerator());
                setExerciseDisabled(false);
            }}
    />;
}
