import {StaticBlockContent} from "../../../Util/StaticContent/StaticBlockContent";
import {
    makeRadioLikeButtonMatrixFromTaggedAnswers
} from "../../../Exercise/Factory/makeRadioLikeButtonMatrixFromTaggedAnswers";
import {Atom} from "../../Atom/AtomTypes";

export function centeredText(text: string): StaticBlockContent {
    return {type: "paragraph", content: text, align: "center"};
}

export const noContent = centeredText("");

export function random(limit: number) {
    return Math.floor(Math.random() * limit);
}

export function radioTo(maxValue: number, expected: number, shuffle: boolean) {
    const taggedAnswers: [number, boolean][] = [];
    for (let i = 0; i <= maxValue; i++) {
        taggedAnswers.push([i, i === expected]);
    }
    return makeRadioLikeButtonMatrixFromTaggedAnswers(taggedAnswers, "veryShort", shuffle);
}

export function getAtomIds(atoms: (string | Atom)[]): string[] {
    return atoms.map(x => typeof x === "string" ? x : x.id);
}
