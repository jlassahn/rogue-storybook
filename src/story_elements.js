
import * as map from "./map.js";
import * as grid_functions from "./grid_functions.js";

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
		[TunnelMap],
		[BlankMap],
		[BlankMap],
		[BlankMap]
	];
	gs.map_game.set_top(map_sequence);

	gs.map_game.generate();
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

class TunnelMap extends map.SequenceMap
{
	generate()
	{
		const grid =
		{
			grid_dx: 63,
			grid_dy: 63,
			grid: new Uint16Array(63*63)
		};

		var x = 31;
		var y = 31;
		var dir = 0;
		const dirs =
			[
			[1,0],
			[1,1],
			[1,1],
			[0,1],
			[0,1],
			[-1,1],
			[-1,1],
			[-1,0],
			[-1,0],
			[-1,-1],
			[-1,-1],
			[0,-1],
			[0,-1],
			[1,-1],
			[1,-1],
			[1,0]
			];

		for (let i=0; i<100; i++)
		{
			grid_functions.circle(grid, x, y, 5, 0x01);
			x += dirs[dir][0];
			y += dirs[dir][1];

			if (x > 61-5)
				x = 61-5;
			if (x < 1+5)
				x = 1+5;
			if (y > 61-5)
				y = 61-5;
			if (y < 1+5)
				y = 1+5;

			if (Math.random() < 0.5)
				dir ++;
			if (Math.random() < 0.5)
				dir --;
			dir = dir & 15;
		}


		for (let i=0; i<63*63; i++)
		{
			if (grid.grid[i] == 0x01)
			{
				this.cell_ids[i] = 3;
				this.cell_flags[i] = 3;
			}
		}
	}
}

