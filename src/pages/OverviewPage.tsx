import {getUnlockedButNotCompletedAtoms} from "../corpus/corpus";
import {AllExercisesScore} from "../state/AllExercisesScore";
import {useNavigate} from "react-router-dom";
import {Atom} from "../atom/Atom";
import {Card} from "@mui/material";

export type OverviewPageProps = {
    allExercisesScore: AllExercisesScore;
};

export function OverviewPage(props: OverviewPageProps) {
    const navigate = useNavigate();

    function handleAtomLinkClicked(atom: Atom): boolean {
        // we cannot fall back to an HTML link because we would lose the application state
        navigate("/" + atom.id);
        return false;
    }

    const unlockedButNotCompletedAtoms = getUnlockedButNotCompletedAtoms(props.allExercisesScore);
    return <div style={{maxWidth: "500px", marginLeft: "auto", marginRight: "auto"}}>
        {unlockedButNotCompletedAtoms.map(atom =>
            <Card
                key={atom.id}
                sx={{marginTop: "10px", padding: "20px"}}
                    onClick={() => handleAtomLinkClicked(atom)}
            >
                {atom.title}
            </Card>
        )}
    </div>;
}
