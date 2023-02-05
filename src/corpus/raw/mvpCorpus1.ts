import {Atom} from "../../atom/Atom";
import {makeDescriptionAnd} from "../../exercise/makeDescriptionAnd";
import {StaticBlockContent} from "../../static-content/StaticBlockContent";
import {makeRadioLikeButtonMatrixFromTaggedAnswers} from "../../exercise/makeRadioLikeButtonMatrixFromTaggedAnswers";
import {
    makeRadioLikeButtonMatrixFromAnswersAndPredicate
} from "../../exercise/makeRadioLikeButtonMatrixFromAnswersAndPredicate";
import {randomElement} from "../../util/randomElement";

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
            const sum = random(maxValue - minValue) + minValue;
            const x = random(sum);
            const y = sum - x;
            const description = centeredText(`${x} + ${y}`);
            return makeDescriptionAnd(description, radioTo(maxValue, sum, shuffle));
        },
        exerciseRules: {targetScore: 20},
    };
}

function builtSubtractionAtom(minValue: number, maxValue: number, shuffle: boolean, preconditionAtomIds: string[]): Atom {
    return {
        id: `subtraction-bis-${maxValue}${shuffle ? "-shuffle" : "-noshuffle"}`,
        title: `Minusrechnen bis ${maxValue}${shuffle ? " (durcheinander)" : ""}`,
        preconditionAtomIds,
        content: noContent,
        exerciseGenerator: () => {
            const x = random(maxValue - minValue) + minValue;
            const y = random(x);
            const description = centeredText(`${x} - ${y}`);
            return makeDescriptionAnd(description, radioTo(maxValue, x - y, shuffle));
        },
        exerciseRules: {targetScore: 20},
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
    builtAdditionAtom(0, 10, false, []),
    builtAdditionAtom(0, 10, true, ["addition-bis-10-noshuffle"]),
    builtAdditionAtom(10, 20, false, ["addition-bis-10-shuffle"]),
    builtAdditionAtom(10, 20, true, ["addition-bis-20-noshuffle"]),
    builtSubtractionAtom(0, 10, false, ["addition-bis-20-shuffle"]),
    builtSubtractionAtom(0, 10, true, ["subtraction-bis-10-noshuffle"]),
    builtSubtractionAtom(10, 20, false, ["subtraction-bis-10-shuffle"]),
    builtSubtractionAtom(10, 20, true, ["subtraction-bis-20-noshuffle"]),

    {
        id: `uppercase-to-lowercase-letters"}`,
        title: `Kleinbuchstaben finden`,
        preconditionAtomIds: [],
        content: noContent,
        exerciseGenerator: () => {
            const uppercase = randomElement(uppercaseAlphabetWithUmlauts);
            return makeDescriptionAnd(centeredText(uppercase),
                makeLetterRadioCaseInsensitive(lowercaseAlphabetWithUmlauts, uppercase, false));
        },
        exerciseRules: {targetScore: 20},
    },

    {
        id: `lowercase-to-uppercase-letters"}`,
        title: `Großbuchstaben finden`,
        preconditionAtomIds: [],
        content: noContent,
        exerciseGenerator: () => {
            const lowercase = randomElement(lowercaseAlphabetWithUmlauts);
            return makeDescriptionAnd(centeredText(lowercase),
                makeLetterRadioCaseInsensitive(uppercaseAlphabetWithUmlauts, lowercase, false));
        },
        exerciseRules: {targetScore: 20},
    },

];
