import {Atom} from "../../atom/Atom";
import {makeDescriptionAnd} from "../../exercise/makeDescriptionAnd";
import {StaticBlockContent} from "../../static-content/StaticBlockContent";
import {makeRadioLikeButtonMatrixFromTaggedAnswers} from "../../exercise/makeRadioLikeButtonMatrixFromTaggedAnswers";

function random(limit: number) {
    return Math.floor(Math.random() * limit);
}

function radioTo10(expected: number, shuffle: boolean) {
    const taggedAnswers: [number, boolean][] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => [x, x === expected]);
    return makeRadioLikeButtonMatrixFromTaggedAnswers(taggedAnswers, "veryShort", shuffle);
}

const noContent: StaticBlockContent = {type: "paragraph", content: ""};

export const mvpCorpus1: Atom[] = [
    ...[false, true].map((shuffle: boolean) => ({
        id: "addition-bis-10" + (shuffle ? "-shuffle" : "-noshuffle"),
        title: "Plusrechnen bis 10" + (shuffle ? " (durcheinander)" : ""),
        preconditionAtomIds: shuffle ? ["addition-bis-10-noshuffle"] : [],
        content: noContent,
        exerciseGenerator: () => {
            // don't generate x and y independently, that would bias towards larger sums!
            const sum = random(10);
            const x = random(sum);
            const y = sum - x;
            const description: StaticBlockContent = {type: "paragraph", content: `${x} + ${y}`, align: "center"};
            return makeDescriptionAnd(description, radioTo10(sum, shuffle));
        },
        exerciseRules: {targetScore: 2}
    })),
];
