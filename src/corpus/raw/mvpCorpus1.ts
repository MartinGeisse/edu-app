import {Atom} from "../../atom/Atom";
import {makeShuffledRadioLikeButtonMatrix} from "../../exercise/makeShuffledRadioLikeButtonMatrix";
import {makeDescriptionAnd} from "../../exercise/makeDescriptionAnd";

function random(limit: number) {
    return Math.floor(Math.random() * limit);
}

function radioTo10(expected: number) {
    const wrong = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    wrong.splice(expected, 1);
    return makeShuffledRadioLikeButtonMatrix(expected, wrong, "veryShort");
}

export const mvpCorpus1: Atom[] = [
    {
        id: "addition-bis-10",
        title: "Addition bis 10",
        preconditionAtomIds: [],
        content: "",
        exerciseGenerator: () => {
            const x = random(10);
            const y = random(10 - x);
            return makeDescriptionAnd(`${x} + ${y}`, radioTo10(x + y));
        },
    }
];
