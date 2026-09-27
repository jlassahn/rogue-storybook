
import * as map from "./map.js";
import * as grid_functions from "./grid_functions.js";
import * as creature from "./creature.js";

/*
	Stories create subclasses of Map for specific locations.
	The Map classes have generator functions which can call general
	layout and grid functions.
*/

export default function generator(gs)
{
	gs.map_game = new map.Game();

	const map_sequence = new map.Sequence(gs.map_game);
	map_sequence.choices =
	[
		[BlankMap],
		[BlankMap],
		[BlankMap],
		[BlankMap]
	];
	gs.map_game.set_top(map_sequence);

	gs.map_game.generate();

	gs.player = new creature.Creature();
	gs.player.map_x = 31;
	gs.player.map_y = 31;
	gs.player.tiles = [16];
}

class BlankMap extends map.SequenceMap
{
	generate()
	{
		for (var i=0; i<63*63; i++)
		{
			this.cell_ids[i] = 3;
			this.cell_flags[i] = 3;
		}
	}
}

