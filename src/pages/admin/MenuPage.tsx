import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useDependencies} from "../../di/useDependencies";

export function MenuPage() {
    const adminStateStore = useDependencies().adminStateStore;

    async function createPlayer() {
        const name = prompt("Name?");
        if (name) {
            await adminStateStore.createPlayer(name);
        }
    }

    async function showPlayerList() {
        const playerList = await adminStateStore.getPlayerList();
        alert(playerList.map(entry => entry.id + ":" + entry.name).join(", "));
    }

    async function deletePlayer() {
        const id = prompt("ID?");
        if (id) {
            await adminStateStore.deletePlayer(id);
        }
    }

    async function reset() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("reset?")) {
            await adminStateStore.reset();
        }
    }

    return <List>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText primary="Spieler anlegen" onClick={createPlayer} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText primary="Spielerliste" onClick={showPlayerList} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText primary="Spieler löschen" onClick={deletePlayer} />
            </ListItemButton>
        </ListItem>
        <br /><br /><br /><br /><br /><br />
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText primary="reset" onClick={reset} />
            </ListItemButton>
        </ListItem>
    </List>;
}
