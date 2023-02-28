import {randomElement} from "../../../../Util/randomElement";
import {makeDescriptionAnd} from "../../../../Exercise/Factory/makeDescriptionAnd";
import {centeredText, noContent} from "../util";
import {
    makeRadioLikeButtonMatrixFromAnswersAndPredicate
} from "../../../../Exercise/Factory/makeRadioLikeButtonMatrixFromAnswersAndPredicate";
import {Atom} from "../../../Atom/AtomTypes";

const uppercaseAlphabetWithUmlauts = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ä", "Ö", "Ü"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const uppercaseAlphabetWithoutUmlauts = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const lowercaseAlphabetWithUmlauts = uppercaseAlphabetWithUmlauts.map(x => x.toLowerCase());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lowercaseAlphabetWithUmlautsAndSz = [...lowercaseAlphabetWithUmlauts, "ß"];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lowercaseAlphabetWithoutUmlauts = uppercaseAlphabetWithUmlauts.map(x => x.toLowerCase());

// "case insensitive" refers to comparison of the entered letter with the expected letter
function makeLetterRadioCaseInsensitive(letters: string[], expected: string, shuffle: boolean) {
    const predicate = (letter: String) => letter.toLowerCase() === expected.toLowerCase();
    return makeRadioLikeButtonMatrixFromAnswersAndPredicate(letters, predicate, "veryShort", shuffle);
}

// --------------------------------------------------------------------------------------------------------------------

export const uppercaseToLowercaseLetters: Atom = {
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
};

export const lowercaseToUppercaseLetters: Atom = {
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
};

export const letterAtoms: Atom[] = [
    uppercaseToLowercaseLetters,
    lowercaseToUppercaseLetters,
];
