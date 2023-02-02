import {ReactElement} from "react";
import {StaticBlockContent} from "../static-content/StaticBlockContent";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// exercise content
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface ExerciseProps {
    disabled: boolean;
    reportResult: (correct: boolean) => void;
    goToNext: () => void;
}
export type Exercise = (props: ExerciseProps) => ReactElement;
export type ExerciseGenerator = () => Exercise;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// exercise rules and scoring
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ExerciseRules = {
    correctScore?: number; // default: 1
    incorrectPenalty?: number; // default: 2
    targetScore?: number; // default: 10
};

export type MaterializedExerciseRules = {
    correctScore: number;
    incorrectPenalty: number;
    targetScore: number;
};

export const defaultExerciseRules: MaterializedExerciseRules = {
    correctScore: 1,
    incorrectPenalty: 2,
    targetScore: 20,
};

export function materializeExerciseRules(rules: ExerciseRules | undefined): MaterializedExerciseRules {
    return {
        ...defaultExerciseRules,
        ...rules
    };
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// atoms
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type Atom = {
    id: string;
    title: string;
    content: StaticBlockContent;
    exerciseGenerator: ExerciseGenerator;
    exerciseRules?: ExerciseRules;
    preconditionAtomIds: string[];
};
