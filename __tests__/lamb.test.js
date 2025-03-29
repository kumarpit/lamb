const Lamb = require("../lib/index").default;
const { DuplicateVariableError, EmptyChoicesError, EmptyVariablesError, InvalidNumSolutions, InvalidVariableNameError } = require("../lib/error");

describe("Lamb Constraint Solver", () => {
    let solver;

    beforeEach(() => {
        solver = new Lamb();
    });

    test("should add a variable with valid choices", () => {
        solver.addChoice("x", [1, 2, 3]);
        solver.addConstraint(vars => vars["x"] > 0);
        expect(solver.solve()).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
    });

    test("should throw error for empty variable name", () => {
        expect(() => solver.addChoice("", [1, 2, 3])).toThrow(InvalidVariableNameError);
    });

    test("should throw error for duplicate variable", () => {
        solver.addChoice("x", [1, 2, 3]);
        expect(() => solver.addChoice("x", [4, 5, 6])).toThrow(DuplicateVariableError);
    });

    test("should throw error for empty choices array", () => {
        expect(() => solver.addChoice("x", [])).toThrow(EmptyChoicesError);
    });

    test("should add constraints correctly", () => {
        const constraint = (vars) => vars["x"] % 2 === 0;
        solver.addConstraint(constraint);
        solver.addChoice("x", [1, 2, 3, 4]);
        expect(solver.solve()).toEqual([{ x: 2 }, { x: 4 }]);
    });

    test("should throw error if solve is called with no variables", () => {
        expect(() => solver.solve()).toThrow(EmptyVariablesError);
    });

    test("should throw error if solve is called with invalid numSolutions", () => {
        solver.addChoice("x", [1, 2, 3]);
        expect(() => solver.solve(0)).toThrow(InvalidNumSolutions);
    });

    test("should find valid solutions", () => {
        solver.addChoice("x", [1, 2, 3]);
        solver.addChoice("y", [4, 5, 6]);
        solver.addConstraint((vars) => vars["x"] + vars["y"] === 7);
        const solutions = solver.solve();
        expect(solutions).toEqual([
            { x: 1, y: 6 },
            { x: 2, y: 5 },
            { x: 3, y: 4 }
        ]);
    });

    test("should respect numSolutionsRequested", () => {
        solver.addChoice("x", [1, 2, 3]);
        solver.addChoice("y", [4, 5, 6]);
        solver.addConstraint((vars) => vars["x"] + vars["y"] === 7);
        const solutions = solver.solve(1);
        expect(solutions.length).toBe(1);
    });

    test("should clear solver state", () => {
        solver.addChoice("x", [1, 2, 3]);
        solver.addConstraint((vars) => vars["x"] > 1);
        solver.clear();
        expect(() => solver.solve()).toThrow(EmptyVariablesError);
    });
});
