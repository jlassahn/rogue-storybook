
import assert from "node:assert";
import * as map from "./map.js";
import * as creature from "./creature.js";
import * as validators from "./test_validators.js"
import story_example from "./story_example.js"
import story_elements from "./story_elements.js"

function test_story(generator)
{
	var game_state = {};
	generator(game_state);
	validators.check_map_game(game_state.map_game);
	assert(game_state.player instanceof creature.Creature);
}

export function test()
{
	test_story(story_example);
	test_story(story_elements);
}

