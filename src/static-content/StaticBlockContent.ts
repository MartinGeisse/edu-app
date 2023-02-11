import {StaticInlineContent} from "./StaticInlineContent";

export interface StaticBlockContentObjectBase {
    type: string;
}

export interface ParagraphStaticBlockContent {
    type: "paragraph";
    content: StaticInlineContent;
    align?: "left" | "right" | "center";
}

export interface SequenceStaticBlockContent {
    type: "sequence";
    elements: StaticBlockContent[];
}

export interface ImageStaticBlockContent {
    type: "image";
    image: string;
}

export type StaticBlockContentObject = ParagraphStaticBlockContent | SequenceStaticBlockContent | ImageStaticBlockContent;
export type StaticBlockContent = StaticBlockContentObject | StaticBlockContent[];

export function shallowNormalizeStaticBlockContent(content: StaticBlockContent): StaticBlockContentObject {
    if ("length" in content) {
        return {type: "sequence", elements: content};
    } else {
        return content;
    }
}
