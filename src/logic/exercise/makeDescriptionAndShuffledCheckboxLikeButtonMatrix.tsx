import {Exercise, ExerciseProps} from "../Atom";
import {useState} from "react";
import {Button, Grid, ToggleButton} from "@mui/material";
import {shuffle} from "../../util/shuffle";

/**
 * TODO: might automatically remove "wrong" answers that are identical to the correct answer, but (1) they must be
 * identical character-by-character (or a comparison function might be added), AND (2) this gives us fewer choices
 * because we cannot add another wrong answer as a replacement at this point.
 */
export function makeDescriptionAndShuffledCheckboxLikeButtonMatrix(
    description: string,
    correctAnswers: string[],
    wrongAnswers: string[],
): Exercise {
    const taggedCorrectAnswers: [string, boolean][] = correctAnswers.map(a => [a, true]);
    const taggedWrongAnswers: [string, boolean][] = wrongAnswers.map(a => [a, false]);
    const taggedAnswers: [string, boolean][] = shuffle([...taggedCorrectAnswers, ...taggedWrongAnswers]);
    return (props: ExerciseProps) => {
        const [toggleState, setToggleState] = useState<boolean[]>(Array(taggedAnswers.length).fill(false));
        const [feedbackColor, setFeedbackColor] = useState("");
        const [feedbackText, setFeedbackText] = useState("");

        function onToggle(index: number) {
            const newToggleState = [...toggleState];
            newToggleState[index] = !newToggleState[index];
            setToggleState(newToggleState);
        }

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

        return <div>
            <div>{description}</div>
            <Grid container>
                {taggedAnswers.map((taggedAnswer, index) => <Grid item xs={12} sm={6} md={3} key={index} style={{marginTop: "5px"}}>
                    <ToggleButton
                        value={1}
                        selected={toggleState[index]}
                        onClick={() => onToggle(index)}
                        disabled={props.disabled}
                        style={{width: "100%"}}
                    >
                        {taggedAnswer[0]}
                    </ToggleButton>
                </Grid>)}
            </Grid>
            <br />
            {!feedbackText && <Button variant="contained" onClick={() => onSubmit()} style={{width: "100%"}}>submit</Button>}
            <div style={{color: feedbackColor}}>{feedbackText}</div>
            {feedbackText && <Button variant="contained" onClick={() => props.goToNext()} style={{width: "100%"}}>next</Button>}
        </div>
    }
}
