import {StateStore} from "./StateStore";
import {corpusArray, corpusMap} from "../corpus/corpus";
import {materializeExerciseRules} from "../atom/Atom";

export class EphemeralStateStore implements StateStore {
    score: Record<string, number | true> = {};

    async getCompletedAtomIds(): Promise<string[]> {
        return Object.keys(this.score).filter((id: string) => this.score[id] === true);
    }

    async getUnlockedAtomIds(): Promise<string[]> {
        return corpusArray.filter(atom => {
            return atom.preconditionAtomIds.every(preconditionId => this.score[preconditionId] === true);
        }).map(atom => atom.id);
    }

    async getUnlockedButNotCompletedAtomIds(): Promise<string[]>{
        return corpusArray.filter(atom => {
            return this.score[atom.id] === true &&
                atom.preconditionAtomIds.every(preconditionId => this.score[preconditionId] === true);
        }).map(atom => atom.id);
    }

    async getAtomScore(id: string): Promise<number | true>{
        return this.score[id] ?? 0;
    }

    async awardAtomScore(id: string, increment: number): Promise<number | true> {
        const rules = materializeExerciseRules(corpusMap[id].exerciseRules);
        let score = this.score[id] ?? 0;
        // even if decrement is negative, the score won't go down again once the player has reached the target
        // score for this atom
        if (score !== true) {
            score += increment;
            if (score < 0) {
                score = 0;
            }
            if (score >= rules.targetScore) {
                score = true;
            }
            this.score[id] = score;
        }
        return score;
    }
}
