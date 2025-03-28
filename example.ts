import Lamb from "./index";

let solver = new Lamb<number>();

// Simple example where we find all numbers such that x + y = 7
solver.addChoice("x", [1, 2, 3, 4, 5]);
solver.addChoice("y", [1, 2, 3, 4, 5]);
solver.addConstraint((vars) => vars.x + vars.y == 7);

let results = solver.solve();
results.forEach((assignment) => console.log(assignment));

solver.clear();
