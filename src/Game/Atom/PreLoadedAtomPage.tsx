import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DumbAtomPage} from "./DumbAtomPage";
import {Atom} from "./AtomTypes";
import {materializeExerciseRules} from "./ExerciseRules";
import {ExerciseGradingState} from "./ExerciseGradingState";

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
    const [exerciseGradingState, setExerciseGradingState] = useState<ExerciseGradingState>("wip");

    return <DumbAtomPage
            atom={atom}
            score={score}
            exercise={exercise}
            exerciseGradingState={exerciseGradingState}
            reportExerciseResult={async (correct: boolean) => {
                setExerciseGradingState(correct ? "right" : "wrong");
                if (exerciseGradingState === "wip") {
                    const newScore = await awardScore(correct ? exerciseRules.correctScore : -exerciseRules.incorrectPenalty);
                    setScore(newScore);
                }
            }}
            retryExercise={() => {
                setExerciseGradingState("retry");
            }}
            goToNextExercise={() => {
                if (score === true) {
                    navigate("/");
                }
                setExercise(() => atom.exerciseGenerator());
                setExerciseGradingState("wip");
            }}
    />;
}
