import {Atom, Exercise, materializeExerciseRules} from "../atom/Atom";
import {StaticBlockContentView} from "../static-content/StaticBlockContentView";
import {ProgressBar} from "../components/ProgressBar";

export type DumbAtomPageProps = {
    atom: Atom;
    score: number | true;
    exercise: Exercise,
    exerciseDisabled: boolean;
    reportExerciseResult: (correct: boolean) => void;
    goToNextExercise: () => void;
};

export function DumbAtomPage(
    {atom, score, exercise: Exercise, exerciseDisabled, reportExerciseResult, goToNextExercise}: DumbAtomPageProps
) {
    const exerciseRules = materializeExerciseRules(atom.exerciseRules ?? {});
    const scorePercent = score === true ? 100 : score / exerciseRules.targetScore * 100;
    return <div style={{padding: "10px"}}>
        <h1>{atom.title}</h1>
        <div><StaticBlockContentView content={atom.content} /></div>
        <div><ProgressBar variant={"determinate"} value={scorePercent} /></div>
        <br />
        <Exercise
            disabled={exerciseDisabled}
            reportResult={reportExerciseResult}
            goToNext={goToNextExercise}
        />
    </div>;
}
