
import assert from "node:assert";
import * as game from "./game.js";
import {Command} from "./ui.js";

class MockUI
{
	constructor()
	{
		this.command_callback = null;
		this.mock_draw = null;
		this.mock_play_sound = null;
	}

	draw(gd)
	{
		check_ui_data(gd);
		if (this.mock_draw)
			this.mock_draw(gd);
		else
			assert.fail("unexpected call to draw");
		this.mock_draw = null;
	}

	play_sound(snd)
	{
		if (this.mock_play_sound)
			this.mock_play_sound(snd);
		else
			assert.fail("unexpected call to play_sound");
		this.mock_play_sound = null;
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

	set_mock_draw(fn)
	{
		this.mock_draw = fn;
	}

	set_mock_play_sound(fn)
	{
		this.mock_play_sound = fn;
	}

	end_mock()
	{
		assert.strictEqual(this.mock_draw, null);
		assert.strictEqual(this.mock_play_sound, null);
	}
};

function check_ui_data(gd)
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

function test_start_menu()
{
	const ui = new MockUI();

	var gamegen_done = false;

	function mock_gamegen(gs)
	{
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

	ui.mock_draw = function(gd)
	{
		assert.strictEqual(gd.is_menu, true);
		assert.strictEqual(gd.menu.choices[1].text, "");
		assert.strictEqual(gd.menu.choices[0].text, stories[0].name);
		assert.strictEqual(gd.menu.text, stories[0].description);
		assert.strictEqual(gd.menu.next, "Play");
	};
	game.start(ui, stories);
	ui.end_mock();

	ui.mock_draw = function(gd)
	{
		assert.strictEqual(gd.is_menu, false);
	};
	ui.command_callback(Command.MENU_BUTTON, 110, 0);
	ui.end_mock();
	assert.strictEqual(gamegen_done, true);
}

export function test()
{
	test_start_menu();
}

