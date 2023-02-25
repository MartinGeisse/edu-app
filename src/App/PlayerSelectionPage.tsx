import Loader from "../Util/Component/Loader";
import {useDependencyInjector} from "./DependencyInjection/useDependencyInjector";
import {AdminStateStore, Player} from "./AdminState/AdminStateStore";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useChoosePlayer} from "./AdminState/useChoosePlayer";
import {useEffectOnce} from "../Util/useEffectOnce";

async function loadPlayerList(adminStateStore: AdminStateStore): Promise<Player[]> {
    return adminStateStore.getPlayerList();
}

export function PlayerSelectionPage() {
    const injector = useDependencyInjector();
    const choosePlayer = useChoosePlayer();
    const navigate = useNavigate();

    // handle a 0-player or 1-player list automatically
    useEffectOnce(async () => {
        if (injector.session.playerId === null) {
            const playerList = await injector.adminStateStore.getPlayerList();
            if (playerList.length === 0) {
                const playerId = await injector.adminStateStore.createPlayer("Spieler");
                choosePlayer(playerId);
                navigate("/");
            } else if (playerList.length === 1) {
                choosePlayer(playerList[0].id);
                navigate("/");
            }
        }
    });

    function onPlayerButtonClicked(player: Player) {
        choosePlayer(player.id);
        navigate("/");
    }

    return <Loader loadingFunction={loadPlayerList} args={[injector.adminStateStore]}>
        {(loaderState) => loaderState.type === "ready" && <>
            <h1>Spieler wählen</h1>
            {loaderState.result.map((player) => <div>
                <Button variant={"outlined"} onClick={() => onPlayerButtonClicked(player)}>{player.name}</Button>
            </div>)}
        </>}
    </Loader>;
}
