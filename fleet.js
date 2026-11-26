/*
 * Exercise: Space Fleet
 *
 * A fleet is a named group of ships, such as Red Squadron. Problems 6 to 9 finish it.
 *
 * Check your work with:   node --test
 * See the fleet at work:  node mission.js
 */

export class Fleet {
  /*
   * 8. A fleet's name is fixed once the fleet is made. Other code can read it, and Object.keys
   *    lists it, but nothing can change it or delete it. Store the name with Object.defineProperty
   *    instead of this.name = name.
   *
   *    const red = new Fleet("Red Squadron");
   *    red.name                  ->  "Red Squadron"
   *    red.name = "Blue";        ->  TypeError (this file is a module, so it's in strict mode)
   *    Object.keys(red)          ->  ["name", "ships"]
   */
  constructor(name) {
    this.name = name;
    this.ships = [];
  }

  // Adds a ship to the fleet and returns how many ships it has now. Problem 9 changes it.
  add(ship) {
    this.ships.push(ship);
    return this.ships.length;
  }

  /*
   * 9. Once a mission starts, no ship can join or leave the fleet until it's over.
   *
   *    - startMission(): freeze the fleet's ships array, and return how many ships it has.
   *    - Then change add: while the ships array is frozen, add doesn't add the ship (pushing
   *      onto a frozen array would stop with a TypeError) and returns the count as it is.
   *
   *    Red Squadron with 3 ships: startMission() -> 3, then add(nova) -> 3, and red.ships.length is still 3
   */
  startMission() {
    return 0;
  }

  /*
   * 6. Return the names of the ships that can still fly, in the order they joined the fleet.
   *    Every ship has a canFly getter that answers true or false.
   *
   *    Comet (can fly), Vega (no shields left), Mule One (can fly)  ->  ["Comet", "Mule One"]
   *    A fleet with no ships  ->  []
   */
  readyToFly() {
    return [];
  }

  /*
   * 7. This method has a bug. It should return one line per ship, with the fleet's name in front:
   *
   *    ["Red Squadron: Comet", "Red Squadron: Vega", "Red Squadron: Mule One"]
   *
   *    Run node mission.js to see the error it gives, then fix it. Keep using map.
   */
  rollCall() {
    return this.ships.map(function (ship) {
      return `${this.name}: ${ship.name}`;
    });
  }
}
