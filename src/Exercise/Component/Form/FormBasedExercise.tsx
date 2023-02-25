import {ReactElement, ReactNode, useState} from "react";
import {
    answerValidationResultTypeColorTable,
    defaultAnswerValidationResult,
    ImplicitAnswerValidator,
    objectizeAnswerValidationResult
} from "./AnswerValidation";
import {ExerciseProps} from "../../ExerciseTypes";

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
    </div>;
}
