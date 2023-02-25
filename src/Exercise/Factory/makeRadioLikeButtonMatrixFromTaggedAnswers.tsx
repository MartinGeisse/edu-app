import {useState} from "react";
import {Button} from "@mui/material";
import {ButtonMatrix} from "../Component/ButtonMatrix";
import {ButtonMatrixLabelSize} from "../Component/ButtonMatrixLabelSize";
import happyIcon from "./happy.png";
import sadIcon from "./sad.png";
import {shuffle} from "../../Util/shuffle";
import {Exercise, ExerciseProps} from "../ExerciseTypes";

export function makeRadioLikeButtonMatrixFromTaggedAnswers(
    taggedAnswers: [(string|number), boolean][],
    labelSize: ButtonMatrixLabelSize,
    shuffleAnswers: boolean,
): Exercise {
    if (shuffleAnswers) {
        taggedAnswers = shuffle([...taggedAnswers]);
    }
    return (props: ExerciseProps) => {
        const [feedback, setFeedback] = useState<boolean | null>(null);

        function onButtonClicked(correct: boolean) {
            setFeedback(correct);
            props.reportResult(correct);
        }

        return <div>
            <ButtonMatrix disabled={props.disabled} labelSize={labelSize} elements={taggedAnswers.map(taggedAnswer => ({
                label: taggedAnswer[0],
                onClick: () => onButtonClicked(taggedAnswer[1]),
            }))} />
            {feedback !== null && <div style={{textAlign: "center"}}>
                <br />
                <img alt="feedback" src={feedback ? happyIcon : sadIcon} />
                <br />
            </div>}
            {feedback !== null && <Button variant="contained" onClick={() => props.goToNext()} style={{width: "100%"}}>weiter</Button>}
        </div>
    }
}
