import {Exercise, ExerciseProps} from "../atom/Atom";
import {useState} from "react";
import {Button} from "@mui/material";
import {shuffle} from "../util/shuffle";
import {ButtonMatrix} from "../components/exercise/ButtonMatrix";
import {ButtonMatrixLabelSize} from "../components/exercise/ButtonMatrixLabelSize";

/**
 * TODO: might automatically remove "wrong" answers that are identical to the correct answer, but (1) they must be
 * identical character-by-character (or a comparison function might be added), AND (2) this gives us fewer choices
 * because we cannot add another wrong answer as a replacement at this point.
 */
export function makeDescriptionAndShuffledRadioLikeButtonMatrix(
    description: string,
    correctAnswer: string,
    wrongAnswers: string[],
    labelSize: ButtonMatrixLabelSize,
): Exercise {
    const taggedCorrectAnswer: [string, boolean] = [correctAnswer, true];
    const taggedWrongAnswers: [string, boolean][] = wrongAnswers.map(a => [a, false]);
    const taggedAnswers: [string, boolean][] = shuffle([taggedCorrectAnswer, ...taggedWrongAnswers]);
    return (props: ExerciseProps) => {
        const [feedbackColor, setFeedbackColor] = useState("");
        const [feedbackText, setFeedbackText] = useState("");

        function onButtonClicked(correct: boolean) {
            setFeedbackColor(correct ? "green" : "red");
            setFeedbackText(correct ? "right" : "wrong");
            props.reportResult(correct);
        }

        return <div>
            <div>{description}</div>
            <ButtonMatrix disabled={props.disabled} labelSize={labelSize} elements={taggedAnswers.map(taggedAnswer => ({
                label: taggedAnswer[0],
                onClick: () => onButtonClicked(taggedAnswer[1]),
            }))} />
            <div style={{color: feedbackColor}}>{feedbackText}</div>
            {feedbackText && <Button variant="contained" onClick={() => props.goToNext()} style={{width: "100%"}}>next</Button>}
        </div>
    }
}
