import {
    makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers
} from "../../exercise/makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers";
import {randomElement} from "../../util/randomElement";
import {dictionaryWithPictures} from "./dictionary/dictionaryWithPictures";
import {makeDescriptionAnd} from "../../exercise/makeDescriptionAnd";

export function imageToWordSelectionExerciseGenerator() {
    const entryOriginal = randomElement(dictionaryWithPictures);
    const entry = {word: entryOriginal.word.toUpperCase(), picture: entryOriginal.picture};
    const wrongWords: string[] = [];
    for (let i = 0; i < 5; i++) {
        const otherEntry = randomElement(dictionaryWithPictures);
        const otherWord = otherEntry.word.toUpperCase();
        if (otherWord !== entry.word && !wrongWords.includes(otherWord)) {
            wrongWords.push(otherWord);
        }
    }
    return makeDescriptionAnd({type: "image", image: entry.picture},
        makeShuffledRadioLikeButtonMatrixFromSeparatedAnswers(entry.word, wrongWords, "medium"));
}
