# lamb(iguous)

<img width="322" alt="image" src="https://github.com/user-attachments/assets/1e9fa0bb-fd97-446b-a6b7-4b299387e714" />
<br/>
<br/>

A generalized backtracking search library for Javascript. This is inspired by John McCarthy's ambiguous operator (`amb`). The `amb` operator implements a system which is capable of automatically searching for a set of values bound to variables (henceforth called ambiguous variables) for which a set of constraints is satisfied. The operator and its usage is described in [Structure and Interpretation of Computer Programs (Chapter 4.3)](https://sarabander.github.io/sicp/html/4_002e3.xhtml#g_t4_002e3). 

`amb` provides a really simple, declarative interface for implementing search problems. `Lamb` aims to provide a similar interface for such problems in Javascript. 

## Usage 

Instantiate a new `Lamb` instance to begin specifying and solving problems.
```Javascript
let lamb = new Lamb<number>();
```

Notice the type annotation. This specifies the type of values in your search space. You can pass in `any` to search through a non-homogeneous search space.
Let's implement a simple program that returns all pairs of numbers from the lists `[1, 2, 3, 4, 5]` and `[1, 2, 3, 4, 5]` such that their sum is `7`.

```Javascript
let lamb = new Lamb<number>();

lamb.addChoice("x", [1, 2, 3, 4, 5]);
lamb.addChoice("y", [1, 2, 3, 4, 5]);
lamb.addConstraint((vars) => vars.x + vars.y == 7);

lamb.solve(1);
```

A few points to note here:
- The `addConstraint` method takes in a callback that gets a dict mapping the problem variables to some assignment of values.
- The `solve` method optionally takes a positive integer as an argument that specifies the desired number of solutions. By default, if no such argument is provided, all solutions are returned.
- The `solve` method returns an array of dictionaries each representing valid assignments for the given constraints.

For a more sophisticated example, let's write a program to solve the map colouring problem (with 4 colors) for the following map taken from [here](https://www.metalevel.at/prolog/optimization).

<img width="413" alt="image" src="https://github.com/user-attachments/assets/51d371a0-e91a-45c7-942e-f0579d28a014" />

```Javascript
let lamb = new Lamb<string>();

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
nodes.forEach(node => lamb.addChoice(node, colors));

// The only constraint we have is that each node must not share colors with its neighbours
lamb.addConstraint((colors) =>
    !nodes.some(node =>
        adjacencyList[node].some(neighbour => colors[neighbour] === colors[node])
    )
);

lamb2.solve(1);
```

We represent the graph as a adjacency list, and for each node, we need add the same choice of colors. The only constraint we have is that each node must not have the same colors as its neighbours.

Finally, here is a program that solves the [8 queens problem](https://en.wikipedia.org/wiki/Eight_queens_puzzle):

```Javascript
let lamb = new Lamb<number>();

const N = 8;
for (let i = 0; i < N; i++) {
    // only assign columns since the row assignments are implicit (i.e must be 1, 2, 3,..., 8)
    lamb.addChoice("col" + i, [...Array(N)].map((_, j) => j + 1));
}

lamb.addConstraint((positions) =>
    ![...Array(N)].some((_, i) =>
        [...Array(i)].some((_, j) => // only check columns < i
            positions["col" + i] === positions["col" + j] || // same row?
            Math.abs(i - j) === Math.abs(positions["col" + i] - positions["col" + j]) // same diagonal?
        )
    )
);

lamb.solve(1);
```


Hopefully these examples were helpful in conveying the utility of Lamb. It is a really tiny library so feel free to explore the source code and make a PR if you find bugs or if you have any feature requests.





