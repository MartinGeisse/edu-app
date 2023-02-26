import {GameStateStore} from "./GameStateStore";

export class BrokenGameStateStore implements GameStateStore {

    getAtomScore(id: string): Promise<number | true> {
        throw new Error();
    }

    setAtomScore(id: string, value: number | true): Promise<void> {
        throw new Error();
    }

}
