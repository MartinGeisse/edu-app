export type ExerciseRules = {
    correctScore?: number; // default: 1
    incorrectPenalty?: number; // default: 2
    targetScore?: number; // default: 10
};

export type MaterializedExerciseRules = {
    correctScore: number;
    incorrectPenalty: number;
    targetScore: number;
};

export const defaultExerciseRules: MaterializedExerciseRules = {
    correctScore: 1,
    incorrectPenalty: 2,
    targetScore: 20,
};

export function materializeExerciseRules(rules: ExerciseRules | undefined): MaterializedExerciseRules {
    return {
        ...defaultExerciseRules,
        ...rules
    };
}
