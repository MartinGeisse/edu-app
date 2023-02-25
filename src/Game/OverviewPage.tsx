import {useNavigate} from "react-router-dom";
import {Card} from "@mui/material";
import {DarkBackground} from "../Util/Component/DarkBackground";
import {corpusMap} from "./Corpus/corpus";
import {HiddenMenuTrigger} from "./HiddenMenuTrigger";
import Loader from "../Util/Component/Loader";
import {useGameStateStore} from "./Dependencies/useGameStateStore";

export function OverviewPage() {
    const navigate = useNavigate();
    const stateStore = useGameStateStore();

    function handleAtomLinkClicked(atomId: string): boolean {
        // we cannot fall back to an HTML link because we would lose the application state
        navigate("/" + atomId);
        return false;
    }

    return <DarkBackground>
        <div style={{maxWidth: "500px", marginLeft: "auto", marginRight: "auto"}}>
            <Loader loadingFunction={() => stateStore.getUnlockedButNotCompletedAtomIds()}>
                {(loaderState) => loaderState.type === "ready" && loaderState.result.map((atomId: string) => {
                    return <Card
                        key={atomId}
                        sx={{marginTop: "10px", padding: "20px"}}
                        onClick={() => handleAtomLinkClicked(atomId)}
                    >
                        {corpusMap[atomId].title}
                    </Card>;
                })}
            </Loader>
        </div>
        <HiddenMenuTrigger />
    </DarkBackground>;
}
