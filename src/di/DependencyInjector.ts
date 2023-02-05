import {StateStore} from "../state/StateStore";
import {AdminStateStore} from "../state/admin/AdminStateStore";

export interface DependencyInjector {
    stateStore: StateStore;
    adminStateStore: AdminStateStore;
}
