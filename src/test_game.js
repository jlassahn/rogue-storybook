
import assert from "node:assert";
import * as game from "./game.js";
import * as map from "./map.js";
import * as validators from "./test_validators.js";
import {Command} from "./ui.js";

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
	}

	draw(gd)
	{
		validators.check_ui_data(gd);
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
	ui.command_callback(Command.MENU_BUTTON, 110, 0);
	assert.strictEqual(ui.draw.history.length, 1);
	gd = ui.draw.history[0].args[0];
	assert.strictEqual(gd.is_menu, false);

	assert.strictEqual(gamegen_done, true);
}

export function test()
{
	test_start_menu();
}

