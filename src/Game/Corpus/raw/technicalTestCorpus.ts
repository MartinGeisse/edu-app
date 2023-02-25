import {randomInt} from "../../../Util/randomInt";
import {makeIntegerComplexValidator} from "../makeIntegerComplexValidator";
import {makeTextFieldExercise} from "../../../Exercise/Factory/makeTextFieldExercise";
import {makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers} from "../../../Exercise/Factory/makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers";
import {makeShuffledCheckboxLikeButtonMatrix} from "../../../Exercise/Factory/makeShuffledCheckboxLikeButtonMatrix";
import {makeDescriptionAnd} from "../../../Exercise/Factory/makeDescriptionAnd";
import {StaticBlockContent} from "../../../Util/StaticContent/StaticBlockContent";
import {Atom} from "../../Atom/AtomTypes";

function text(text: string): StaticBlockContent {
    return {type: "paragraph", content: text};
}

export const technicalTestCorpus: Atom[] = [
    {
        id: "complexNumbersAddition",
        title: "Complex Numbers: Addition",
        content: text("Addition is easy: We just have to add the real and imaginary parts independently. This can also be shown by: a+bi + c+di = a+c + bi+di = (a+c) + (b+d)i."),
        exerciseGenerator: () => {
            const a = randomInt(10);
            const b = randomInt(10);
            const c = randomInt(10);
            const d = randomInt(10);
            return makeDescriptionAnd(
                text(`What is (${a}+${b}i) + (${c} + ${d}i)?`),
                makeTextFieldExercise(makeIntegerComplexValidator(a + c, b + d)),
            );
        },
        preconditionAtomIds: [],
    },
    {
        id: "radioTest",
        title: "Radio-like button matrix test",
        content: text("foo"),
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

            return makeDescriptionAnd(text("bla"), makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers(rightAnswer, wrongAnswers, labelSize));
        },
        preconditionAtomIds: [],
    },
    {
        id: "checkboxTest",
        title: "Checkbox-like button matrix test",
        content: text("foo"),
        exerciseGenerator: () => {
            return makeDescriptionAnd(text("bla"), makeShuffledCheckboxLikeButtonMatrix(["c1", "c2", "c3"], ["w1", "w2", "w3", "w4", "w5"], "medium"));
        },
        preconditionAtomIds: [],
    },
];
