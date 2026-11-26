# Exercise: Space Fleet

Exercise code for the lesson **Exercise: Space Fleet** in the JavaScript in Depth course on [ask-codey.com](https://www.ask-codey.com).

Red Squadron is the player's fleet in a space shooter game. You'll finish the classes behind it: a `Ship` that keeps its shields private and refuses bad fuel, a `Fighter` that extends `Ship` and fires missiles, and a `Fleet` that reports which ships can still fly, keeps its name fixed and locks its roster during a mission. Tests check every piece.

## What's here

- `ship.js`: the `Ship` class (problems 1 to 4), the `Freighter` class, and the start of the `Fighter` class (problem 5). The comment above each problem says what it should do, with examples. For you to finish. `Freighter` is ready to use: it's a worked example of a class that extends `Ship`.
- `fleet.js`: the `Fleet` class. Problem 6 is a method to finish, problem 7 is a method with a bug to fix, problem 8 fixes the fleet's name for good, and problem 9 locks the fleet's ships during a mission. For you to finish.
- `mission.js`: Red Squadron's mission log. It builds a fleet from your classes and prints what happens. Ready to use.
- `ship.test.js` and `fleet.test.js`: tests that use your classes. You don't need to change these.
- `package.json`: tells Node.js that this folder's files are modules, and how to run the tests. Ready to use.

## Run it

Open the folder in VS Code, then open its terminal with **Terminal > New Terminal**, and type:

```bash
node mission.js
```

The first time, it stops at the roll call with a `TypeError`. That's expected: it's the bug in problem 7. Once problems 5 and 7 are done, the whole mission log prints.

## Check your work

```bash
node --test
```

At first every test fails: that is expected. Each problem you solve turns its tests green. A failing test's message says which problem it is and what it expected, for example *Problem 3: a ship with 100 shields: takeHit(30) should return 70.*

## The rules

- Keep the shields in a private field, `#shields`. Code outside the class reads them through a getter and can't change them.
- Use `Ship.MAX_FUEL` for the size of the tank, not the number 100.
- `Fighter` extends `Ship`: let `Ship`'s constructor store the name, shields and fuel, and reuse `Ship`'s `describe` instead of writing its line again.
- Fix the fleet's name with `Object.defineProperty`, and lock its ships with `Object.freeze`.

## Tips

- After problem 1, the class reads `this.shields` in two places that are already written: `canFly` and `describe`. A getter named `shields` (problem 2) keeps both working.
- `Math.max(0, number)` gives you the bigger of the two, so it never goes below 0. `Math.min` does the same for a top limit.
- Look at `Freighter` before you write `Fighter`. They follow the same pattern: `super(...)` first, then the new property.
- In problem 7, ask yourself which object `this` is inside the function that `map` calls. One of the fixes from *Losing this, and How Arrow Functions Help* turns it back into the fleet.
- In problem 8, a property that `Object.defineProperty` makes new can't be changed or deleted, and isn't listed by `Object.keys` unless you say `enumerable: true`. *Locking an Object Down* shows how.
- In problem 9, `Object.isFrozen(this.ships)` tells `add` whether a mission has started.

## Hand it in

When it works, put your solution in a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. You don't need Git: create the repo on GitHub, choose **Add file**, then **Upload files**, and upload everything in this folder. The lesson page shows each step, and the lesson *Put Your Code on GitHub* walks through every screen.
