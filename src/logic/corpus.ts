import {Atom} from "./Atom";
import {randomInt} from "./helpers";
import {checkIntegerComplex} from "./exerciseGenerators";
import {makeDescriptionAndTextFieldExercise} from "./exercise/makeDescriptionAndTextFieldExercise";

export const corpusArray: Atom[] = [
    {
        id: "complexNumbersAddition",
        title: "Complex Numbers: Addition",
        content: "Addition is easy: We just have to add the real and imaginary parts independently. This can also be shown by: a+bi + c+di = a+c + bi+di = (a+c) + (b+d)i.",
        exerciseGenerator: () => {
            const a = randomInt(10);
            const b = randomInt(10);
            const c = randomInt(10);
            const d = randomInt(10);
            const description = `What is (${a}+${b}i) + (${c} + ${d}i)?`;
            const answerValidator = checkIntegerComplex(a + c, b + d);
            return makeDescriptionAndTextFieldExercise(description, answerValidator);
        },
    },
];

export const corpusMap: Record<string, Atom> = (() => {
    const result: Record<string, Atom> = {};
    for (const atom of corpusArray) {
        result[atom.id] = atom;
    }
    return result;
})();
