import {useNavigate} from "react-router-dom";
import {Card, ToggleButton} from "@mui/material";
import {DarkBackground} from "../Util/Component/DarkBackground";
import {corpusArray, corpusMap} from "./Corpus/corpus";
import {HiddenMenuTrigger} from "./HiddenMenuTrigger";
import Loader from "../Util/Component/Loader";
import {useGameStateStore} from "./Dependencies/useGameStateStore";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import {Atom} from "./Atom/AtomTypes";
import {loadScoreMap} from "./Util/loadScoreMap";
import {GameStateStore} from "./State/GameStateStore";

async function loadAtoms(gameStateStore: GameStateStore, showFinished: boolean): Promise<Atom[]> {
    const scoreMap = await loadScoreMap(gameStateStore);
    const isFinished = (atom: Atom) => scoreMap[atom.id] === true;
    const isUnlocked = (atom: Atom) => atom.preconditionAtomIds.every(id => isFinished(corpusMap[id]));
    return corpusArray.filter(atom => isFinished(atom) ? showFinished : isUnlocked(atom));
}

export function OverviewPage() {
    const navigate = useNavigate();
    const stateStore = useGameStateStore();
    const [showFinished, setShowFinished] = useState(false);

    function handleAtomLinkClicked(atomId: string): boolean {
        // we cannot fall back to an HTML link because we would lose the application state
        navigate("/" + atomId);
        return false;
    }

    return <DarkBackground>
        <div style={{maxWidth: "500px", marginLeft: "auto", marginRight: "auto"}}>
            <Loader loadingFunction={loadAtoms} args={[stateStore, showFinished]}>
                {(loaderState) => loaderState.type === "ready" && loaderState.result.map((atom: Atom) => {
                    return <Card
                        key={atom.id}
                        sx={{marginTop: "10px", padding: "20px"}}
                        onClick={() => handleAtomLinkClicked(atom.id)}
                    >
                        {atom.title}
                    </Card>;
                })}
            </Loader>
        </div>
        <HiddenMenuTrigger />
        <div style={{position: "fixed", left: 0, right: 0, bottom: 0, height: "auto", display: "flex", justifyContent: "center", backgroundColor: "#fff"}}>
            <ToggleButton value="showFinished" selected={showFinished} onClick={() => setShowFinished(!showFinished)}>
                <FontAwesomeIcon icon={faCheck} size={"2x"} color={showFinished ? "#0f0" : ""} />
            </ToggleButton>
        </div>
    </DarkBackground>;
}
