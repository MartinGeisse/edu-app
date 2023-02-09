import {StateStore} from "../state/StateStore";
import {AdminStateStore} from "../state/admin/AdminStateStore";
import {Session} from "../session/Session";

export interface DependencyInjector {
    adminStateStore: AdminStateStore;
    session: Session;
    stateStore: StateStore;
}
