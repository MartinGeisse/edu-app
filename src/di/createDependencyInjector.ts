import {DependencyInjector} from "./DependencyInjector";
import {EphemeralStateStore} from "../state/EphemeralStateStore";
import {LocalStorageAdminStateStore} from "../state/admin/LocalStorageAdminStateStore";

export function createDependencyInjector(): DependencyInjector {
    return {
        adminStateStore: new LocalStorageAdminStateStore(),
        session: {playerId: null},
        stateStore: new EphemeralStateStore(),
    };
}
