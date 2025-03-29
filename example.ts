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

type Node = keyof typeof adjacencyList; // "a" | "b" | "c" | "d" | "e" | "f"

Object.keys(adjacencyList).forEach(key => lamb2.addChoice(key, colors));

lamb2.addConstraint((vars) => {
    for (const key of Object.keys(adjacencyList)) {
        let keyColor = vars[key];
        let adjacentColors = adjacencyList[key as Node].map(v => vars[v]);
        if (adjacentColors.includes(keyColor)) return false;
    }
    return true;
});

let results2 = lamb2.solve(1);
console.log("A solution to the map coloring problem with 4 colors: ");
results2.forEach(assignment => console.log(assignment));
