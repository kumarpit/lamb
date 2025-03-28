"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AmbSolver {
    constructor() {
        this.choices = {};
        this.constraints = [];
        this.solutions = [];
    }
    addChoice(variable, values) {
        this.choices[variable] = values;
    }
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    solve() {
        this.solutions = [];
        this.backtrack({}, Object.keys(this.choices), 0);
        return this.solutions;
    }
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
exports.default = AmbSolver;
