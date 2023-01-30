import {Atom} from "../atom/Atom";
import {randomInt} from "../util/randomInt";
import {makeIntegerComplexValidator} from "./makeIntegerComplexValidator";
import {makeTextFieldExercise} from "../exercise/makeTextFieldExercise";
import {makeShuffledRadioLikeButtonMatrix} from "../exercise/makeShuffledRadioLikeButtonMatrix";
import {makeShuffledCheckboxLikeButtonMatrix} from "../exercise/makeShuffledCheckboxLikeButtonMatrix";
import {Line} from "../content/Drawing";
import {makeDescriptionAnd} from "../exercise/makeDescriptionAnd";
import {AllExercisesScore} from "../state/AllExercisesScore";

export function asMap(atoms: Atom[]) {
    const result: Record<string, Atom> = {};
    for (const atom of atoms) {
        result[atom.id] = atom;
    }
    return result;
}

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
            return makeDescriptionAnd(
                `What is (${a}+${b}i) + (${c} + ${d}i)?`,
                makeTextFieldExercise(makeIntegerComplexValidator(a + c, b + d)),
            );
        },
        preconditionAtomIds: [],
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
            return makeDescriptionAnd(
                "Egal was du antwortest, ist eh falsch.",
                makeTextFieldExercise(_answer => false),
            );
        },
        preconditionAtomIds: [],
    },
    {
        id: "radioTest",
        title: "Radio-like button matrix test",
        content: "foo",
        exerciseGenerator: () => {
            // const wrongAnswers = ["a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
            // const rightAnswer = "c";
            // const labelSize = "veryShort";

            // const wrongAnswers = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8", "w9", "w10", "w11", "w12"];
            // const rightAnswer = "c";
            // const labelSize = "veryShort";

            // const wrongAnswers = ["efkwjai", "qkdjwif", "wiofjeiuwh", "fewf", "ewfiwiuhi", "ewuiewhuie", "ewjfhewuifh", "wefewf", "ewgwgwe", "ewggwewwe", "ewgweweg", "efwew2"];
            // const rightAnswer = "correct";
            // const labelSize = "short";

            // const wrongAnswers = [
            //     "efkwjafefiowjefiojei", "qkdjewifjweiofjewiowif", "wioewfijwiofjwoifjeiuwh",
            //     "fewf", "ewfiwiuweoifjweiofhi", "ewuiewhewofijeiowuie",
            //     "ewjfheewfwopopwewuifh", "ewoifjiowejfoiewjio", "ewoifjweiofjweiofjewoijfeoi",
            //     "ewggwewwe", "ewgweweg", "efwew2"
            // ];
            // const rightAnswer = "correct";
            // const labelSize = "medium";

            const wrongAnswers = [
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
                "Lorem ipsum dolor sit amet",
            ];
            const rightAnswer = "correct";
            const labelSize = "veryLong";

            return makeDescriptionAnd("bla", makeShuffledRadioLikeButtonMatrix(rightAnswer, wrongAnswers, labelSize));
        },
        preconditionAtomIds: [],
    },
    {
        id: "checkboxTest",
        title: "Checkbox-like button matrix test",
        content: "foo",
        exerciseGenerator: () => {
            return makeDescriptionAnd("bla", makeShuffledCheckboxLikeButtonMatrix(["c1", "c2", "c3"], ["w1", "w2", "w3", "w4", "w5"], "medium"));
        },
        preconditionAtomIds: [],
    },
];
export const corpusMap = asMap(corpusArray);

export function isAtomCompletedById(atomId: string, score: AllExercisesScore): boolean {
    return score[atomId] === true;
}

export function getCompletedAtoms(score: AllExercisesScore): Atom[] {
    return corpusArray.filter(atom => isAtomCompletedById(atom.id, score));
}

export function isAtomUnlocked(atom: Atom, score: AllExercisesScore): boolean {
    return atom.preconditionAtomIds.every(preconditionId => isAtomCompletedById(preconditionId, score));
}

export function isAtomUnlockedById(atomId: string, score: AllExercisesScore): boolean {
    return isAtomUnlocked(corpusMap[atomId], score);
}

export function getUnlockedButNotCompletedAtoms(score: AllExercisesScore): Atom[] {
    return corpusArray.filter(atom => isAtomUnlocked(atom, score) && !isAtomCompletedById(atom.id, score));
}
