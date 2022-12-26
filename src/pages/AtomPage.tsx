import {PageProps} from "../App";
import {SelfLoadingAtomView} from "../logic/SelfLoadingAtomView";

export function makeAtomPage(id: string) {
    return (_props: PageProps) => <SelfLoadingAtomView id={id} />;
}
