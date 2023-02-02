import {Atom} from "../../atom/Atom";
import {makeDescriptionAnd} from "../../exercise/makeDescriptionAnd";
import {StaticBlockContent} from "../../static-content/StaticBlockContent";
import {makeRadioLikeButtonMatrixFromTaggedAnswers} from "../../exercise/makeRadioLikeButtonMatrixFromTaggedAnswers";

function random(limit: number) {
    return Math.floor(Math.random() * limit);
}

function radioTo(maxValue: number, expected: number, shuffle: boolean) {
    const taggedAnswers: [number, boolean][] = [];
    for (let i = 0; i <= maxValue; i++) {
        taggedAnswers.push([i, i === expected]);
    }
    return makeRadioLikeButtonMatrixFromTaggedAnswers(taggedAnswers, "veryShort", shuffle);
}

const noContent: StaticBlockContent = {type: "paragraph", content: ""};

function builtAdditionAtom(minValue: number, maxValue: number, shuffle: boolean, preconditionAtomIds: string[]): Atom {
    return {
        id: `addition-bis-${maxValue}${shuffle ? "-shuffle" : "-noshuffle"}`,
        title: `Plusrechnen bis ${maxValue}${shuffle ? " (durcheinander)" : ""}`,
        preconditionAtomIds,
        content: noContent,
        exerciseGenerator: () => {
            // don't generate x and y independently, that would bias towards larger sums!
            const sum = random(maxValue - minValue) + minValue;
            const x = random(sum);
            const y = sum - x;
            const description: StaticBlockContent = {type: "paragraph", content: `${x} + ${y}`, align: "center"};
            return makeDescriptionAnd(description, radioTo(maxValue, sum, shuffle));
        },
        exerciseRules: {targetScore: 20},
    };
}

export const mvpCorpus1: Atom[] = [
    builtAdditionAtom(0, 10, false, []),
    builtAdditionAtom(0, 10, true, ["addition-bis-10-noshuffle"]),
    builtAdditionAtom(10, 20, false, ["addition-bis-10-shuffle"]),
    builtAdditionAtom(10, 20, true, ["addition-bis-20-noshuffle"]),
];
