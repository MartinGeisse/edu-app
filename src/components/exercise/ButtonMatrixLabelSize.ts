/**
 * veryShort: a single letter, other symbol, icon etc. -- generates a square button if possible.
 * short: a short single word, small number, very short formula, etc.
 * medium: a long single word, few short words, possibly large number, short to medium formula etc.
 * long: multiple words, medium-length formula, etc.
 * veryLong: A whole sentence. This typically generates a single button per row.
 *
 * Longer content than "veryLong" should not use a button matrix but text paragraphs with radio buttons.
 */
export type ButtonMatrixLabelSize = "veryShort" | "short" | "medium" | "long" | "veryLong";

export interface ButtonMatrixLabelSizeDescriptor {
    gridItemProperties: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    buttonStyles: Record<string, unknown>;
}

// TODO adjust these values
export const buttonMatrixLabelSizeDescriptors: Record<ButtonMatrixLabelSize, ButtonMatrixLabelSizeDescriptor> = {
    veryShort: {
        gridItemProperties: {
            xs: 2,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
        },
        buttonStyles: {
            minWidth: "0px",
        },
    },
    short: {
        gridItemProperties: {
            xs: 6,
            sm: 4,
            md: 3,
            lg: 2,
            xl: 1,
        },
        buttonStyles: {
        },
    },
    medium: {
        gridItemProperties: {
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 2,
        },
        buttonStyles: {
        },
    },
    long: {
        gridItemProperties: {
            xs: 12,
            sm: 12,
            md: 6,
            lg: 4,
            xl: 3,
        },
        buttonStyles: {
        },
    },
    veryLong: {
        gridItemProperties: {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
        },
        buttonStyles: {
        },
    },
};
