export function noSpaceEquals(expected: string): (answer: string) => boolean {
    return (answer: string) => (answer.replace(" ", "") === expected);
}
