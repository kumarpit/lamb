export type Constraint<T> = (vars: Record<string, T>) => boolean;
export interface Choices<T> {
    [variable: string]: T[];
}
export interface Assignment<T> {
    [variable: string]: T;
}
declare class AmbSolver<T> {
    private choices;
    private constraints;
    private solutions;
    addChoice(variable: string, values: T[]): void;
    addConstraint(constraint: Constraint<T>): void;
    solve(): Assignment<T>[];
    private backtrack;
    private checkConstraints;
}
export default AmbSolver;
