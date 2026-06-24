
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
	}
}

export class Link
{
	constructor()
	{
		this.peer = null;
	}

	connect(x)
	{
		this.peer = x;
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
	}
}

export class Map extends Place
{
	constructor(game)
	{
		super(game);
	}
}

export class SequenceMap extends Map
{
	constructor(game)
	{
		super(game);
		this.start = new Link();
		this.end = new Link();
	}
}

