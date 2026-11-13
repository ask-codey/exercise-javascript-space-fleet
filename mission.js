// Ready to use: Red Squadron's mission log. It builds a fleet from your classes and prints what happens.
// Run it with: node mission.js
import { Fighter, Freighter } from './ship.js';
import { Fleet } from './fleet.js';

const red = new Fleet('Red Squadron');
const comet = new Fighter('Comet', 100, 40, 3);
const vega = new Fighter('Vega', 60, 10, 1);
const mule = new Freighter('Mule One', 150, 30, 40);

red.add(comet);
red.add(vega);
console.log(`Ships in the fleet: ${red.add(mule)}`);

console.log('--- Roll call ---');
for (const line of red.rollCall()) {
  console.log(line);
}

console.log('--- Battle ---');
console.log(comet.fire());
console.log(vega.fire());
console.log(vega.fire());
console.log(`Vega takes a hit. Shields left: ${vega.takeHit(75)}`);
console.log(`Comet takes a hit. Shields left: ${comet.takeHit(30)}`);

console.log('--- Supply run ---');
console.log(`Mule One unloads ${mule.unload(15)} crates`);
console.log(`Mule One refuels -10: ${mule.refuel(-10) ? 'done' : 'refused'}`);
console.log(`Mule One refuels 90: ${mule.refuel(90) ? 'done' : 'refused'}`);

console.log('--- Status ---');
for (const ship of red.ships) {
  console.log(ship.describe());
}
console.log(`Ready to fly: ${red.readyToFly().join(', ')}`);
