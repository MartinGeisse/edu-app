import {useRef} from "react";
import {useNavigateToAdminMenuPage} from "../App/AppRoutes";

const secret = "010011011";

/**
 * Note: the trigger is hidden, not the menu per se. I just don't want it to clutter the UI and be opened accidentally.
 */
export function HiddenMenuTrigger() {
    const navigateToAdminMenuPage = useNavigateToAdminMenuPage();
    const inputHolder = useRef("");

    function onClick(index: number): void {
        inputHolder.current += index;
        inputHolder.current = inputHolder.current.substring(inputHolder.current.length - secret.length);
        if (inputHolder.current === secret) {
            navigateToAdminMenuPage();
        }
    }

    return <div>
        <div style={{height: "200px", float: "left", width: "50%"}} onClick={() => onClick(0)}>&nbsp;</div>
        <div style={{height: "200px", float: "right", width: "50%"}} onClick={() => onClick(1)}>&nbsp;</div>
        <div style={{clear: "both"}}>&nbsp;</div>
    </div>;
}
