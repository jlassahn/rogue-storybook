
import assert from "node:assert";
import * as map from "./map.js";
import * as tile_info from "./tile_info.js";

export function check_map_game(mg)
{
	assert(mg instanceof map.Game);

	assert(mg.top instanceof map.Group);
	assert(mg.places.includes(mg.top));

	assert(mg.start instanceof map.Link);
	assert(mg.start.peer.map instanceof map.Map);

	const start_map = mg.start.peer.map;
	assert(mg.places.includes(start_map));

	for (const p of mg.places)
	{
		assert(p instanceof map.Place);

		if (p instanceof map.Map)
		{
			check_map(p);
		}
	}
}

export function check_map(m)
{
	var valid_cells = 0;
	var visible_cells = 0;
	var known_cells = 0;
	for (var i=0; i<63*63; i++)
	{
		if (m.cell_ids[i] != 0)
			valid_cells ++;
		if (m.cell_flags[i] & tile_info.flags.KNOWN)
			known_cells ++;
		if (m.cell_flags[i] & tile_info.flags.VISIBLE)
			visible_cells ++;
	}
	assert(valid_cells > 0);
	assert(visible_cells > 0);
	assert(known_cells >= visible_cells);
}

export function check_ui_data(gd)
{
	assert.strictEqual(typeof gd.is_menu, "boolean");
	if (gd.is_menu)
	{
		assert.strictEqual(typeof gd.menu, "object");
		assert.strictEqual(typeof gd.menu.choices, "object");
		assert(Array.isArray(gd.menu.choices));
		assert.strictEqual(gd.menu.choices.length, 7);
		for (var i=0; i<7; i++)
		{
			const choice = gd.menu.choices[i];
			assert.strictEqual(typeof choice.text, "string");
		}
		assert.strictEqual(typeof gd.menu.text, "string");
		assert.strictEqual(typeof gd.menu.next, "string");
	}
	else
	{
		assert(Array.isArray(gd.game.map_cells));
	}
}

