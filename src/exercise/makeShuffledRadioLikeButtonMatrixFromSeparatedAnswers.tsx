import {Exercise} from "../atom/Atom";
import {ButtonMatrixLabelSize} from "../components/exercise/ButtonMatrixLabelSize";
import {makeRadioLikeButtonMatrixFromTaggedAnswers} from "./makeRadioLikeButtonMatrixFromTaggedAnswers";

/**
 * TODO: might automatically remove "wrong" answers that are identical to the correct answer, but (1) they must be
 * identical character-by-character (or a comparison function might be added), AND (2) this gives us fewer choices
 * because we cannot add another wrong answer as a replacement at this point.
 */
export function makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers(
    correctAnswer: (string|number),
    wrongAnswers: (string|number)[],
    labelSize: ButtonMatrixLabelSize,
): Exercise {
    const taggedCorrectAnswer: [(string|number), boolean] = [correctAnswer, true];
    const taggedWrongAnswers: [(string|number), boolean][] = wrongAnswers.map(a => [a, false]);
    const taggedAnswers: [(string|number), boolean][] = [taggedCorrectAnswer, ...taggedWrongAnswers];
    return makeRadioLikeButtonMatrixFromTaggedAnswers(taggedAnswers, labelSize, true);
}
