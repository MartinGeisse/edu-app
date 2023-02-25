import {ButtonMatrix} from "../Component/ButtonMatrix";
import {ButtonMatrixLabelSize} from "../Component/ButtonMatrixLabelSize";
import {shuffle} from "../../Util/shuffle";
import {Exercise, ExerciseProps} from "../ExerciseTypes";

export function makeRadioLikeButtonMatrixFromTaggedAnswers(
    taggedAnswers: [(string|number), boolean][],
    labelSize: ButtonMatrixLabelSize,
    shuffleAnswers: boolean,
): Exercise {
    if (shuffleAnswers) {
        taggedAnswers = shuffle([...taggedAnswers]);
    }
    return (props: ExerciseProps) => {
        return <div>
            <ButtonMatrix disabled={props.disabled} labelSize={labelSize} elements={taggedAnswers.map(taggedAnswer => ({
                label: taggedAnswer[0],
                onClick: () => props.reportResult(taggedAnswer[1]),
            }))} />
        </div>
    }
}
