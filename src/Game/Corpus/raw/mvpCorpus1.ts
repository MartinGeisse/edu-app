import {makeDescriptionAnd} from "../../../Exercise/Factory/makeDescriptionAnd";
import {StaticBlockContent} from "../../../Util/StaticContent/StaticBlockContent";
import {makeRadioLikeButtonMatrixFromTaggedAnswers} from "../../../Exercise/Factory/makeRadioLikeButtonMatrixFromTaggedAnswers";
import {
    makeRadioLikeButtonMatrixFromAnswersAndPredicate
} from "../../../Exercise/Factory/makeRadioLikeButtonMatrixFromAnswersAndPredicate";
import {randomElement} from "../../../Util/randomElement";
import {imageToWordSelectionExerciseGenerator} from "./imageToWordSelectionExerciseGenerator";
import {Atom} from "../../Atom/AtomTypes";

function centeredText(text: string): StaticBlockContent {
    return {type: "paragraph", content: text, align: "center"};
}
const noContent = centeredText("");

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


function builtAdditionAtom(minValue: number, maxValue: number, shuffle: boolean, preconditionAtomIds: string[]): Atom {
    return {
        id: `addition-bis-${maxValue}${shuffle ? "-shuffle" : "-noshuffle"}`,
        title: `Plusrechnen bis ${maxValue}${shuffle ? " (durcheinander)" : ""}`,
        preconditionAtomIds,
        content: noContent,
        exerciseGenerator: () => {
            // don't generate x and y independently, that would bias towards larger sums!
            const sum = random(maxValue - minValue + 1) + minValue;
            const x = random(sum + 1);
            const y = sum - x;
            const description = centeredText(`${x} + ${y}`);
            return makeDescriptionAnd(description, radioTo(maxValue, sum, shuffle));
        },
        exerciseRules: {targetScore: 50},
    };
}

function builtSubtractionAtom(minValue: number, maxValue: number, shuffle: boolean, preconditionAtomIds: string[]): Atom {
    return {
        id: `subtraction-bis-${maxValue}${shuffle ? "-shuffle" : "-noshuffle"}`,
        title: `Minusrechnen bis ${maxValue}${shuffle ? " (durcheinander)" : ""}`,
        preconditionAtomIds,
        content: noContent,
        exerciseGenerator: () => {
            const x = random(maxValue - minValue + 1) + minValue;
            const y = random(x + 1);
            const description = centeredText(`${x} - ${y}`);
            return makeDescriptionAnd(description, radioTo(maxValue, x - y, shuffle));
        },
        exerciseRules: {targetScore: 100},
    };
}

function builtMultiplicationAtom(title: string, min1: number, max1: number, min2: number, max2: number, preconditionAtomIds: string[]): Atom {
    return {
        id: `multiplikation-${min1}-${max1}-${min2}-${max2}`,
        title,
        preconditionAtomIds,
        content: noContent,
        exerciseGenerator: () => {
            const a = random(max1 - min1 + 1) + min1;
            const b = random(max2 - min2 + 1) + min2;
            const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
            const description = centeredText(`${x} · ${y}`);
            return makeDescriptionAnd(description, radioTo(max1 * max2, x * y, false));
        },
        exerciseRules: {targetScore: 100},
    };
}

// --------------------------------------------------------------------------------------------------------------------

const uppercaseAlphabetWithUmlauts = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ä", "Ö", "Ü"];

const uppercaseAlphabetWithoutUmlauts = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const lowercaseAlphabetWithUmlauts = uppercaseAlphabetWithUmlauts.map(x => x.toLowerCase());
const lowercaseAlphabetWithUmlautsAndSz = [...lowercaseAlphabetWithUmlauts, "ß"];
const lowercaseAlphabetWithoutUmlauts = uppercaseAlphabetWithUmlauts.map(x => x.toLowerCase());

// "case insensitive" refers to comparison of the entered letter with the expected letter
function makeLetterRadioCaseInsensitive(letters: string[], expected: string, shuffle: boolean) {
    const predicate = (letter: String) => letter.toLowerCase() === expected.toLowerCase();
    return makeRadioLikeButtonMatrixFromAnswersAndPredicate(letters, predicate, "veryShort", shuffle);
}


// --------------------------------------------------------------------------------------------------------------------



export const mvpCorpus1: Atom[] = [
    builtAdditionAtom(10, 100, false, []),
    builtAdditionAtom(0, 10, false, []),
    builtAdditionAtom(0, 10, true, ["addition-bis-10-noshuffle"]),
    builtAdditionAtom(10, 20, false, ["addition-bis-10-shuffle"]),
    builtAdditionAtom(10, 20, true, ["addition-bis-20-noshuffle"]),
    builtSubtractionAtom(0, 10, false, ["addition-bis-20-shuffle"]),
    builtSubtractionAtom(0, 10, true, ["subtraction-bis-10-noshuffle"]),
    builtSubtractionAtom(10, 20, false, ["subtraction-bis-10-shuffle"]),
    builtSubtractionAtom(10, 20, true, ["subtraction-bis-20-noshuffle"]),
    builtMultiplicationAtom("Multiplikation bis 3 · 4", 1, 3, 1, 4, []),
    builtMultiplicationAtom("Multiplikation bis 4 · 5", 1, 4, 2, 5, ["multiplikation-1-3-1-4"]),

    {
        id: `uppercase-to-lowercase-letters`,
        title: `Kleinbuchstaben finden`,
        preconditionAtomIds: [],
        content: noContent,
        exerciseGenerator: () => {
            const uppercase = randomElement(uppercaseAlphabetWithUmlauts);
            return makeDescriptionAnd(centeredText(uppercase),
                makeLetterRadioCaseInsensitive(lowercaseAlphabetWithUmlauts, uppercase, false));
        },
        exerciseRules: {targetScore: 100},
    },

    {
        id: `lowercase-to-uppercase-letters`,
        title: `Großbuchstaben finden`,
        preconditionAtomIds: [],
        content: noContent,
        exerciseGenerator: () => {
            const lowercase = randomElement(lowercaseAlphabetWithUmlauts);
            return makeDescriptionAnd(centeredText(lowercase),
                makeLetterRadioCaseInsensitive(uppercaseAlphabetWithUmlauts, lowercase, false));
        },
        exerciseRules: {targetScore: 100},
    },

    {
        id: `picture-to-word`,
        title: `Wörter finden`,
        preconditionAtomIds: [],
        content: noContent,
        exerciseGenerator: imageToWordSelectionExerciseGenerator,
        exerciseRules: {targetScore: 100},
    },

    {
        id: `dual-addition`,
        title: `Doppel-Plusrechnen`,
        preconditionAtomIds: [],//["subtraction-bis-20-shuffle"],
        content: noContent,
        exerciseGenerator: () => {
            const x = random(7) + 1;
            const y = random(7) + 1;
            const z = random(6) + 1;
            const description = centeredText(`${x} + ${y} + ${z}`);
            return makeDescriptionAnd(description, radioTo(20, x + y + z, false));
        },
        exerciseRules: {targetScore: 50},
    },

];
