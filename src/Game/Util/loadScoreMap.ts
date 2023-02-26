import {corpusArray} from "../Corpus/corpus";
import {GameStateStore} from "../State/GameStateStore";

export async function loadScoreMap(gameStateStore: GameStateStore): Promise<Record<string, number | true>> {
    const result: Record<string, number | true> = {};
    await Promise.all(corpusArray.map(async (atom) => {
        result[atom.id] = await gameStateStore.getAtomScore(atom.id);
    }));
    return result;
}
