import {getUnlockedButNotCompletedAtoms} from "../corpus/corpus";
import {AllExercisesScore} from "../state/AllExercisesScore";
import {useNavigate} from "react-router-dom";
import {Atom} from "../atom/Atom";

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
    return <div>
        <ul>
            {unlockedButNotCompletedAtoms.map(atom => <li key={atom.id}>
                <a href="#foo" onClick={() => handleAtomLinkClicked(atom)}>{atom.title}</a>
            </li>)}
        </ul>
    </div>;
}
