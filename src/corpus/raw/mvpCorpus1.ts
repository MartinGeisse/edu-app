import {Atom} from "../../atom/Atom";
import {makeShuffledRadioLikeButtonMatrix} from "../../exercise/makeShuffledRadioLikeButtonMatrix";
import {makeDescriptionAnd} from "../../exercise/makeDescriptionAnd";
import {StaticBlockContent} from "../../static-content/StaticBlockContent";

function random(limit: number) {
    return Math.floor(Math.random() * limit);
}

function radioTo10(expected: number) {
    const wrong = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    wrong.splice(expected, 1);
    return makeShuffledRadioLikeButtonMatrix(expected, wrong, "veryShort");
}

const noContent: StaticBlockContent = {type: "paragraph", content: ""};

export const mvpCorpus1: Atom[] = [
    {
        id: "addition-bis-10",
        title: "Addition bis 10",
        preconditionAtomIds: [],
        content: noContent,
        exerciseGenerator: () => {
            // don't generate x and y independently, that would bias towards larger sums!
            const sum = random(10);
            const x = random(sum);
            const y = sum - x;
            const description: StaticBlockContent = {type: "paragraph", content: `${x} + ${y}`, align: "center"};
            return makeDescriptionAnd(description, radioTo10(sum));
        },
    }
];
