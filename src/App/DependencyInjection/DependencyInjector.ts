import {AdminStateStore} from "../AdminState/AdminStateStore";
import {Session} from "../Session";
import {GameStateStore} from "../../Game/State/GameStateStore";

export interface DependencyInjector {
    adminStateStore: AdminStateStore;
    session: Session;
    gameStateStore: GameStateStore;
    replaceDependencyInjector(newInjector: DependencyInjector): void;
}
