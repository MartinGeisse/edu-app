import {Atom} from "../atom/Atom";
import {randomInt} from "../util/randomInt";
import {checkIntegerComplex} from "./checkIntegerComplex";
import {makeDescriptionAndTextFieldExercise} from "../exercise/makeDescriptionAndTextFieldExercise";
import {
    makeDescriptionAndShuffledRadioLikeButtonMatrix
} from "../exercise/makeDescriptionAndShuffledRadioLikeButtonMatrix";
import {
    makeDescriptionAndShuffledCheckboxLikeButtonMatrix
} from "../exercise/makeDescriptionAndShuffledCheckboxLikeButtonMatrix";
import {AtomContent} from "../content/AtomContent";
import {Line} from "../content/Drawing";

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
    {
        id: "contentTest",
        title: "Content Test",
        content: [
            "first para",
            "second para",
            {type: "plainText", text: "foo"},
            {
                type: "drawing",
                drawing: {
                    elements: [
                        new Line(0, 0, 0, 100),
                        new Line(0, 100, 50, 50),
                    ]
                }
            },
        ],
        exerciseGenerator: () => {
            const description: AtomContent = [];
            return makeDescriptionAndTextFieldExercise("Egal was du antwortest, ist eh falsch.", answer => false);
        },
    },
    {
        id: "radioTest",
        title: "Radio-like button matrix test",
        content: "foo",
        exerciseGenerator: () => {
            // const wrongAnswers = ["a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
            const rightAnswer = "c";

            const wrongAnswers = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11", "w12"];
            return makeDescriptionAndShuffledRadioLikeButtonMatrix("bla", rightAnswer, wrongAnswers, "singleSymbol");
        },
    },
    {
        id: "checkboxTest",
        title: "Checkbox-like button matrix test",
        content: "foo",
        exerciseGenerator: () => {
            return makeDescriptionAndShuffledCheckboxLikeButtonMatrix("bla", ["c1", "c2", "c3"], ["w1", "w2", "w3", "w4", "w5"], "medium");
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
