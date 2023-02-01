import {ToggleButton} from "@mui/material";
import {ButtonMatrixGrid} from "./ButtonMatrixGrid";
import {ButtonMatrixLabelSize} from "./ButtonMatrixLabelSize";

export type ToggleButtonMatrixElement = {
    label: (string|number);
};

export type ToggleButtonMatrixProps = {
    elements: ToggleButtonMatrixElement[];
    disabled: boolean;
    toggleState: boolean[];
    setToggleState: (state: boolean[]) => void;
    labelSize: ButtonMatrixLabelSize;
};

export function ToggleButtonMatrix({ elements, disabled, toggleState, setToggleState, labelSize }: ToggleButtonMatrixProps) {

    function onToggle(index: number) {
        const newToggleState = [...toggleState];
        newToggleState[index] = !newToggleState[index];
        setToggleState(newToggleState);
    }

    return <ButtonMatrixGrid labelSize={labelSize} elements={elements} bodyMapper={({label}, index, buttonStyles) =>
        <ToggleButton
            value={1}
            selected={toggleState[index]}
            onClick={() => onToggle(index)}
            disabled={disabled}
            style={{width: "100%"}}
            sx={buttonStyles}
        >
            {label}
        </ToggleButton>
    } />;
}
