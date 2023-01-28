import {Button} from "@mui/material";
import {ButtonMatrixGrid} from "./ButtonMatrixGrid";

export type ButtonMatrixElement = {
    label: string;
    onClick: () => void;
};

export type ButtonMatrixProps = {
    elements: ButtonMatrixElement[];
    disabled: boolean;
};

export function ButtonMatrix({ elements, disabled }: ButtonMatrixProps) {
    return <ButtonMatrixGrid elements={elements} bodyMapper={({label, onClick}) =>
        <Button variant="contained" onClick={onClick} disabled={disabled} style={{width: "100%"}}>
            {label}
        </Button>
    } />;
}
