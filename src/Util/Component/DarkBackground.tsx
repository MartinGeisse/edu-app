import {ReactNode} from "react";

export function DarkBackground({ children }: { children: ReactNode }) {
    return <div style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#aaa", overflow: "scroll"}}>
        {children}
    </div>;
}