import {AdminStateStore, Player} from "./AdminStateStore";

function get(key: string): unknown {
    const json = localStorage.getItem(key);
    return json === null ? null : JSON.parse(json);
}

function set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function getPlayers(): Player[] {
    return (get("players") ?? []) as Player[];
}

function setPlayers(players: Player[]): void {
    set("players", players);
}

function generateId(key: string) {
    const id = (get(key) as number ?? 0);
    set(key, id + 1);
    return id;
}

export class LocalStorageAdminStateStore implements AdminStateStore {

    async createPlayer(name: string): Promise<string> {
        const id = generateId("playerIdCounter") + "";
        const players = getPlayers();
        players.push({id, name});
        setPlayers(players);
        return id;
    }

    async getPlayerList(): Promise<Player[]> {
        return getPlayers();
    }

    async deletePlayer(id: string): Promise<void> {
        setPlayers(getPlayers().filter(player => player.id !== id));
    }

    async reset(): Promise<void> {
        localStorage.clear();
    }

}
