import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const secret = "010011011";

/**
 * Note: the trigger is hidden, not the menu per se. I just don't want it to clutter the UI and be opened accidentally.
 */
export function HiddenMenuTrigger() {
    const navigate = useNavigate();
    const inputHolder = useRef("");

    function onClick(index: number): void {
        inputHolder.current += index;
        inputHolder.current = inputHolder.current.substring(inputHolder.current.length - secret.length);
        if (inputHolder.current === secret) {
            navigate("/x/menu");
        }
    }

    return <div>
        <div style={{height: "200px"}} onClick={() => onClick(0)}>&nbsp;</div>
        <div style={{height: "200px"}} onClick={() => onClick(1)}>&nbsp;</div>
    </div>;
}