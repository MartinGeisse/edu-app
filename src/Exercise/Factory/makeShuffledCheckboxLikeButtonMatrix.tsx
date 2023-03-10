import {useState} from "react";
import {Button} from "@mui/material";
import {shuffle} from "../../Util/shuffle";
import {ToggleButtonMatrix} from "../Component/ToggleButtonMatrix";
import {ButtonMatrixLabelSize} from "../Component/ButtonMatrixLabelSize";
import {Exercise, ExerciseProps} from "../ExerciseTypes";

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
        const [feedbackText, setFeedbackText] = useState("");

        function onSubmit() {
            let correct = true;
            for (let i = 0; i < taggedAnswers.length; i++) {
                if (taggedAnswers[i][1] !== toggleState[i]) {
                    correct = false;
                }
            }
            setFeedbackText(correct ? "right" : "wrong");
            props.reportResult(correct);
        }

        // TODO remove feedbackText here, the atom page now handles this!
        const elements = taggedAnswers.map(taggedAnswer => ({label: taggedAnswer[0]}));
        return <div>
            <ToggleButtonMatrix elements={elements} disabled={props.disabled} toggleState={toggleState} setToggleState={setToggleState} labelSize={labelSize} />
            <br />
            {!feedbackText && <Button variant="contained" onClick={() => onSubmit()} style={{width: "100%"}}>submit</Button>}
        </div>
    }
}
