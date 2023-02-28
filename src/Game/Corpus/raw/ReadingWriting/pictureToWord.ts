import {imageToWordSelectionExerciseGenerator} from "./imageToWordSelectionExerciseGenerator";
import {noContent} from "../util";
import {Atom} from "../../../Atom/AtomTypes";

export const pictureToWord: Atom = {
    id: `picture-to-word`,
    title: `Wörter finden`,
    preconditionAtomIds: [],
    content: noContent,
    exerciseGenerator: imageToWordSelectionExerciseGenerator,
    exerciseRules: {targetScore: 100},
};
