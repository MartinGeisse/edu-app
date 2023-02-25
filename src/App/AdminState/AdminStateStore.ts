export interface Player {
    id: string;
    name: string;
}

export interface AdminStateStore {
    createPlayer(name: string): Promise<string>;
    getPlayerList(): Promise<Player[]>;
    deletePlayer(id: string): Promise<void>;
    reset(): Promise<void>;
}
