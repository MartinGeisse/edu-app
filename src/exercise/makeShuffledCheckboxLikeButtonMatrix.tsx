import {Exercise, ExerciseProps} from "../atom/Atom";
import {useState} from "react";
import {Button} from "@mui/material";
import {shuffle} from "../util/shuffle";
import {ToggleButtonMatrix} from "../components/exercise/ToggleButtonMatrix";
import {ButtonMatrixLabelSize} from "../components/exercise/ButtonMatrixLabelSize";

/**
 * TODO: might automatically remove "wrong" answers that are identical to the correct answer, but (1) they must be
 * identical character-by-character (or a comparison function might be added), AND (2) this gives us fewer choices
 * because we cannot add another wrong answer as a replacement at this point.
 */
export function makeShuffledCheckboxLikeButtonMatrix(
    correctAnswers: (string|number)[],
    wrongAnswers: (string|number)[],
    labelSize: ButtonMatrixLabelSize,
): Exercise {
    const taggedCorrectAnswers: [(string|number), boolean][] = correctAnswers.map(a => [a, true]);
    const taggedWrongAnswers: [(string|number), boolean][] = wrongAnswers.map(a => [a, false]);
    const taggedAnswers: [(string|number), boolean][] = shuffle([...taggedCorrectAnswers, ...taggedWrongAnswers]);
    return (props: ExerciseProps) => {
        const [toggleState, setToggleState] = useState<boolean[]>(Array(taggedAnswers.length).fill(false));
        const [feedbackColor, setFeedbackColor] = useState("");
        const [feedbackText, setFeedbackText] = useState("");

        function onSubmit() {
            let correct = true;
            for (let i = 0; i < taggedAnswers.length; i++) {
                if (taggedAnswers[i][1] !== toggleState[i]) {
                    correct = false;
                }
            }
            setFeedbackColor(correct ? "green" : "red");
            setFeedbackText(correct ? "right" : "wrong");
            props.reportResult(correct);
        }

        const elements = taggedAnswers.map(taggedAnswer => ({label: taggedAnswer[0]}));
        return <div>
            <ToggleButtonMatrix elements={elements} disabled={props.disabled} toggleState={toggleState} setToggleState={setToggleState} labelSize={labelSize} />
            <br />
            {!feedbackText && <Button variant="contained" onClick={() => onSubmit()} style={{width: "100%"}}>submit</Button>}
            <div style={{color: feedbackColor}}>{feedbackText}</div>
            {feedbackText && <Button variant="contained" onClick={() => props.goToNext()} style={{width: "100%"}}>next</Button>}
        </div>
    }
}
