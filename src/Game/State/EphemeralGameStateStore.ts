import {GameStateStore} from "./GameStateStore";

export class EphemeralGameStateStore implements GameStateStore {
    score: Record<string, number | true> = {};

    async getAtomScore(id: string): Promise<number | true>{
        return this.score[id] ?? 0;
    }

    async setAtomScore(id: string, value: number | true): Promise<void> {
        this.score[id] = value;
    }

}
