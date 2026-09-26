
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
		var size = 5;
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

		for (let j=0; j<4; j++)
		{
			dir = Math.floor(Math.random() * 16);
			x = 31;
			y = 31;
			for (let i=0; i<50; i++)
			{
				grid_functions.circle(grid, x, y, size, 0x01);
				const dx = dirs[dir][0];
				const dy = dirs[dir][1];

				if ((x+dx > 61-5)
				 || (x+dx < 1+5)
				 || (y+dy > 61-5)
				 || (y+dy < 1+5))
				{
					dir = Math.floor(Math.random() * 16);
				}
				else
				{
					x += dx;
					y += dy;
				}

				if ((size > 2) && (Math.random()<0.5))
					size --;
				if ((size < 5) && (Math.random()<0.5))
					size ++;

				const dd = Math.floor(Math.random() * 3) - 1;
				dir += dd;
				dir = dir & 15;
			}
		}
		grid_functions.boundary(grid, 0x01, 0x02);

		for (let i=0; i<63*63; i++)
		{
			if (grid.grid[i] == 0x01)
			{
				this.cell_ids[i] = 3;
				this.cell_flags[i] = 3;
			}
			if (grid.grid[i] == 0x03)
			{
				this.cell_ids[i] = 1;
				this.cell_flags[i] = 3;
			}
		}
	}
}

