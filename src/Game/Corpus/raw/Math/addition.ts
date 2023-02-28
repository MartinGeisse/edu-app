import {Atom} from "../../../Atom/AtomTypes";
import {makeDescriptionAnd} from "../../../../Exercise/Factory/makeDescriptionAnd";
import {centeredText, getAtomIds, noContent, radioTo, random} from "../util";

function buildAdditionAtom(minValue: number, maxValue: number, shuffle: boolean, preconditions: (string|Atom)[]): Atom {
    return {
        id: `addition-bis-${maxValue}${shuffle ? "-shuffle" : "-noshuffle"}`,
        title: `Plusrechnen bis ${maxValue}${shuffle ? " (durcheinander)" : ""}`,
        preconditionAtomIds: getAtomIds(preconditions),
        content: noContent,
        exerciseGenerator: () => {
            // don't generate x and y independently, that would bias towards larger sums!
            const sum = random(maxValue - minValue + 1) + minValue;
            const x = random(sum + 1);
            const y = sum - x;
            const description = centeredText(`${x} + ${y}`);
            return makeDescriptionAnd(description, radioTo(maxValue, sum, shuffle));
        },
        exerciseRules: {targetScore: 30},
    };
}

export const addition10noshuffle = buildAdditionAtom(0, 10, false, []);
export const addition10shuffle = buildAdditionAtom(0, 10, true, [addition10noshuffle]);
export const addition20noshuffle = buildAdditionAtom(10, 20, false, [addition10shuffle]);
export const addition20shuffle = buildAdditionAtom(10, 20, true, [addition20noshuffle]);
export const addition100 = buildAdditionAtom(10, 100, false, [addition20shuffle]);

export const dualAddition: Atom = {
    id: `dual-addition`,
    title: `Doppel-Plusrechnen`,
    preconditionAtomIds: [addition20shuffle.id],
    content: noContent,
    exerciseGenerator: () => {
        const x = random(7) + 1;
        const y = random(7) + 1;
        const z = random(6) + 1;
        const description = centeredText(`${x} + ${y} + ${z}`);
        return makeDescriptionAnd(description, radioTo(20, x + y + z, false));
    },
    exerciseRules: {targetScore: 50},
};

export const additionAtoms: Atom[] = [
    addition10noshuffle,
    addition10shuffle,
    addition20noshuffle,
    addition20shuffle,
    addition100,
    dualAddition,
];
