import {Exercise, ExerciseProps} from "../atom/Atom";

export function makeDescriptionAnd(description: string, Rest: Exercise): Exercise {
    return (props: ExerciseProps) => <div>
        <div>{description}</div>
        <Rest {...props} />
    </div>;
}