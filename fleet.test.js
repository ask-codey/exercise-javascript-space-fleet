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
