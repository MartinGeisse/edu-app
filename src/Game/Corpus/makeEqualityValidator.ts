export function makeEqualityValidator(expected: string): (answer: string) => boolean {
    return (answer: string) => answer === expected;
}
