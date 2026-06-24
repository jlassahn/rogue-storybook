
import assert from "node:assert";
import * as map from "./map.js";

const map_game = new map.Game();

const start = new map.Link();
const end = new map.Link();

const map_sequence = new map.Sequence(map_game);
assert(map_sequence instanceof map.Group);
assert.strictEqual(map_game.places.length, 1);

start.connect(map_sequence.start);
assert.strictEqual(start.peer, map_sequence.start);
assert.strictEqual(start, map_sequence.start.peer);

end.connect(map_sequence.end);
assert.strictEqual(end.peer, map_sequence.end);
assert.strictEqual(end, map_sequence.end.peer);

map_sequence.choices =
[
	[map.SequenceMap],
	[map.SequenceMap],
	[map.SequenceMap],
	[map.SequenceMap]
];

map_sequence.generate();
assert.strictEqual(map_sequence.children.length, 4);
assert.strictEqual(map_game.places.length, 5);
assert.strictEqual(map_sequence.children[0].start.peer, start);
assert.strictEqual(map_sequence.children[0].start, start.peer);
assert.strictEqual(map_sequence.start.peer, null);

assert.strictEqual(map_sequence.children[0].end.peer, map_sequence.children[1].start);
assert.strictEqual(map_sequence.children[0].end, map_sequence.children[1].start.peer);

assert.strictEqual(map_sequence.children[1].end.peer, map_sequence.children[2].start);
assert.strictEqual(map_sequence.children[1].end, map_sequence.children[2].start.peer);

assert.strictEqual(map_sequence.children[2].end.peer, map_sequence.children[3].start);
assert.strictEqual(map_sequence.children[2].end, map_sequence.children[3].start.peer);

assert.strictEqual(map_sequence.children[3].end.peer, end);
assert.strictEqual(map_sequence.children[3].end, end.peer);
assert.strictEqual(map_sequence.end.peer, null);

