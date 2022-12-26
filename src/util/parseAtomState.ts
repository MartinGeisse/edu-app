import {AtomState} from "../logic/AtomState";

export function parseAtomState(json: string|undefined|null): AtomState {
    const decodedValue = JSON.parse(json ?? "{}");
    const decodedObject: Record<string, any> = ((typeof decodedValue === "object") ? (decodedValue ?? {}) : {});
    const {score} = {
        score: 0,
        ...decodedObject,
    };
    return {score};
}
