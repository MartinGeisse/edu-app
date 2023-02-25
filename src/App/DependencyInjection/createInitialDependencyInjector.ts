import {DependencyInjector} from "./DependencyInjector";
import {LocalStorageAdminStateStore} from "../AdminState/LocalStorageAdminStateStore";
import {BrokenGameStateStore} from "../../Game/State/BrokenGameStateStore";

export function createInitialDependencyInjector(
    replaceDependencyInjector: (newInjector: DependencyInjector) => void,
): DependencyInjector {
    return {
        adminStateStore: new LocalStorageAdminStateStore(),
        session: {playerId: null},
        gameStateStore: new BrokenGameStateStore(),
        replaceDependencyInjector,
    };
}
