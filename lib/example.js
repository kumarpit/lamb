"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
let solver1 = new index_1.default();
//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Simple example where we want to find all pairs of numbers from the given lists that sum to 7 
//
//////////////////////////////////////////////////////////////////////////////////////////////////
solver1.addChoice("x", [1, 2, 3, 4, 5]);
solver1.addChoice("y", [1, 2, 3, 4, 5]);
solver1.addConstraint((vars) => vars.x + vars.y == 7);
let results1 = solver1.solve();
console.log("Pairs that sum to 7 from lists of 1..5: ");
results1.forEach(assignment => console.log(assignment));
console.log("\n");
//////////////////////////////////////////////////////////////////////////////////////////////////
//
// Solving the graph coloring problem with 4 colors 
// Problem taken from https://www.metalevel.at/prolog/optimization
//
//////////////////////////////////////////////////////////////////////////////////////////////////
let solver2 = new index_1.default();
const colors = ["red", "green", "blue", "yellow"];
let adjacencyList = {
    "a": ["b", "c", "d", "f"],
    "b": ["a", "c", "d"],
    "c": ["a", "b", "d", "e"],
    "d": ["a", "b", "c", "e", "f"],
    "e": ["c", "d", "f"],
    "f": ["a", "d", "e"]
};
Object.keys(adjacencyList).forEach(key => solver2.addChoice(key, colors));
solver2.addConstraint((vars) => {
    for (const key of Object.keys(adjacencyList)) {
        let keyColor = vars[key];
        let adjacentColors = adjacencyList[key].map(v => vars[v]);
        if (adjacentColors.includes(keyColor))
            return false;
    }
    return true;
});
let results2 = solver2.solve(1);
console.log("A solution to the map coloring problem with 4 colors: ");
results2.forEach(assignment => console.log(assignment));
console.log("\n");
