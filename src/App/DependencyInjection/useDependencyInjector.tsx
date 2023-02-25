import {createContext, ReactNode, useContext, useState} from "react";
import {DependencyInjector} from "./DependencyInjector";
import {createInitialDependencyInjector} from "./createInitialDependencyInjector";

export const dependencyInjectorContext = createContext({} as DependencyInjector);

export function DependencyInjectorProvider({children}: {children: ReactNode}) {
    const [injector, setInjector] = useState<DependencyInjector>(createInitialDependencyInjector(
        (newInjector: DependencyInjector) => setInjector(newInjector)
    ));
    return <dependencyInjectorContext.Provider value={injector}>
        {children}
    </dependencyInjectorContext.Provider>;
}

export function useDependencyInjector() {
    return useContext(dependencyInjectorContext);
}
