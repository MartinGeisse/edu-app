import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {DumbAtomPage} from "./DumbAtomPage";
import {Atom} from "./AtomTypes";
import {materializeExerciseRules} from "./ExerciseRules";
import {ExerciseGradingState} from "./ExerciseGradingState";
import {scrollToBottomDelayed, scrollToTop} from "../../Util/scrolling";

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

    // this state is used to distinguish just-finished atoms from revisiting previously-finished ones
    const [justFinished, setJustFinished] = useState(false);

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
                    if (score !== true && newScore === true) {
                        setJustFinished(true);
                    }
                }
                // Use a slight timeout so React can render first. Rendering will make the page content longer, so
                // what is the "bottom" now won't be the bottom after rendering anymore.
                scrollToBottomDelayed();
            }}
            retryExercise={() => {
                setExerciseGradingState("retry");
                scrollToTop();
            }}
            goToNextExercise={() => {
                if (justFinished) {
                    navigate("/");
                }
                setExercise(() => atom.exerciseGenerator());
                setExerciseGradingState("wip");
                scrollToTop();
            }}
    />;
}
