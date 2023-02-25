import {useEffect, useRef} from "react";

export function useEffectOnce(body: () => void | Promise<void>) {
    const ref = useRef(false);
    useEffect(() => {
        if (ref.current) {
            return;
        }
        ref.current = true;
        body();
    });
}
