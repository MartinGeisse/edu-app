export interface Player {
    id: string;
    name: string;
}

export interface AdminStateStore {
    createPlayer(name: string): Promise<void>;
    getPlayerList(): Promise<Player[]>;
    deletePlayer(id: string): Promise<void>;
}
