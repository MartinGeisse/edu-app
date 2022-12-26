import {corpusMap} from "./corpus";
import {PreLoadedAtomView, PreLoadedAtomViewProps} from "./PreLoadedAtomView";
import Loader from "../util/Loader";
import {AtomState} from "./AtomState";
import {getAtomStateKey} from "../util/getAtomStateKey";
import {parseAtomState} from "../util/parseAtomState";

export type SelfLoadingAtomViewProps = {
    id: string;
};

async function loadInnerProps(outerProps: SelfLoadingAtomViewProps): Promise<Omit<PreLoadedAtomViewProps, "onStateChanged">> {
    const atom = corpusMap[outerProps.id];
    if (!atom) {
        throw new Error("unknown atom id: " + outerProps.id);
    }
    const state = parseAtomState(localStorage.getItem(getAtomStateKey(outerProps.id)));
    return {atom, state};
}

export function SelfLoadingAtomView(props: SelfLoadingAtomViewProps) {
    function onStateChanged(newState: AtomState) {
        const {score} = newState;
        const json = JSON.stringify({score});
        localStorage.setItem(getAtomStateKey(props.id), json);
    }
    return <Loader loadingFunction={loadInnerProps} args={[props]}>
        {loaderState => loaderState.type === "ready" &&
            <PreLoadedAtomView
                {...loaderState.result}
               onStateChanged={onStateChanged}
            />
        }
    </Loader>
}
