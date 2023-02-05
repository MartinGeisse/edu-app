import {createContext, ReactNode, useContext, useRef} from "react";
import {DependencyInjector} from "./DependencyInjector";
import {createDependencyInjector} from "./createDependencyInjector";

export const dependencyInjectorContext = createContext({} as DependencyInjector);

export function DependencyInjectorProvider({children}: {children: ReactNode}) {
    const ref = useRef(createDependencyInjector());
    return <dependencyInjectorContext.Provider value={ref.current}>
        {children}
    </dependencyInjectorContext.Provider>;
}

export function useDependencies() {
    return useContext(dependencyInjectorContext);
}
