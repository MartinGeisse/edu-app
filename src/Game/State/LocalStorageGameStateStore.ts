import {GameStateStore} from "./GameStateStore";
import {corpusArray, corpusMap} from "../Corpus/corpus";
import {materializeExerciseRules} from "../Atom/ExerciseRules";

export class LocalStorageGameStateStoreSync {
    constructor(private readonly playerId: string) {}

    getAtomStateKey(atomId: string): string {
        return this.playerId + "/" + atomId;
    }

    awardAtomScore(id: string, increment: number): number | true {
        let score = this.getAtomScore(id);
        // even if the increment is negative, the score won't go down again once the player has reached the target
        // score for this atom
        if (score !== true) {
            const rules = materializeExerciseRules(corpusMap[id].exerciseRules);
            score += increment;
            if (score < 0) {
                score = 0;
            }
            if (score >= rules.targetScore) {
                score = true;
            }
            localStorage.setItem(this.getAtomStateKey(id), JSON.stringify(score));
        }
        return score;
    }

    getAtomScore(id: string): number | true {
        const json = localStorage.getItem(this.getAtomStateKey(id));
        if (json) {
            try {
                const decoded = JSON.parse(json);
                if (decoded === true) {
                    return true;
                }
                if (typeof decoded === "number" && decoded >= 0) {
                    return Math.floor(decoded);
                }
            } catch (error) {
                // fall through
            }
        }
        return 0;
    }

    getUnlockedButNotCompletedAtomIds(): string[] {
        return corpusArray.filter(atom => {
            return this.getAtomScore(atom.id) !== true &&
                atom.preconditionAtomIds.every(preconditionId => this.getAtomScore(preconditionId) === true);
        }).map(atom => atom.id);
    }

}

export class LocalStorageGameStateStore implements GameStateStore {
    private readonly sync: LocalStorageGameStateStoreSync;

    constructor(private readonly playerId: string) {
        this.sync = new LocalStorageGameStateStoreSync(playerId);
    }

    async awardAtomScore(id: string, increment: number): Promise<number | true> {
        return this.sync.awardAtomScore(id, increment);
    }

    async getAtomScore(id: string): Promise<number | true> {
        return this.sync.getAtomScore(id);
    }

    async getUnlockedButNotCompletedAtomIds(): Promise<string[]> {
        return this.sync.getUnlockedButNotCompletedAtomIds();
    }

}
