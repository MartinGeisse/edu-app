import {StaticBlockContent} from "../../Util/StaticContent/StaticBlockContent";
import {ExerciseGenerator} from "../../Exercise/ExerciseTypes";
import {ExerciseRules} from "./ExerciseRules";

export type Atom = {
    id: string;
    title: string;
    content: StaticBlockContent;
    exerciseGenerator: ExerciseGenerator;
    exerciseRules?: ExerciseRules;
    preconditionAtomIds: string[];
};
