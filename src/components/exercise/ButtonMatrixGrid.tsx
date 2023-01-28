import {Grid} from "@mui/material";
import {ReactNode} from "react";

export type ButtonMatrixGridProps<T> = {
    elements: T[];
    bodyMapper: (element: T, index: number) => ReactNode;
};

export function ButtonMatrixGrid<T>({ elements, bodyMapper }: ButtonMatrixGridProps<T>) {
    return <Grid container>
        {elements.map((element, index) => <Grid item xs={12} sm={6} md={3} key={index} style={{marginTop: "5px"}}>
            {bodyMapper(element, index)}
        </Grid>)}
    </Grid>;
}
