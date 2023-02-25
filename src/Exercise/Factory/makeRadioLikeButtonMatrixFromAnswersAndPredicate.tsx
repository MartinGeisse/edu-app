import {ButtonMatrixLabelSize} from "../Component/ButtonMatrixLabelSize";
import {makeRadioLikeButtonMatrixFromTaggedAnswers} from "./makeRadioLikeButtonMatrixFromTaggedAnswers";
import {Exercise} from "../ExerciseTypes";

export function makeRadioLikeButtonMatrixFromAnswersAndPredicate<T extends number|string>(
    answers: T[],
    predicate: (value: T) => boolean,
    labelSize: ButtonMatrixLabelSize,
    shuffleAnswers: boolean,
): Exercise {
    const taggedAnswers = answers.map((answer: T): [T, boolean] => [answer, predicate(answer)]);
    return makeRadioLikeButtonMatrixFromTaggedAnswers(taggedAnswers, labelSize, shuffleAnswers);
}
