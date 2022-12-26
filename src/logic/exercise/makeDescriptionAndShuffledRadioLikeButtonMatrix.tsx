import {Exercise, ExerciseProps} from "../Atom";
import {useState} from "react";
import {Button, Grid} from "@mui/material";
import {shuffle} from "../../util/shuffle";

/**
 * TODO: might automatically remove "wrong" answers that are identical to the correct answer, but (1) they must be
 * identical character-by-character (or a comparison function might be added), AND (2) this gives us fewer choices
 * because we cannot add another wrong answer as a replacement at this point.
 */
export function makeDescriptionAndShuffledRadioLikeButtonMatrix(
    description: string,
    correctAnswer: string,
    wrongAnswers: string[],
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
            <Grid container>
                {taggedAnswers.map((taggedAnswer, index) => <Grid item xs={12} sm={6} md={3} key={index} style={{marginTop: "5px"}}>
                    <Button variant="contained" onClick={() => onButtonClicked(taggedAnswer[1])} disabled={props.disabled} style={{width: "100%"}}>
                        {taggedAnswer[0]}
                    </Button>
                </Grid>)}
            </Grid>
            <div style={{color: feedbackColor}}>{feedbackText}</div>
            {feedbackText && <Button variant="contained" onClick={() => props.goToNext()} style={{width: "100%"}}>next</Button>}
        </div>
    }
}
