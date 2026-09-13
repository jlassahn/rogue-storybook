
import assert from "node:assert";
import * as map from "./map.js";
import story_elements from "./story_elements.js"
import * as validators from "./test_validators.js"

function test_story(generator)
{
	var game_state = {};
	generator(game_state);
	validators.check_map_game(game_state.map_game);
}

export function test()
{
	test_story(story_elements);
}

