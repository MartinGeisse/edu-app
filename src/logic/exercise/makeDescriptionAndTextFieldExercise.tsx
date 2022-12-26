import {Exercise, ExerciseProps} from "../Atom";
import {useState} from "react";

export function makeDescriptionAndTextFieldExercise(description: string, answerValidator: (answer: string) => boolean): Exercise {
    return (props: ExerciseProps) => {
        const [answer, setAnswer] = useState("");
        const [feedbackColor, setFeedbackColor] = useState("");
        const [feedbackText, setFeedbackText] = useState("");

        function onSubmit(event: any) {
            if (!feedbackText) {
                const valid = answerValidator(answer);
                setFeedbackColor(valid ? "green" : "red");
                setFeedbackText(valid ? "right" : "wrong");
                props.reportResult(valid);
            }
            event.stopPropagation();
            event.preventDefault();
            return false;
        }

        return <div>
            <form onSubmit={onSubmit}>
                <div>{description}</div>
                <div>
                    <input
                        type="text"
                        value={answer}
                        disabled={props.disabled}
                        onChange={event => setAnswer(event.target.value)}
                    />
                </div>
                {!feedbackText && <div><input type="submit" value="submit" /></div>}
                <div style={{color: feedbackColor}}>{feedbackText}</div>
            </form>
            {feedbackText && <input type="submit" value="next" onClick={() => props.goToNext()} />}
        </div>;
    }
}
