import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DumbAtomPage} from "./DumbAtomPage";
import {Atom} from "./AtomTypes";
import {materializeExerciseRules} from "./ExerciseRules";

export type PreLoadedAtomPageProps = {
    atom: Atom;
    initialScore: number | true;
    awardScore(increment: number): Promise<number | true>;
};

/**
 * no-loading but stateful atom page
 */
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
