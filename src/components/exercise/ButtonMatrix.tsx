import {Button} from "@mui/material";
import {ButtonMatrixGrid} from "./ButtonMatrixGrid";
import {ButtonMatrixLabelSize} from "./ButtonMatrixLabelSize";

export type ButtonMatrixElement = {
    label: string;
    onClick: () => void;
};

export type ButtonMatrixProps = {
    elements: ButtonMatrixElement[];
    disabled: boolean;
    labelSize: ButtonMatrixLabelSize;
};

export function ButtonMatrix({ elements, disabled, labelSize }: ButtonMatrixProps) {
    return <ButtonMatrixGrid labelSize={labelSize} elements={elements} bodyMapper={({label, onClick}, _index, buttonStyles) =>
        <Button variant="contained" onClick={onClick} disabled={disabled} style={{width: "100%", ...buttonStyles}} sx={buttonStyles}>
            {label}
        </Button>
    } />;
}
