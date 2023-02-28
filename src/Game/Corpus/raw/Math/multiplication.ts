import {Atom} from "../../../Atom/AtomTypes";
import {makeDescriptionAnd} from "../../../../Exercise/Factory/makeDescriptionAnd";
import {centeredText, getAtomIds, noContent, radioTo, random} from "../util";
import {subtraction20shuffle} from "./subtraction";

function buildMultiplicationAtom(title: string, min1: number, max1: number, min2: number, max2: number, preconditions: (string|Atom)[]): Atom {
    return {
        id: `multiplikation-${min1}-${max1}-${min2}-${max2}`,
        title,
        preconditionAtomIds: getAtomIds(preconditions),
        content: noContent,
        exerciseGenerator: () => {
            const a = random(max1 - min1 + 1) + min1;
            const b = random(max2 - min2 + 1) + min2;
            const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
            const description = centeredText(`${x} · ${y}`);
            return makeDescriptionAnd(description, radioTo(max1 * max2, x * y, false));
        },
        exerciseRules: {targetScore: 30},
    };
}

export const multiplication3x4 = buildMultiplicationAtom("Multiplikation bis 3 · 4", 1, 3, 1, 4, [subtraction20shuffle]);
export const multiplication4x5 = buildMultiplicationAtom("Multiplikation bis 4 · 5", 1, 4, 2, 5, [multiplication3x4]);
export const multiplicationAtoms: Atom[] = [
    multiplication3x4,
    multiplication4x5,
];
