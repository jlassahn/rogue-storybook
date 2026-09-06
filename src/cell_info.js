
import * as ti from "./tile_info.js";

export const cells =
[
	{ // BASIC_BLANK
		color: ti.map_colors.UNKNOWN,
		low: [ti.tile_ids.BASIC_BLANK],
		high: []
	},
	{ //BASIC_WALL
		color: ti.map_colors.WALL,
		low: [ti.tile_ids.BASIC_WALL],
		high: []
	},
	{ //BASIC_FLOOR
		color: ti.map_colors.FLOOR,
		low: [ti.tile_ids.BASIC_FLOOR],
		high: []
	},
	{ //BASIC_GROUND
		color: ti.map_colors.FLOOR,
		low: [ti.tile_ids.BASIC_GROUND],
		high: []
	},
	{ //BASIC_DOOR
		color: ti.map_colors.DOOR,
		low: [ti.tile_ids.BASIC_BLANK], // FIXME
		high: []
	},
];

