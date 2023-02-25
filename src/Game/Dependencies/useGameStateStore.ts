import {useDependencyInjector} from "../../App/DependencyInjection/useDependencyInjector";

export function useGameStateStore() {
    return useDependencyInjector().gameStateStore;
}
