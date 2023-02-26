
export interface GameStateStore {
    getAtomScore(id: string): Promise<number | true>;
    setAtomScore(id: string, value: number | true): Promise<void>;
}
