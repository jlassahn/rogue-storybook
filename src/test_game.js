
import assert from "node:assert";
import * as game from "./game.js";
import * as map from "./map.js";
import * as validators from "./test_validators.js";
import {Command} from "./ui.js";
import story_example from "./story_example.js"

function record(obj, fn)
{

	var recorder = function(...args)
	{
		const ret = recorder.fn.apply(this, args);
		var d = {
			args: args,
			ret: ret
		};
		recorder.history.push(d);
		return ret;
	}

	recorder.fn = obj[fn];
	recorder.history = [];
	recorder.clear = function()
	{
		recorder.history = [];
	}

	obj[fn] = recorder;
}

class FakeUI
{
	constructor()
	{
		this.command_callback = null;
		this.last_gd = null;
	}

	draw(gd)
	{
		validators.check_ui_data(gd);
		this.last_gd = gd;
	}

	play_sound(snd)
	{
	}

	error_popup(err)
	{
		assert.fail("Error popup happened");
	}

	set_command_callback(fn)
	{
		assert.strictEqual(this.command_callback, null);
		this.command_callback = fn;
	}

	get_last_game_data()
	{
		return this.last_gd;
	}
};

function test_start_menu()
{
	const ui = new FakeUI();
	record(ui, "draw");

	var gamegen_done = false;

	function mock_gamegen(gs)
	{
		gs.map_game = new map.Game();
		const gm = new map.SequenceMap(gs.map_game);
		gs.map_game.start.connect(gm.start);
		gs.player = {
			map_x: 31,
			map_y: 31,
			tiles: []
		};
		gamegen_done = true;
	}

	const stories =
	[
		{
			name: "test story 1",
			description: "test description 1",
			generator: mock_gamegen
		}
	];

	ui.draw.clear();
	game.start(ui, stories);
	assert.strictEqual(ui.draw.history.length, 1);
	var gd = ui.draw.history[0].args[0];
	assert.strictEqual(gd.is_menu, true);
	assert.strictEqual(gd.menu.choices[1].text, "");
	assert.strictEqual(gd.menu.choices[0].text, stories[0].name);
	assert.strictEqual(gd.menu.text, stories[0].description);
	assert.strictEqual(gd.menu.next, "Play");

	ui.draw.clear();
	var ret = ui.command_callback(Command.MENU_BUTTON, 110, 0);
	assert.strictEqual(ret, false);
	assert.strictEqual(ui.draw.history.length, 1);
	gd = ui.draw.history[0].args[0];
	assert.strictEqual(gd.is_menu, false);

	assert.strictEqual(gamegen_done, true);
}

function test_move()
{
	const ui = new FakeUI();

	// create an example game, then send commands to move around it
	const stories =
	[
		{
			name: "Example",
			description: "Example",
			generator: story_example
		}
	];

	game.start(ui, stories);

	// select Play from main menu
	ui.command_callback(Command.MENU_BUTTON, 110, 0);
	var gd = ui.get_last_game_data();

	// check initial player position
	assert.strictEqual(gd.is_menu, false);
	assert.strictEqual(gd.game.view_x, 31);
	assert.strictEqual(gd.game.view_y, 31);
	var cell = gd.game.map_cells[31 + 63*31];
	assert.strictEqual(typeof cell.creature, "object");
	assert.notEqual(cell.creature, null);

	// move one diagonal step by clicking on the main view
	// VIEW_CLICK parameters are tile offsets from the map center
	var ret = ui.command_callback(Command.VIEW_CLICK, 1, 1);
	while (ret)
		ret = ui.command_callback(Command.STEP, 0, 0);
	gd = ui.get_last_game_data();
	assert.strictEqual(gd.game.view_x, 32);
	assert.strictEqual(gd.game.view_y, 32);
	cell = gd.game.map_cells[32 + 63*32];
	assert.notEqual(cell.creature, null);
	cell = gd.game.map_cells[31 + 63*31];
	assert.strictEqual(cell.creature, null);

}

export function test()
{
	test_start_menu();
	test_move();
}

