import {corpusMap} from "../Corpus/corpus";
import {PreLoadedAtomPage} from "./PreLoadedAtomPage";
import {GameStateStore} from "../State/GameStateStore";
import {Atom} from "./AtomTypes";
import Loader from "../../Util/Component/Loader";
import {useGameStateStore} from "../Dependencies/useGameStateStore";
import {materializeExerciseRules} from "./ExerciseRules";

export type AtomViewProps = {
    id: string;
};

interface LoadedData {
    atom: Atom;
    score: number | true,
}

async function loadData(stateScore: GameStateStore, atomId: string): Promise<LoadedData> {
    const atom = corpusMap[atomId];
    if (!atom) {
        throw new Error("unknown atom id: " + atomId);
    }
    const score = await stateScore.getAtomScore(atomId);
    return {atom, score};
}

/**
 * Loading and stateful atom page (most state happens inside PreLoadedAtomPage).
 */
export function AtomPage(props: AtomViewProps) {
    const stateStore = useGameStateStore();
    return <Loader loadingFunction={loadData} args={[stateStore, props.id]}>
        {loaderState => loaderState.type === "ready" && (() => {
            const {atom, score} = loaderState.result;

            return <PreLoadedAtomPage
                key={atom.id}
                atom={atom}
                initialScore={score}
                awardScore={async (increment: number): Promise<number | true> => {
                    const rules = materializeExerciseRules(corpusMap[atom.id].exerciseRules);
                    let score = await stateStore.getAtomScore(atom.id);
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
                        await stateStore.setAtomScore(atom.id, score);
                    }
                    return score;
                }}
            />;
        })()}
    </Loader>;
}
