import {Atom} from "../atom/Atom";
import {AllExercisesScore} from "../state/AllExercisesScore";
import {rawCorpus} from "./raw/rawCorpus";

export function asMap(atoms: Atom[]) {
    const result: Record<string, Atom> = {};
    for (const atom of atoms) {
        result[atom.id] = atom;
    }
    return result;
}

export const corpusArray: Atom[] = rawCorpus;
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
