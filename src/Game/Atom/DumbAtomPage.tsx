import {StaticBlockContentView} from "../../Util/StaticContent/StaticBlockContentView";
import styles from "./DumbAtomPage.module.css";
import {Atom} from "./AtomTypes";
import {Exercise} from "../../Exercise/ExerciseTypes";
import {materializeExerciseRules} from "./ExerciseRules";
import {ProgressBarBlue} from "../../Util/Component/ProgressBar";
import {ExerciseGradingState} from "./ExerciseGradingState";
import happyIcon from "../../Exercise/Factory/happy.png";
import sadIcon from "../../Exercise/Factory/sad.png";
import {Button} from "@mui/material";

export type DumbAtomPageProps = {
    atom: Atom;
    score: number | true;
    exercise: Exercise,
    exerciseGradingState: ExerciseGradingState;
    reportExerciseResult: (correct: boolean) => void;
    retryExercise: () => void;
    goToNextExercise: () => void;
};

/**
 * no-loading, stateless atom page
 */
export function DumbAtomPage(
    {atom, score, exercise: Exercise, exerciseGradingState, reportExerciseResult, retryExercise, goToNextExercise}: DumbAtomPageProps
) {
    const exerciseRules = materializeExerciseRules(atom.exerciseRules ?? {});
    const scorePercent = score === true ? 100 : score / exerciseRules.targetScore * 100;
    const showGrading = (exerciseGradingState === "right" || exerciseGradingState === "wrong");
    return <div style={{padding: "10px"}}>
        <h1>{atom.title}</h1>
        <div><StaticBlockContentView content={atom.content} /></div>
        <div className={score === true ? styles.successProgressBar : "foo"}>
            <ProgressBarBlue variant={"determinate"} value={scorePercent} />
        </div>
        <br />
        <Exercise
            disabled={showGrading}
            reportResult={reportExerciseResult}
        />
        {showGrading && <div style={{textAlign: "center"}}>
            <br />
            <img alt="feedback" src={exerciseGradingState === "right" ? happyIcon : sadIcon} />
            <br />
        </div>}
        {exerciseGradingState === "wrong" && <Button sx={{marginBottom: "5px"}} variant="outlined" onClick={() => retryExercise()} style={{width: "100%"}}>nochmal probieren (ohne Punkte)</Button>}
        {exerciseGradingState !== "wip" && <Button variant="contained" onClick={() => goToNextExercise()} style={{width: "100%"}}>weiter</Button>}
        <br />
    </div>;
}
