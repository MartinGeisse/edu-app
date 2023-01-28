import {Grid} from "@mui/material";
import {ReactNode} from "react";
import {ButtonMatrixLabelSize, buttonMatrixLabelSizeDescriptors} from "./ButtonMatrixLabelSize";

export type ButtonMatrixGridProps<T> = {
    elements: T[];
    bodyMapper: (element: T, index: number, buttonStyles: Record<string, unknown>) => ReactNode;
    labelSize: ButtonMatrixLabelSize;
};

export function ButtonMatrixGrid<T>({ elements, bodyMapper, labelSize }: ButtonMatrixGridProps<T>) {
    const { gridItemProperties, buttonStyles } = buttonMatrixLabelSizeDescriptors[labelSize];
    return <Grid container>
        {elements.map((element, index) =>
            <Grid item {...gridItemProperties} key={index} style={{marginTop: "5px"}} sx={{ padding: "5px" }}>
                {bodyMapper(element, index, buttonStyles)}
            </Grid>)
        }
    </Grid>;
}
