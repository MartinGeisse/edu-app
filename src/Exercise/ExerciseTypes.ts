import {ReactElement} from "react";

export interface ExerciseProps {
    disabled: boolean;
    reportResult: (correct: boolean) => void;
    goToNext: () => void;
}
export type Exercise = (props: ExerciseProps) => ReactElement;
export type ExerciseGenerator = () => Exercise;
