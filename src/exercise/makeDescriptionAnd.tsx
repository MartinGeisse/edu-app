import {Exercise, ExerciseProps} from "../atom/Atom";
import {StaticBlockContent} from "../static-content/StaticBlockContent";
import {StaticBlockContentView} from "../static-content/StaticBlockContentView";

export function makeDescriptionAnd(description: StaticBlockContent, Rest: Exercise): Exercise {
    return (props: ExerciseProps) => <div>
        <StaticBlockContentView content={description} />
        <Rest {...props} />
    </div>;
}