
import * as tile_info from "./tile_info.js";
import * as cell_info from "./cell_info.js";

function select_random(seq)
{
	const i = Math.floor(Math.random() * seq.length);
	return seq[i];
}

export class Game
{
	constructor()
	{
		this.places = [];
		this.top = null;
		this.start = new Link();
	}

	set_top(grp)
	{
		this.top = grp;
		this.start.connect(grp.start);
	}

	generate()
	{
		this.top.generate();
	}
}

export class Link
{
	constructor()
	{
		this.peer = null;
		this.map = null;
	}

	connect(x)
	{
		this.peer = x;
		if (x)
			x.peer = this;
	}

	claim(x)
	{
		let peer = x.peer;
		x.peer = null;
		this.connect(peer);
	}
}

export class Place
{
	constructor(game)
	{
		this.game = game;
		game.places.push(this);
	}
}

export class Group extends Place
{
	constructor(game)
	{
		super(game);
		this.children = [];
	}

	generate()
	{
		const len = this.children.length;
		for (let i=0; i<len; i++)
		{
			this.children[i].generate();
		}
	}
}

export class Sequence extends Group
{
	constructor(game)
	{
		super(game);
		this.start = new Link();
		this.end = new Link();
		this.choices = null;
	}

	generate()
	{
		const len = this.choices.length;
		for (const n of this.choices)
		{
			let cls = select_random(n);
			let child = new cls(this.game);
			this.children.push(child);
		}

		for (let i=1; i<len; i++)
		{
			this.children[i-1].end.connect(this.children[i].start);
		}

		this.children[0].start.claim(this.start);
		this.children[len - 1].end.claim(this.end);

		super.generate();
	}
}

export class Map extends Place
{
	constructor(game)
	{
		super(game);
		this.cell_ids = new Uint16Array(63*63);
		this.cell_flags = new Uint16Array(63*63);
	}

	generate()
	{
	}

	unpack(ui_game)
	{
		var cells = [];
		for (var i=0; i<63*63; i++)
		{
			const cell = new MapCell(this.cell_ids[i], this.cell_flags[i]);
			cells.push(cell);
		}
		ui_game.map_cells = cells;
	}
}

export class SequenceMap extends Map
{
	constructor(game)
	{
		super(game);
		this.start = new Link();
		this.start.map = this;
		this.end = new Link();
		this.end.map = this;
	}
}

export class MapCell
{
	// FIXME what about timed effects?
	constructor(cell_id, flags)
	{
		this.cell_id = cell_id;
		this.flags = flags;
		this.item = null;
		this.creature = null;
	}

	map_color()
	{
		if ((this.flags & tile_info.flags.KNOWN) == 0)
			return tile_info.map_colors.UNKNOWN;
		const ci = cell_info.cells[this.cell_id];
		return ci.color;
	}

	low_tiles()
	{
		if ((this.flags & tile_info.flags.KNOWN) == 0)
			return [tile_info.tile_ids.BASIC_BLANK];
		const ci = cell_info.cells[this.cell_id];
		return ci.low;
	}

	high_tiles()
	{
		if ((this.flags & tile_info.flags.KNOWN) == 0)
			return [];
		const ci = cell_info.cells[this.cell_id];
		return ci.high;
	}

}

