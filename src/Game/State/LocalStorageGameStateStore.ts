import {GameStateStore} from "./GameStateStore";

export class LocalStorageGameStateStoreSync {
    constructor(private readonly playerId: string) {}

    getAtomStateKey(atomId: string): string {
        return this.playerId + "/" + atomId;
    }

    setAtomScore(id: string, value: number | true): void {
        localStorage.setItem(this.getAtomStateKey(id), JSON.stringify(value));
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

}

export class LocalStorageGameStateStore implements GameStateStore {
    private readonly sync: LocalStorageGameStateStoreSync;

    constructor(private readonly playerId: string) {
        this.sync = new LocalStorageGameStateStoreSync(playerId);
    }

    async getAtomScore(id: string): Promise<number | true> {
        return this.sync.getAtomScore(id);
    }

    async setAtomScore(id: string, value: number | true): Promise<void> {
        this.sync.setAtomScore(id, value);
    }

}
