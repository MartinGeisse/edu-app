import {Atom} from "../../Atom/AtomTypes";
import {additionAtoms} from "./Math/addition";
import {subtractionAtoms} from "./Math/subtraction";
import {multiplicationAtoms} from "./Math/multiplication";
import {letterAtoms} from "./ReadingWriting/letters";
import {pictureToWord} from "./ReadingWriting/pictureToWord";

export const mvpCorpus1: Atom[] = [
    ...additionAtoms,
    ...subtractionAtoms,
    ...multiplicationAtoms,
    ...letterAtoms,
    pictureToWord,
];
