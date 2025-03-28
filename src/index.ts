export type Constraint<T> = (vars: Record<string, T>) => boolean;

export interface Choices<T> {
    [variable: string]: T[];
}

export interface Assignment<T> {
    [variable: string]: T;
}

class Lamb<T> {
    private choices: Choices<T> = {};
    private constraints: Constraint<T>[] = [];
    private solutions: Assignment<T>[] = [];

    addChoice(variable: string, values: T[]): void {
        this.choices[variable] = values;
    }

    addConstraint(constraint: Constraint<T>): void {
        this.constraints.push(constraint);
    }

    solve(): Assignment<T>[] {
        this.solutions = [];
        this.backtrack({}, Object.keys(this.choices), 0);
        return this.solutions;
    }

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
