/*
 * Exercise: Space Fleet
 *
 * The ships of a space shooter game. Ship is the blueprint every ship shares;
 * Freighter and Fighter extend it.
 *
 * Problems 1 to 4 finish Ship, and problem 5 finishes Fighter.
 * Freighter is ready to use: it's a worked example of a class that extends Ship.
 *
 * Check your work with:   node --test
 * See the ships at work:  node mission.js
 */

export class Ship {
  // Ready to use: the most fuel any ship's tank holds. Read it as Ship.MAX_FUEL.
  static MAX_FUEL = 100;

  // 1. Keep the shields private, so no code outside the class can change them.
  //    Declare a private field named #shields here, and store the shields in it in the constructor.

  constructor(name, shields, fuel) {
    this.name = name;
    this.shields = shields;
    this.fuel = fuel;
  }

  // 2. Write a getter named shields that returns the private #shields,
  //    so other code can read ship.shields but can't change it.
  //
  //    new Ship("Comet", 80, 40).shields  ->  80

  /*
   * 3. Take a hit: lower the shields by the damage, but never below 0.
   *    Return the shields that are left.
   *
   *    A ship with 100 shields: takeHit(30) -> 70, then takeHit(50) -> 20, then takeHit(50) -> 0
   */
  takeHit(damage) {
    return 0;
  }

  /*
   * 4. Refuel: add the amount to the fuel, but never past Ship.MAX_FUEL. Return true.
   *    Refuse an amount less than 0: leave the fuel as it is and return false.
   *
   *    A ship with 40 fuel: refuel(25) -> true, fuel is 65
   *    A ship with 90 fuel: refuel(30) -> true, fuel is 100
   *    A ship with 40 fuel: refuel(-10) -> false, fuel is still 40
   */
  refuel(amount) {
    return false;
  }

  // Ready to use: a ship can fly while it has shields and fuel left.
  get canFly() {
    return this.shields > 0 && this.fuel > 0;
  }

  // Ready to use: one line about the ship, such as "Comet: shields 70, fuel 40".
  describe() {
    return `${this.name}: shields ${this.shields}, fuel ${this.fuel}`;
  }
}

// Ready to use: a worked example of a class that extends Ship.
export class Freighter extends Ship {
  constructor(name, shields, fuel, cargo) {
    super(name, shields, fuel);
    this.cargo = cargo;
  }

  // Unload some crates, but never more than the freighter carries. Returns how many came off.
  unload(crates) {
    const unloaded = Math.min(crates, this.cargo);
    this.cargo = this.cargo - unloaded;
    return unloaded;
  }

  // Overrides Ship's describe, and adds the cargo to the end of Ship's line.
  describe() {
    return `${super.describe()}, cargo ${this.cargo} crates`;
  }
}

/*
 * 5. Finish the Fighter class. A fighter is a ship with missiles.
 *
 *    - Its constructor takes (name, shields, fuel, missiles). Let Ship store the first three,
 *      then store the missiles.
 *    - fire(): a fighter fires only when it can fly and has a missile left. Firing uses one
 *      missile and returns "Vega fires! Missiles left: 1". Otherwise it returns "Vega can't fire"
 *      and keeps its missiles.
 *    - describe(): Ship's line with the missiles added: "Vega: shields 100, fuel 50, missiles 2".
 *
 *    const vega = new Fighter("Vega", 100, 50, 2);
 *    vega.fire()      ->  "Vega fires! Missiles left: 1"
 *    vega.describe()  ->  "Vega: shields 100, fuel 50, missiles 1"
 */
export class Fighter extends Ship {
}
