import imageBlack from "./black.svg";
import imageBlue from "./blue.svg";
import imageBrown from "./brown.svg";
import imageCyan from "./cyan.svg";
import imageGreen from "./green.svg";
import imageOrange from "./orange.svg";
import imagePurple from "./purple.svg";
import imageRed from "./red.svg";
import imageYellow from "./yellow.svg";

export interface DictionaryEntryWithPicture {
    word: string;
    picture: string;
}

function entry(word: string, picture: string): DictionaryEntryWithPicture {
    return {word, picture};
}

export const dictionaryWithPictures: DictionaryEntryWithPicture[] = [
    entry("schwarz", imageBlack),
    entry("blau", imageBlue),
    entry("braun", imageBrown),
    entry("türkis", imageCyan),
    entry("grün", imageGreen),
    entry("orange", imageOrange),
    entry("lila", imagePurple),
    entry("rot", imageRed),
    entry("gelb", imageYellow),
];
