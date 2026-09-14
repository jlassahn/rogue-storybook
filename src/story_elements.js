
import * as map from "./map.js";

export default function generator(gs)
{
	gs.map_game = new map.Game();

	const map_sequence = new map.Sequence(gs.map_game);
	map_sequence.choices =
	[
		[map.SequenceMap],
		[map.SequenceMap],
		[map.SequenceMap],
		[map.SequenceMap]
	];
	gs.map_game.set_top(map_sequence);

	gs.map_game.generate();
}

