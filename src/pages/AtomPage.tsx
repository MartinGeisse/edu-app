import {corpusMap} from "../corpus/corpus";
import {PreLoadedAtomPage} from "./PreLoadedAtomPage";
import Loader from "../components/Loader";
import {Atom} from "../atom/Atom";
import {StateStore} from "../state/StateStore";
import {useStateStore} from "../state/StateStoreContext";

export type AtomViewProps = {
    id: string;
};

interface LoadedData {
    atom: Atom;
    score: number | true,
}

async function loadData(stateScore: StateStore, atomId: string): Promise<LoadedData> {
    const atom = corpusMap[atomId];
    if (!atom) {
        throw new Error("unknown atom id: " + atomId);
    }
    const score = await stateScore.getAtomScore(atomId);
    return {atom, score};
}

export function AtomPage(props: AtomViewProps) {
    const stateStore = useStateStore();
    return <Loader loadingFunction={loadData} args={[stateStore, props.id]}>
        {loaderState => loaderState.type === "ready" && (() => {
            const {atom, score} = loaderState.result;

            return <PreLoadedAtomPage
                key={atom.id}
                atom={atom}
                initialScore={score}
                awardScore={async (increment: number): Promise<number | true> => {
                    return await stateStore.awardAtomScore(atom.id, increment);
                }}
            />;
        })()}
    </Loader>;
}
