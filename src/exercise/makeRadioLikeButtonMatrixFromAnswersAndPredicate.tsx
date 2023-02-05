import {Exercise} from "../atom/Atom";
import {ButtonMatrixLabelSize} from "../components/exercise/ButtonMatrixLabelSize";
import {makeRadioLikeButtonMatrixFromTaggedAnswers} from "./makeRadioLikeButtonMatrixFromTaggedAnswers";

export function makeRadioLikeButtonMatrixFromAnswersAndPredicate<T extends number|string>(
    answers: T[],
    predicate: (value: T) => boolean,
    labelSize: ButtonMatrixLabelSize,
    shuffleAnswers: boolean,
): Exercise {
    const taggedAnswers = answers.map((answer: T): [T, boolean] => [answer, predicate(answer)]);
    return makeRadioLikeButtonMatrixFromTaggedAnswers(taggedAnswers, labelSize, shuffleAnswers);
}
