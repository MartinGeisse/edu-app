import imagePurple from "./purple.svg";
import imageRed from "./red.svg";

export interface DictionaryEntryWithPicture {
    word: string;
    picture: string;
}

function entry(word: string, picture: string): DictionaryEntryWithPicture {
    return {word, picture};
}

export const dictionaryWithPictures: DictionaryEntryWithPicture[] = [
    entry("rot", imageRed),
    entry("lila", imagePurple),
];
