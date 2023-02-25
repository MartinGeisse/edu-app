export interface GameStateStore {
    getUnlockedButNotCompletedAtomIds(): Promise<string[]>;
    getAtomScore(id: string): Promise<number | true>;
    awardAtomScore(id: string, increment: number): Promise<number | true>;
}
