import {useDependencyInjector} from "../DependencyInjection/useDependencyInjector";
import {LocalStorageGameStateStore} from "../../Game/State/LocalStorageGameStateStore";
import {DependencyInjector} from "../DependencyInjection/DependencyInjector";

export function choosePlayer(playerId: string, injector: DependencyInjector) {
    injector.replaceDependencyInjector({
        ...injector,
        session: {playerId: playerId},
        gameStateStore: new LocalStorageGameStateStore(playerId),
    });
}

export function useChoosePlayer(): (playerId: string) => void {
    const injector = useDependencyInjector();
    return (playerId: string) => choosePlayer(playerId, injector);
}
