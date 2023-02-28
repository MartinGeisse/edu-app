import {Atom} from "../../../Atom/AtomTypes";
import {makeDescriptionAnd} from "../../../../Exercise/Factory/makeDescriptionAnd";
import {centeredText, getAtomIds, noContent, radioTo, random} from "../util";
import {addition20shuffle} from "./addition";

function buildSubtractionAtom(minValue: number, maxValue: number, shuffle: boolean, preconditions: (string|Atom)[]): Atom {
    return {
        id: `subtraction-bis-${maxValue}${shuffle ? "-shuffle" : "-noshuffle"}`,
        title: `Minusrechnen bis ${maxValue}${shuffle ? " (durcheinander)" : ""}`,
        preconditionAtomIds: getAtomIds(preconditions),
        content: noContent,
        exerciseGenerator: () => {
            const x = random(maxValue - minValue + 1) + minValue;
            const y = random(x + 1);
            const description = centeredText(`${x} - ${y}`);
            return makeDescriptionAnd(description, radioTo(maxValue, x - y, shuffle));
        },
        exerciseRules: {targetScore: 30},
    };
}

export const subtraction10noshuffle = buildSubtractionAtom(0, 10, false, [addition20shuffle]);
export const subtraction10shuffle = buildSubtractionAtom(0, 10, true, [subtraction10noshuffle]);
export const subtraction20noshuffle = buildSubtractionAtom(10, 20, false, [subtraction10shuffle]);
export const subtraction20shuffle = buildSubtractionAtom(10, 20, true, [subtraction20noshuffle]);
export const subtractionAtoms: Atom[] = [
    subtraction10noshuffle,
    subtraction10shuffle,
    subtraction20noshuffle,
    subtraction20shuffle,
];
