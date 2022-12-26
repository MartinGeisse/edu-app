import {corpusMap} from "../corpus/corpus";
import {PreLoadedAtomPage, PreLoadedAtomPageProps} from "./PreLoadedAtomPage";
import Loader from "../components/Loader";
import {AtomState} from "../atom/AtomState";
import {getAtomStateKey} from "../util/getAtomStateKey";
import {parseAtomState} from "../util/parseAtomState";

export type SelfLoadingAtomViewProps = {
    id: string;
};

async function loadInnerProps(outerProps: SelfLoadingAtomViewProps): Promise<Omit<PreLoadedAtomPageProps, "onStateChanged">> {
    const atom = corpusMap[outerProps.id];
    if (!atom) {
        throw new Error("unknown atom id: " + outerProps.id);
    }
    const state = parseAtomState(localStorage.getItem(getAtomStateKey(outerProps.id)));
    return {atom, state};
}

export function SelfLoadingAtomPage(props: SelfLoadingAtomViewProps) {
    function onStateChanged(newState: AtomState) {
        const {score} = newState;
        const json = JSON.stringify({score});
        localStorage.setItem(getAtomStateKey(props.id), json);
    }
    return <Loader loadingFunction={loadInnerProps} args={[props]}>
        {loaderState => loaderState.type === "ready" &&
            <PreLoadedAtomPage
                {...loaderState.result}
               onStateChanged={onStateChanged}
            />
        }
    </Loader>
}
