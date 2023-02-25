import {StaticBlockContent} from "../../Util/StaticContent/StaticBlockContent";
import {StaticBlockContentView} from "../../Util/StaticContent/StaticBlockContentView";
import {Exercise, ExerciseProps} from "../ExerciseTypes";

export function makeDescriptionAnd(description: StaticBlockContent, Rest: Exercise): Exercise {
    return (props: ExerciseProps) => <div>
        <StaticBlockContentView content={description} />
        <Rest {...props} />
    </div>;
}