/**
 * Lamb(iguous)
 * A generalized backtracking search library
 * 
 * https://github.com/kumarpit/lamb.js
 */


/**
 * Represents a constraint function that evaluates a set of variable assignments
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

    /**
     * Adds a variable and its possible values to the problem
     * @param variable The name assigned to the variable 
     * @param values The possible values this variable can take
     */
    addChoice(variable: string, values: T[]): void {
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
     * @returns A list of all successful assignments
     */
    solve(): Assignment<T>[] {
        this.solutions = [];
        this.backtrack({}, Object.keys(this.choices), 0);
        return this.solutions;
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
