"use strict";
/**
 * Lamb(iguous)
 * A generalized backtracking search library
 *
 * https://github.com/kumarpit/lamb.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
/**
 * A generalized backtracking-based solver for constraint satisfaction problems
 * @template T The type of values that variables can take
 */
class Lamb {
    constructor() {
        this.choices = {};
        this.constraints = [];
        this.solutions = [];
    }
    /**
     * Adds a variable and its possible values to the problem
     * @param variable The name assigned to the variable
     * @param values The possible values this variable can take
     */
    addChoice(variable, values) {
        if (variable.trim() === "") {
            throw new error_1.InvalidVariableNameError(`Invalid variable name ${variable}: Variable names must be a non-empty string`);
        }
        if (this.choices.hasOwnProperty(variable)) {
            throw new error_1.DuplicateVariableError(`Variable ${variable} is already defined. Did you forget to clear Lamb state?`);
        }
        if (values.length === 0) {
            throw new error_1.EmptyChoicesError(`Encountered emtpy choices for ${variable}: Choices cannot be empty`);
        }
        this.choices[variable] = values;
    }
    /**
     * Adds a constraint to the problem
     * @param constraint A predicate function that recieves variable assignments and determines
     * if they satisfy some constraint
     */
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    /**
     * Solves the constraint-satisfaction problem using backtracking
     * @returns A list of all successful assignments
     */
    solve() {
        if (Object.keys(this.choices).length === 0) {
            throw new error_1.EmptyVariablesError("You must have atleast one variable defined to solve a problem");
        }
        this.solutions = [];
        this.backtrack({}, Object.keys(this.choices), 0);
        return this.solutions;
    }
    /**
     * Clears the state of the solver
     */
    clear() {
        this.choices = {};
        this.constraints = [];
        this.solutions = [];
    }
    /**
     * Orchestrates the backtracking search
     * @param assignment The current (possibly incomplete) assignment
     * @param variables The list of all variables involved in this problem
     * @param index How many variables have been assigned so far
     */
    backtrack(assignment, variables, index) {
        if (index === variables.length) {
            if (this.checkConstraints(assignment)) {
                this.solutions.push(Object.assign({}, assignment));
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
    checkConstraints(assignment) {
        const variables = Object.assign({}, assignment);
        for (let constraint of this.constraints) {
            if (!constraint(variables)) {
                return false;
            }
        }
        return true;
    }
}
exports.default = Lamb;
