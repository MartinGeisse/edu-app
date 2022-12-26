// from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array (slightly reformatted)
export function shuffle<T>(array: T[]): T[] {
    let remaining = array.length;
    while (remaining > 0) {
        const index = Math.floor(Math.random() * remaining);
        remaining--;
        [array[remaining], array[index]] = [array[index], array[remaining]];
    }
    return array;
}
