export interface StaticInlineContentObjectBase {
    type: string;
}

export interface PlainTextStaticInlineContent {
    type: "plainText";
    text: string;
}

export interface SequenceStaticInlineContent {
    type: "sequence";
    elements: StaticInlineContent[];
}

export type StaticInlineContentObject = PlainTextStaticInlineContent | SequenceStaticInlineContent;
export type StaticInlineContent = string | StaticInlineContentObject | StaticInlineContent[];

export function shallowNormalizeStaticInlineContent(content: StaticInlineContent): StaticInlineContentObject {
    if (typeof content === "string") {
        return {type: "plainText", text: content};
    } else if ("length" in content) {
        return {type: "sequence", elements: content};
    } else {
        return content;
    }
}
