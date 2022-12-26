import {ReactElement, ReactNode, useEffect, useRef, useState} from "react";

export type StateType = "loading" | "ready" | "error";

export type LoaderStateBase<T> = {
    type: StateType;
    result: T | null;
    reload: () => void;
};

export type LoaderStateLoading<T> = LoaderStateBase<T> & {
    type: "loading";
    result: null;
}

export type LoaderStateReady<T> = LoaderStateBase<T> & {
    type: "ready";
    result: T;
}

export type LoaderStateError<T> = LoaderStateBase<T> & {
    type: "error";
    result: null;
}

export type LoaderState<T> = LoaderStateLoading<T> | LoaderStateReady<T> | LoaderStateError<T>;

export type Renderer<T> = (state: LoaderState<T>) => ReactNode;

export type LoaderProps<T> = {
    loadingFunction: (...args: any[]) => Promise<T>,
    args?: any[],
    otherDependencies?: any[],
    children: Renderer<T>,
};

function equalDependencies(d1: any[], d2: any[]) {
    if (d1.length !== d2.length) {
        return false;
    }
    for (let i = 0; i < d1.length; i++) {
        if (!Object.is(d1[i], d2[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Dependencies: The loadingFunction is explicitly NOT used as a dependency so it can be an arrow function. All
 * dependencies must be passed as args or otherDependencies. Two typical ways to do this is either to make all
 * dependencies explicit as arguments to the loadingFunction -- no otherDependencies are needed in this case -- or
 * to make all dependencies implicit and passing them as otherDependencies, making loadingFunction a no-arg function --
 * no args are needed in this case.
 *
 * The args and otherDependencies must not change in size or order between renders of the Loader.
 */
export default function Loader<T>({
    loadingFunction,
    args,
    otherDependencies,
    children,
}: LoaderProps<T>): ReactElement {

    // support explicit reloading
    const [reloadDummy, setReloadDummy] = useState({});
    const reload = () => setReloadDummy({});

    // parameter normalization
    const safeArgs = args || [];
    const dependencies = [...safeArgs, ...(otherDependencies || []), reloadDummy];

    // loading
    const [state, setState] = useState<LoaderState<T>>({type: "loading", result: null, reload});
    const previousDependenciesHolder = useRef<any[]>([{}]); // the initial value is definitely different from anything
    useEffect(() => {
        if (!equalDependencies(dependencies, previousDependenciesHolder.current)) {
            // this fixes the double execution in React strict mode
            previousDependenciesHolder.current = dependencies;
            const fetchData = async () => {
                try {
                    const result: T = await loadingFunction.apply(null, safeArgs);
                    setState({type: "ready", result, reload});
                } catch (e) {
                    console.log("EXCEPTION", e);
                    setState({type: "error", result: null, reload});
                }
            };
            // noinspection JSIgnoredPromiseFromCall
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    // rendering
    return <>{children(state)}</>;

}
