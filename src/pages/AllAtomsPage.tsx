import {corpusArray} from "../logic/corpus";

export function AllAtomsPage() {
    return <div>
        <ul>
            {corpusArray.map(atom => <li key={atom.id}>
                <a href={`/${atom.id}`}>{atom.title}</a>
            </li>)}
        </ul>
    </div>;
}
