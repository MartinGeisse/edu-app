import {DependencyInjector} from "./DependencyInjector";
import {EphemeralStateStore} from "../state/EphemeralStateStore";
import {LocalStorageAdminStateStore} from "../state/admin/LocalStorageAdminStateStore";

export function createDependencyInjector(): DependencyInjector {
    return {
        stateStore: new EphemeralStateStore(),
        adminStateStore: new LocalStorageAdminStateStore(),
    };
}
