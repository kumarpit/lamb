# lamb(iguous)

<img width="322" alt="image" src="https://github.com/user-attachments/assets/1e9fa0bb-fd97-446b-a6b7-4b299387e714" />


A generalized backtracking search library for Javascript. This is inspired by John McCarthy's ambiguous operator (`amb`). The `amb` operator implements a system which is capable of automatically searching for a set of values bound to variables (henceforth called ambiguous variables) for which a set of constraints is satisfied. The operator and its example usages are describe in [Structure and Interpretation of Computer Programs (Chapter 4.3)](https://sarabander.github.io/sicp/html/4_002e3.xhtml#g_t4_002e3). 

`amb` provides a really simple, declarative interface for implementing search problems. `Lamb` aims to provide a similar interface for such problems in Javascript. 

## Usage 

Instantiate a new `Lamb` instance to begin specifying and solving problems.
```Javascript
let solver = new Lamb<number>();
```

Notice the type annotation. This specifies the type of values in your search space. You can pass in `any` to search through a non-homogeneous search space.
Let's implement a simple program that returns all pairs of numbers from the lists `[1, 2, 3, 4, 5]` and `[1, 2, 3, 4, 5]` such that their sum is `7`.

```Javascript
let solver = new Lamb<number>();

solver.addChoice("x", [1, 2, 3, 4, 5]);
solver.addChoice("y", [1, 2, 3, 4, 5]);
solver.addConstraint((vars) => vars.x + vars.y == 7);

solver.solve(1);
```

As you can see, the `addConstraint` function takes in a callback that gets a dict mapping the problem variables to some assignment of values.
