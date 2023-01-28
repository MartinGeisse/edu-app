import {ToggleButton} from "@mui/material";
import {ButtonMatrixGrid} from "./ButtonMatrixGrid";

export type ToggleButtonMatrixElement = {
    label: string;
};

export type ToggleButtonMatrixProps = {
    elements: ToggleButtonMatrixElement[];
    disabled: boolean;
    toggleState: boolean[];
    setToggleState: (state: boolean[]) => void;
};

export function ToggleButtonMatrix({ elements, disabled, toggleState, setToggleState }: ToggleButtonMatrixProps) {

    function onToggle(index: number) {
        const newToggleState = [...toggleState];
        newToggleState[index] = !newToggleState[index];
        setToggleState(newToggleState);
    }

    return <ButtonMatrixGrid elements={elements} bodyMapper={({label}, index) =>
        <ToggleButton
            value={1}
            selected={toggleState[index]}
            onClick={() => onToggle(index)}
            disabled={disabled}
            style={{width: "100%"}}
        >
            {label}
        </ToggleButton>
    } />;
}
