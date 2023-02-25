export type AnswerValidationResultType = "incomplete" | "right" | "wrong";

export const answerValidationResultTypeColorTable: Record<AnswerValidationResultType, string> = {
    incomplete: "blue",
    right: "green",
    wrong: "red",
};

export type AnswerValidationResultObject = {
    type: AnswerValidationResultType;
    message: string;
};

export type AnswerValidationResult = AnswerValidationResultObject | string | boolean | null;

export function objectizeAnswerValidationResult(result: AnswerValidationResult): AnswerValidationResultObject {
    if (typeof result === "string") {
        return {type: "wrong", message: result};
    }
    if (typeof result === "boolean") {
        const type = result ? "right" : "wrong";
        return {type, message: type};
    }
    if (result === null) {
        return {type: "incomplete", message: ""};
    }
    return result;
}

export type ImplicitAnswerValidator = () => AnswerValidationResult;
export type AnswerValidator<T> = (answer: T) => AnswerValidationResult;

export const defaultAnswerValidationResult: AnswerValidationResultObject = {
    type: "incomplete",
    message: "",
};
