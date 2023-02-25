import {GameStateStore} from "./GameStateStore";

export class BrokenGameStateStore implements GameStateStore {

    awardAtomScore(id: string, increment: number): Promise<number | true> {
        throw new Error();
    }

    getAtomScore(id: string): Promise<number | true> {
        throw new Error();
    }

    getUnlockedButNotCompletedAtomIds(): Promise<string[]> {
        throw new Error();
    }

}
