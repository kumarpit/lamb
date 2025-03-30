import Lamb from "./index";

let lamb1 = new Lamb<number>();

//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Simple example where we want to find all pairs of numbers from the given lists that sum to 7 
//
//////////////////////////////////////////////////////////////////////////////////////////////////

lamb1.addChoice("x", [0, 1, 2, 3, 4]);
lamb1.addChoice("y", [5, 6, 7, 8, 9]);
lamb1.addConstraint((vars) => vars.x + vars.y == 8);

let results1 = lamb1.solve();
console.log("Pairs that sum to 7 from lists of 1..5: ");
results1.forEach(assignment => console.log(assignment));

console.log("\n");

//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Solving the graph coloring problem with 4 colors 
// Problem taken from https://www.metalevel.at/prolog/optimization
//
//////////////////////////////////////////////////////////////////////////////////////////////////

let lamb2 = new Lamb<string>();

const colors = ["red", "green", "blue", "yellow"];
let adjacencyList = {
    "a": ["b", "c", "d", "f"],
    "b": ["a", "c", "d"],
    "c": ["a", "b", "d", "e"],
    "d": ["a", "b", "c", "e", "f"],
    "e": ["c", "d", "f"],
    "f": ["a", "d", "e"]
}

type Node = keyof typeof adjacencyList; // "a" | "b" | "c" | "d" | "e" | "f "
const nodes = Object.keys(adjacencyList) as Node[];

// Add the same color choices for each node in the graph
nodes.forEach(node => lamb2.addChoice(node, colors));

// The only constraint we have is that each node must not share colors with its neighbours
lamb2.addConstraint((colors) =>
    !nodes.some(node =>
        adjacencyList[node].some(neighbour => colors[neighbour] === colors[node])
    )
);

let results2 = lamb2.solve(1);
console.log("A solution to the map coloring problem with 4 colors: ");
results2.forEach(assignment => console.log(assignment));

//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Solving the 8 Queens problem
//
//////////////////////////////////////////////////////////////////////////////////////////////////

let lamb3 = new Lamb<number>();

const N = 8;
for (let i = 0; i < N; i++) {
    lamb3.addChoice("col" + i, [...Array(N)].map((_, j) => j + 1));
}

lamb3.addConstraint((positions) => {
    return ![...Array(N)].some((_, i) =>
        [...Array(i)].some((_, j) =>
            positions["col" + i] === positions["col" + j] ||
            Math.abs(i - j) === Math.abs(positions["col" + i] - positions["col" + j])
        )
    )
});

let results = lamb3.solve();
results.forEach(position => console.log(position));
