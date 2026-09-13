
import assert from "node:assert";
import * as map from "./map.js";

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
}

