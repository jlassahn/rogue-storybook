
import * as test_grid_functions from "./test_grid_functions.js";
import * as test_map_link from "./test_map_link.js";
import * as test_map_cell from "./test_map_cell.js";
import * as test_game from "./test_game.js";
import * as test_stories from "./test_stories.js";

export function test()
{
	test_grid_functions.test();
	test_map_link.test();
	test_map_cell.test();
	test_game.test();
	test_stories.test();
}

