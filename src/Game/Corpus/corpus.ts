import {rawCorpus} from "./raw/rawCorpus";
import {Atom} from "../Atom/AtomTypes";

export function asMap(atoms: Atom[]) {
    const result: Record<string, Atom> = {};
    for (const atom of atoms) {
        result[atom.id] = atom;
    }
    return result;
}

// noinspection UnnecessaryLocalVariableJS
export const corpusArray: Atom[] = rawCorpus;
export const corpusMap = asMap(corpusArray);
