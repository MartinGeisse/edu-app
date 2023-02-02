import {createContext, ReactNode, useContext, useRef} from "react";
import {StateStore} from "./StateStore";
import {EphemeralStateStore} from "./EphemeralStateStore";

export const stateStoreContext = createContext<StateStore>(new EphemeralStateStore());

export function StateStoreProvider({ children }: { children: ReactNode }) {
    const holder = useRef(new EphemeralStateStore());
    return <stateStoreContext.Provider value={holder.current}>{children}</stateStoreContext.Provider>
}

export function useStateStore() {
    return useContext(stateStoreContext);
}
