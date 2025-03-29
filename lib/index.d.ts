/**
 * Lamb(iguous)
 * A generalized backtracking search library
 *
 * https://github.com/kumarpit/lamb.js
 */
/**
 * Represents a predicate function that evaluates a set of variable assignments against some constraint
 * @template T The type of values that variables can take
 * @param vars A record of variable names to their values
 * @returns true if the given assignment satisfies the constraint, else false
 */
export type Constraint<T> = (vars: Assignment<T>) => boolean;
/**
 * Represents the possible choices for any given variable
 * @template T The type of values that variables can take
 */
export interface Choices<T> {
    [variable: string]: T[];
}
/**
 * Represents an assignment for variables
 * @template T The type of values that variables can take
 */
export interface Assignment<T> {
    [variable: string]: T;
}
/**
 * A generalized backtracking-based solver for constraint satisfaction problems
 * @template T The type of values that variables can take
 */
declare class Lamb<T> {
    private choices;
    private constraints;
    private solutions;
    private numSolutionsRequested;
    /**
     * Adds a variable and its possible values to the problem
     * @param variable The name assigned to the variable
     * @param values The possible values this variable can take
     */
    addChoice(variable: string, values: T[]): void;
    /**
     * Adds a constraint to the problem
     * @param constraint A predicate function that recieves variable assignments and determines
     * if they satisfy some constraint
     */
    addConstraint(constraint: Constraint<T>): void;
    /**
     * Solves the constraint-satisfaction problem using backtracking
     * @param numSolutionsRequested Represents the number of solutions desired - by default the solver find
     * all solutions
     * @returns A list of all successful assignments
     */
    solve(numSolutionsRequested?: number): Assignment<T>[];
    /**
     * Clears the state of the solver
     */
    clear(): void;
    /**
     * Orchestrates the backtracking search
     * @param assignment The current (possibly incomplete) assignment
     * @param variables The list of all variables involved in this problem
     * @param index How many variables have been assigned so far
     */
    private backtrack;
    /**
     * Checks if the current assignment satisfies all constraints
     * @param assignment The current (complete) assignment (i.e every variable has been assigned a value)
     * @returns true if all constraints are satisfied, else false
     */
    private checkConstraints;
}
export default Lamb;
