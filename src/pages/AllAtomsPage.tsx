import {corpusArray} from "../logic/corpus";
import {PageProps} from "../App";
import {makeAtomPage} from "./AtomPage";

export function AllAtomsPage(props: PageProps) {
    return <div>
        <ul>
            {corpusArray.map(atom => <li key={atom.id}>
                <a href={"#"} onClick={() => props.setPage(makeAtomPage(atom.id))}>{atom.title}</a>
            </li>)}
        </ul>
    </div>;
}
