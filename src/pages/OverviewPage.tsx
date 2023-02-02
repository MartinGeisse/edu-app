import {useNavigate} from "react-router-dom";
import {Card} from "@mui/material";
import {DarkBackground} from "../components/exercise/DarkBackground";
import Loader from "../components/Loader";
import {useStateStore} from "../state/StateStoreContext";
import {corpusMap} from "../corpus/corpus";

export function OverviewPage() {
    const navigate = useNavigate();
    const stateStore = useStateStore();

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
    </DarkBackground>;
}
