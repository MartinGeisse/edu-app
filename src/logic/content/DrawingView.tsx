import {Drawing} from "./Drawing";
import {useEffect, useRef} from "react";

export type DrawingViewProps = {
    drawing: Drawing;
};

export function DrawingView(props: DrawingViewProps) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (ref.current) {
            const context = ref.current.getContext("2d");
            if (context) {
                props.drawing.elements.forEach(element => element.draw(context));
            }
        }
    }, [props.drawing.elements]);
    return <canvas ref={ref} width={100} height={100} />;
}
