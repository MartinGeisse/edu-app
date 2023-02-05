import {AdminStateStore, Player} from "./AdminStateStore";

function getPlayers(): Player[] {
    return (JSON.parse(localStorage.getItem("players") ?? "[]")) as Player[];
}

function setPlayers(players: Player[]): void {
    localStorage.setItem("players", JSON.stringify(players));
}

export class LocalStorageAdminStateStore implements AdminStateStore {

    async createPlayer(name: string): Promise<void> {
        const players = getPlayers();
        players.push({id: "" + players.length, name});
        setPlayers(players);
    }

    async getPlayerList(): Promise<Player[]> {
        return getPlayers();
    }

    async deletePlayer(id: string): Promise<void> {
        setPlayers(getPlayers().filter(player => player.id !== id));
    }

}
