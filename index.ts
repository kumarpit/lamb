/**
 * Lamb(iguous)
 * A generalized backtracking search library
 * 
 * https://github.com/kumarpit/lamb.js
 */

import { DuplicateVariableError, EmptyChoicesError, EmptyVariablesError, InvalidNumSolutions, InvalidVariableNameError } from './error';

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
class Lamb<T> {
    private choices: Choices<T> = {};
    private constraints: Constraint<T>[] = [];
    private solutions: Assignment<T>[] = [];
    private numSolutionsRequested: number | null = null;

    /**
     * Adds a variable and its possible values to the problem
     * @param variable The name assigned to the variable 
     * @param values The possible values this variable can take
     */
    addChoice(variable: string, values: T[]): void {
        if (variable.trim() === "") {
            throw new InvalidVariableNameError(`Invalid variable name ${variable}: Variable names must be a non-empty string`);
        }
        if (this.choices.hasOwnProperty(variable)) {
            throw new DuplicateVariableError(`Variable ${variable} is already defined. Did you forget to clear Lamb state?`);
        }
        if (values.length === 0) {
            throw new EmptyChoicesError(`Encountered emtpy choices for ${variable}: Choices cannot be empty`);
        }
        this.choices[variable] = values;
    }

    /**
     * Adds a constraint to the problem
     * @param constraint A predicate function that recieves variable assignments and determines
     * if they satisfy some constraint
     */
    addConstraint(constraint: Constraint<T>): void {
        this.constraints.push(constraint);
    }

    /**
     * Solves the constraint-satisfaction problem using backtracking
     * @param numSolutionsRequested Represents the number of solutions desired - by default the solver find 
     * all solutions
     * @returns A list of all successful assignments
     */
    solve(numSolutionsRequested?: number): Assignment<T>[] {
        if (Object.keys(this.choices).length === 0) {
            throw new EmptyVariablesError("You must have atleast one variable defined to solve a problem");
        }
        if (numSolutionsRequested !== undefined) {
            if (numSolutionsRequested <= 0) {
                throw new InvalidNumSolutions("You must request atleast 1 solution");
            }
            this.numSolutionsRequested = numSolutionsRequested;
        }
        this.solutions = [];
        this.backtrack({}, Object.keys(this.choices), 0);
        return this.solutions;
    }

    /**
     * Clears the state of the solver
     */
    clear(): void {
        this.choices = {};
        this.constraints = [];
        this.solutions = [];
        this.numSolutionsRequested = null;
    }

    /**
     * Orchestrates the backtracking search
     * @param assignment The current (possibly incomplete) assignment
     * @param variables The list of all variables involved in this problem
     * @param index How many variables have been assigned so far
     */
    private backtrack(assignment: Assignment<T>, variables: string[], index: number): void {
        if (index === variables.length) {
            if (this.checkConstraints(assignment)) {
                this.solutions.push({ ...assignment });
            }
            return;
        }

        const variable = variables[index];
        const possibleValues = this.choices[variable];

        for (let value of possibleValues) {
            assignment[variable] = value;
            this.backtrack(assignment, variables, index + 1);
            delete assignment[variable];

            if (this.numSolutionsRequested && this.solutions.length === this.numSolutionsRequested) {
                return;
            }
        }
    }

    /**
     * Checks if the current assignment satisfies all constraints
     * @param assignment The current (complete) assignment (i.e every variable has been assigned a value)
     * @returns true if all constraints are satisfied, else false
     */
    private checkConstraints(assignment: Assignment<T>): boolean {
        const variables: Record<string, T> = { ...assignment };
        for (let constraint of this.constraints) {
            if (!constraint(variables)) {
                return false;
            }
        }
        return true;
    }
}

export default Lamb;
