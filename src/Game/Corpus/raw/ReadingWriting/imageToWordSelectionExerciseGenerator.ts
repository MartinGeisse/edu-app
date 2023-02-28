import {
    makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers
} from "../../../../Exercise/Factory/makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers";
import {randomElement} from "../../../../Util/randomElement";
import {dictionaryWithPictures} from "./dictionary/dictionaryWithPictures";
import {makeDescriptionAnd} from "../../../../Exercise/Factory/makeDescriptionAnd";

export function imageToWordSelectionExerciseGenerator() {
    const entryOriginal = randomElement(dictionaryWithPictures);
    const entry = {word: entryOriginal.word.toUpperCase(), picture: entryOriginal.picture};
    const wrongWords: string[] = [];
    while (wrongWords.length < 5) {
        const otherEntry = randomElement(dictionaryWithPictures);
        const otherWord = otherEntry.word.toUpperCase();
        if (otherWord !== entry.word && !wrongWords.includes(otherWord)) {
            wrongWords.push(otherWord);
        }
    }
    return makeDescriptionAnd({type: "image", image: entry.picture},
        makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers(entry.word, wrongWords, "short"));
}
