"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
let solver = new index_1.default();
// Simple example where we find all numbers such that x + y = 7
solver.addChoice("x", [1, 2, 3, 4, 5]);
solver.addChoice("y", [1, 2, 3, 4, 5]);
solver.addConstraint((vars) => vars.x + vars.y == 7);
let results = solver.solve(1);
results.forEach((assignment) => console.log(assignment));
solver.clear();
