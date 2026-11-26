// Tests for fleet.js: the Fleet class. Run them with: node --test
// You don't need to change this file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Fleet } from './fleet.js';

// Test ships: plain objects with a name and canFly, so these tests work even before your Ship class is finished.
const comet = { name: 'Comet', canFly: true };
const vega = { name: 'Vega', canFly: false };
const mule = { name: 'Mule One', canFly: true };

function redSquadron() {
  const red = new Fleet('Red Squadron');
  red.add(comet);
  red.add(vega);
  red.add(mule);
  return red;
}

test('problem 6: readyToFly lists the ships that can still fly', () => {
  assert.deepEqual(redSquadron().readyToFly(), ['Comet', 'Mule One'],
    'Problem 6: with Comet (can fly), Vega (can\'t) and Mule One (can fly), readyToFly() should return ["Comet", "Mule One"].');
  const blue = new Fleet('Blue Squadron');
  blue.add(vega);
  assert.deepEqual(blue.readyToFly(), [], 'Problem 6: a fleet whose only ship can\'t fly should return [].');
  assert.deepEqual(new Fleet('Empty').readyToFly(), [], 'Problem 6: a fleet with no ships should return [].');
});

test('problem 7: rollCall puts the fleet\'s name in front of every ship', () => {
  let lines;
  assert.doesNotThrow(() => { lines = redSquadron().rollCall(); },
    'Problem 7: rollCall() stops with an error. Which object is `this` inside the function that map calls?');
  assert.deepEqual(lines, ['Red Squadron: Comet', 'Red Squadron: Vega', 'Red Squadron: Mule One'],
    'Problem 7: rollCall() should return ["Red Squadron: Comet", "Red Squadron: Vega", "Red Squadron: Mule One"].');
});

test('problem 8: the fleet\'s name can be read and listed, but not changed or deleted', () => {
  const red = new Fleet('Red Squadron');
  const rules = Object.getOwnPropertyDescriptor(red, 'name');
  assert.equal(red.name, 'Red Squadron', 'Problem 8: new Fleet("Red Squadron").name should be "Red Squadron".');
  assert.equal(rules?.writable, false,
    'Problem 8: the name should not be writable. Store it with Object.defineProperty(this, "name", { ... }).');
  assert.equal(rules?.configurable, false, 'Problem 8: the name should not be deletable: leave configurable false.');
  assert.throws(() => { red.name = 'Blue Squadron'; }, TypeError,
    'Problem 8: red.name = "Blue Squadron" should be refused with a TypeError.');
  assert.equal(red.name, 'Red Squadron', 'Problem 8: after red.name = "Blue Squadron", the name should still be "Red Squadron".');
  assert.deepEqual(Object.keys(red), ['name', 'ships'],
    'Problem 8: Object.keys(fleet) should be ["name", "ships"]: give the name enumerable: true.');
});

test('problem 9: startMission freezes the ships and returns how many there are', () => {
  const red = redSquadron();
  assert.equal(red.startMission(), 3, 'Problem 9: Red Squadron with 3 ships: startMission() should return 3.');
  assert.ok(Object.isFrozen(red.ships), 'Problem 9: after startMission(), the ships array should be frozen.');
});

test('problem 9: during a mission, add leaves the fleet as it is', () => {
  const red = redSquadron();
  red.startMission();
  let count;
  assert.doesNotThrow(() => { count = red.add({ name: 'Nova', canFly: true }); },
    'Problem 9: add() during a mission should not stop with an error. Ask Object.isFrozen(this.ships) before pushing.');
  assert.equal(count, 3, 'Problem 9: during a mission, add(nova) should return 3, the count as it is.');
  assert.equal(red.ships.length, 3, 'Problem 9: during a mission, the fleet should still have 3 ships.');
});
