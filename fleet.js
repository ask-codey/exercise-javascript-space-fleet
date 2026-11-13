/*
 * Exercise: Space Fleet
 *
 * A fleet is a named group of ships, such as Red Squadron. Problems 6 and 7 finish it.
 *
 * Check your work with:   node --test
 * See the fleet at work:  node mission.js
 */

export class Fleet {
  // Ready to use: a fleet has a name and starts with no ships.
  constructor(name) {
    this.name = name;
    this.ships = [];
  }

  // Ready to use: adds a ship to the fleet and returns how many ships it has now.
  add(ship) {
    this.ships.push(ship);
    return this.ships.length;
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
