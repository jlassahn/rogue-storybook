
import assert from "node:assert";
import * as map from "./map.js";
import * as tile_info from "./tile_info.js";

function test_basic_cell_properties()
{
	var cell_id = tile_info.cells.BASIC_WALL;
	var flags = tile_info.flags.KNOWN | tile_info.flags.VISIBLE;
	var cell = new map.MapCell(cell_id, flags);

	assert.strictEqual(cell.map_color(), tile_info.map_colors.WALL);
	assert.deepStrictEqual(cell.low_tiles(), [tile_info.tile_ids.BASIC_WALL]);
	assert.deepStrictEqual(cell.high_tiles(), []);
	assert.strictEqual(cell.item, null);
	assert.strictEqual(cell.creature, null);

	cell.flags = 0;
	assert.strictEqual(cell.map_color(), tile_info.map_colors.UNKNOWN);
	assert.deepStrictEqual(cell.low_tiles(), [tile_info.tile_ids.BASIC_BLANK]);
	assert.deepStrictEqual(cell.high_tiles(), []);
	assert.strictEqual(cell.item, null);
	assert.strictEqual(cell.creature, null);

	cell_id = tile_info.cells.BASIC_FLOOR;
	flags = tile_info.flags.KNOWN | tile_info.flags.VISIBLE;
	cell = new map.MapCell(cell_id, flags);
	assert.strictEqual(cell.map_color(), tile_info.map_colors.FLOOR);
	assert.deepStrictEqual(cell.low_tiles(), [tile_info.tile_ids.BASIC_FLOOR]);
	assert.deepStrictEqual(cell.high_tiles(), []);
	assert.strictEqual(cell.item, null);
	assert.strictEqual(cell.creature, null);
}

export function test()
{
	test_basic_cell_properties();
}

