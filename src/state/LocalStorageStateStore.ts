import {StateStore} from "./StateStore";

/*
    const decodedValue = JSON.parse(json ?? "{}");
    const decodedObject: Record<string, any> = ((typeof decodedValue === "object") ? (decodedValue ?? {}) : {});
    const {score} = {
        score: 0,
        ...decodedObject,
    };
    return {score};
 */

/*
export function getAtomStateKey(id: string) {
    return "atom:" + id;
}

    const state = parseAtomState(localStorage.getItem(getAtomStateKey(outerProps.id)));


    function onStateChanged(newState: AtomState) {
        const {score} = newState;
        const json = JSON.stringify({score});
        localStorage.setItem(getAtomStateKey(props.id), json);
    }

 */

export class LocalStorageStateStore implements StateStore {

    awardAtomScore(id: string, increment: number): Promise<number | true> {
        //         localStorage.setItem(getAtomStateKey(props.id), json);
        throw new Error();
    }

    getAtomScore(id: string): Promise<number | true> {
        // const state = parseAtomState(localStorage.getItem(getAtomStateKey(outerProps.id)));
        throw new Error();
    }

    getUnlockedButNotCompletedAtomIds(): Promise<string[]> {
        throw new Error();
    }

}
