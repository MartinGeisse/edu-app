import {ExerciseProps} from "../../../atom/Atom";
import {ReactElement, ReactNode, useState} from "react";
import {
    answerValidationResultTypeColorTable,
    defaultAnswerValidationResult,
    ImplicitAnswerValidator,
    objectizeAnswerValidationResult
} from "./answer-validation";

export interface FormBasedExerciseProps {
    exerciseProps: ExerciseProps;
    children: ReactNode;
    answerValidator: ImplicitAnswerValidator;
}

export function FormBasedExercise(props: FormBasedExerciseProps): ReactElement {
    const [answerValidationResult, setAnswerValidationResult] = useState(defaultAnswerValidationResult);
    const answered = (answerValidationResult.type !== "incomplete");

    function onSubmit(event: any) {
        if (!answered) {
            const newResult = objectizeAnswerValidationResult(props.answerValidator());
            setAnswerValidationResult(newResult);
            if (newResult.type !== "incomplete") {
                props.exerciseProps.reportResult(newResult.type === "right");
            }
        }
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    return <div>
        <form onSubmit={onSubmit}>
            {props.children}
            {!answered && <div><input type="submit" value="submit" /></div>}
            <div style={{color: answerValidationResultTypeColorTable[answerValidationResult.type]}}>
                {answerValidationResult.message}
            </div>
        </form>
        {answered && <input
            type="submit"
            value="next"
            onClick={() => props.exerciseProps.goToNext()}
            autoFocus={answerValidationResult.type === "right"}
        />}
    </div>;
}
