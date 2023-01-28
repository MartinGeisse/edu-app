import {Exercise, ExerciseProps} from "../atom/Atom";
import {useState} from "react";
import {FormBasedExercise} from "../components/exercise/form/FormBasedExercise";
import {AnswerValidationResult, AnswerValidator} from "../components/exercise/form/answer-validation";

export type TextFieldAnswerValidator = (value: string) => AnswerValidationResult;

export function makeTextFieldExercise(answerValidator: AnswerValidator<string>): Exercise {
    return (props: ExerciseProps) => {
        const [answer, setAnswer] = useState("");
        function implicitAnswerValidator(): AnswerValidationResult {
            const trimmedAnswer = answer.trim();
            if (trimmedAnswer === "") {
                return null;
            }
            return answerValidator(trimmedAnswer);
        }
        return <FormBasedExercise exerciseProps={props} answerValidator={implicitAnswerValidator}>
            <div>
                <input
                    type="text"
                    value={answer}
                    disabled={props.disabled}
                    onChange={event => setAnswer(event.target.value)}
                    autoFocus
                />
            </div>
        </FormBasedExercise>;
    }
}
