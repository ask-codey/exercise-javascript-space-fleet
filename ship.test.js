// Tests for ship.js: the Ship and Fighter classes. Run them with: node --test
// You don't need to change this file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as ships from './ship.js';

const { Ship } = ships;

// Makes a Fighter, and says so plainly when the class isn't finished yet (problem 5).
function fighter(...details) {
  assert.equal(typeof ships.Fighter, 'function', 'Problem 5: ship.js should export a class named Fighter.');
  return new ships.Fighter(...details);
}

test('problem 1: the shields are in a private #shields field', () => {
  const comet = new Ship('Comet', 80, 40);
  assert.ok(!Object.hasOwn(comet, 'shields'),
    'Problem 1: the ship still has a public shields property. Store the shields in a private #shields field instead.');
  const source = readFileSync(new URL('./ship.js', import.meta.url), 'utf8');
  assert.match(source, /#shields\s*[;=]/, 'Problem 1: declare the private field at the top of the class: #shields;');
});

test('problem 2: the shields getter reads the private shields', () => {
  const getter = Object.getOwnPropertyDescriptor(Ship.prototype, 'shields')?.get;
  assert.equal(typeof getter, 'function', 'Problem 2: write a getter for the shields: get shields() { ... }');
  assert.equal(new Ship('Comet', 80, 40).shields, 80, 'Problem 2: new Ship("Comet", 80, 40).shields should be 80.');
});

test('problem 2: code outside the class can read the shields but not change them', () => {
  const comet = new Ship('Comet', 80, 40);
  assert.throws(() => { comet.shields = 999; }, TypeError,
    'Problem 2: comet.shields = 999 should be refused. Give the shields a getter and no setter.');
  assert.equal(comet.shields, 80, 'Problem 2: the shields should still be 80 after comet.shields = 999.');
});

test('problem 3: takeHit lowers the shields and returns what is left', () => {
  const comet = new Ship('Comet', 100, 40);
  assert.equal(comet.takeHit(30), 70, 'Problem 3: a ship with 100 shields: takeHit(30) should return 70.');
  assert.equal(comet.takeHit(50), 20, 'Problem 3: then takeHit(50) should return 20.');
  assert.equal(comet.shields, 20, 'Problem 3: after those two hits, comet.shields should be 20.');
});

test('problem 3: takeHit never takes the shields below 0', () => {
  const comet = new Ship('Comet', 20, 40);
  assert.equal(comet.takeHit(50), 0, 'Problem 3: a ship with 20 shields: takeHit(50) should return 0, not a negative number.');
  assert.equal(comet.shields, 0, 'Problem 3: after takeHit(50), the shields should be 0.');
  assert.equal(comet.canFly, false, 'Problem 3: a ship with no shields left can no longer fly.');
});

test('problem 4: refuel adds fuel and returns true', () => {
  const comet = new Ship('Comet', 100, 40);
  assert.equal(comet.refuel(25), true, 'Problem 4: a ship with 40 fuel: refuel(25) should return true.');
  assert.equal(comet.fuel, 65, 'Problem 4: after refuel(25), a ship that had 40 fuel should have 65.');
});

test('problem 4: refuel never fills past Ship.MAX_FUEL', () => {
  const comet = new Ship('Comet', 100, 90);
  assert.equal(comet.refuel(30), true, 'Problem 4: a ship with 90 fuel: refuel(30) should return true.');
  assert.equal(comet.fuel, 100, 'Problem 4: a ship with 90 fuel, after refuel(30), should have 100: Ship.MAX_FUEL.');
});

test('problem 4: refuel refuses an amount less than 0', () => {
  const comet = new Ship('Comet', 100, 40);
  assert.equal(comet.refuel(-10), false, 'Problem 4: refuel(-10) should return false.');
  assert.equal(comet.fuel, 40, 'Problem 4: after refuel(-10), the fuel should still be 40.');
  assert.equal(comet.refuel(10), true, 'Problem 4: after refusing -10, refuel(10) should still work and return true.');
  assert.equal(comet.fuel, 50, 'Problem 4: after refuel(-10) and then refuel(10), a ship that had 40 fuel should have 50.');
});

test('problems 1 to 3: describe still works with the private shields', () => {
  const comet = new Ship('Comet', 100, 40);
  comet.takeHit(30);
  assert.equal(comet.describe(), 'Comet: shields 70, fuel 40',
    'Problems 1 to 3: after takeHit(30), a ship with 100 shields and 40 fuel should describe itself as "Comet: shields 70, fuel 40".');
});

test('problem 5: a Fighter is a Ship with missiles', () => {
  const vega = fighter('Vega', 100, 50, 2);
  assert.ok(vega instanceof Ship, 'Problem 5: Fighter should extend Ship.');
  assert.equal(vega.name, 'Vega', 'Problem 5: pass the name, shields and fuel on to Ship with super(...).');
  assert.equal(vega.shields, 100, 'Problem 5: new Fighter("Vega", 100, 50, 2).shields should be 100.');
  assert.equal(vega.fuel, 50, 'Problem 5: new Fighter("Vega", 100, 50, 2).fuel should be 50.');
  assert.equal(vega.missiles, 2, 'Problem 5: store the missiles: new Fighter("Vega", 100, 50, 2).missiles should be 2.');
});

test('problem 5: fire uses a missile', () => {
  const vega = fighter('Vega', 100, 50, 2);
  assert.equal(vega.fire(), 'Vega fires! Missiles left: 1',
    'Problem 5: a fighter with 2 missiles: fire() should return "Vega fires! Missiles left: 1".');
  assert.equal(vega.fire(), 'Vega fires! Missiles left: 0', 'Problem 5: firing again should return "Vega fires! Missiles left: 0".');
  assert.equal(vega.missiles, 0, 'Problem 5: after firing twice, a fighter that had 2 missiles has 0.');
});

test('problem 5: a fighter with no missiles left can\'t fire', () => {
  const vega = fighter('Vega', 100, 50, 0);
  assert.equal(vega.fire(), "Vega can't fire", 'Problem 5: with 0 missiles, fire() should return "Vega can\'t fire".');
  assert.equal(vega.missiles, 0, 'Problem 5: with 0 missiles, the missiles should stay at 0, not go below it.');
});

test('problem 5: a fighter that can\'t fly can\'t fire', () => {
  const vega = fighter('Vega', 0, 50, 3);
  assert.equal(vega.fire(), "Vega can't fire",
    'Problem 5: a fighter with 0 shields can\'t fly, so fire() should return "Vega can\'t fire".');
  assert.equal(vega.missiles, 3, 'Problem 5: a fighter that can\'t fire keeps its missiles.');
});

test('problem 5: describe adds the missiles to Ship\'s line', () => {
  const vega = fighter('Vega', 100, 50, 2);
  assert.equal(vega.describe(), 'Vega: shields 100, fuel 50, missiles 2',
    'Problem 5: new Fighter("Vega", 100, 50, 2).describe() should return "Vega: shields 100, fuel 50, missiles 2".');
});
