export function makeIntegerComplexValidator(real: number, imaginary: number): (answer: string) => boolean {
    return (answer: string) => {
        answer = answer.replace(" ", "");
        let match = answer.match(/(\d+)\+(\d+)i/);
        if (match) {
            return (parseInt(match[1]) === real) && (parseInt(match[2]) === imaginary);
        }
        match = answer.match(/(\d+)i\+(\d+)/);
        if (match) {
            return (parseInt(match[2]) === real) && (parseInt(match[1]) === imaginary);
        }
        match = answer.match(/(\d+)/);
        if (match) {
            return (parseInt(match[1]) === real) && (imaginary === 0);
        }
        match = answer.match(/(\d+)i/);
        if (match) {
            return (parseInt(match[1]) === imaginary) && (real === 0);
        }
        return false;
    };
}
