import {Drawing} from "./Drawing";

export interface AtomContentObjectBase {
    type: string;
}

export interface PlainTextAtomContent {
    type: "plainText";
    text: string;
}

export interface SequenceAtomContent {
    type: "sequence";
    elements: AtomContent[];
}

export interface DrawingAtomContent {
    type: "drawing";
    drawing: Drawing;
}

export type AtomContentObject = PlainTextAtomContent | SequenceAtomContent | DrawingAtomContent;
export type AtomContent = string | AtomContentObject | AtomContent[];

export function normalizeAtomContent(content: AtomContent): AtomContentObject {
    if (typeof content === "string") {
        return {type: "plainText", text: content};
    } else if ("length" in content) {
        return {type: "sequence", elements: content};
    } else {
        return content;
    }
}
