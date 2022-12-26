
export interface DrawingElement {
    draw(context: CanvasRenderingContext2D): void;
}

export interface Drawing {
    elements: DrawingElement[];
}

export class Line implements DrawingElement {
    constructor(readonly x1: number, readonly y1: number, readonly x2: number, readonly y2: number) {}
    draw(context: CanvasRenderingContext2D) {
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
    }
}
