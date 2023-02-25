import {StaticBlockContentView} from "../../Util/StaticContent/StaticBlockContentView";
import styles from "./DumbAtomPage.module.css";
import {Atom} from "./AtomTypes";
import {Exercise} from "../../Exercise/ExerciseTypes";
import {materializeExerciseRules} from "./ExerciseRules";
import {ProgressBarBlue} from "../../Util/Component/ProgressBar";

export type DumbAtomPageProps = {
    atom: Atom;
    score: number | true;
    exercise: Exercise,
    exerciseDisabled: boolean;
    reportExerciseResult: (correct: boolean) => void;
    goToNextExercise: () => void;
};

/**
 * no-loading, stateless atom page
 */
export function DumbAtomPage(
    {atom, score, exercise: Exercise, exerciseDisabled, reportExerciseResult, goToNextExercise}: DumbAtomPageProps
) {
    const exerciseRules = materializeExerciseRules(atom.exerciseRules ?? {});
    const scorePercent = score === true ? 100 : score / exerciseRules.targetScore * 100;
    return <div style={{padding: "10px"}}>
        <h1>{atom.title}</h1>
        <div><StaticBlockContentView content={atom.content} /></div>
        <div className={score === true ? styles.successProgressBar : "foo"}>
            <ProgressBarBlue variant={"determinate"} value={scorePercent} />
        </div>
        <br />
        <Exercise
            disabled={exerciseDisabled}
            reportResult={reportExerciseResult}
            goToNext={goToNextExercise}
        />
        <br />
    </div>;
}
