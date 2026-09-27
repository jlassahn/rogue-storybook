
import {Command} from "./ui.js";

// the ui is passed in instead of imported to make it easy to mock for testing
export function start(ui_ref, story_list)
{
	console.log("game::start starting");
	ui = ui_ref;
	stories = story_list;

	setup_menu();
	ui.set_command_callback(command_handler);
	ui.draw(game_ui);
}

var ui = null;
var stories = null;
var story_id = 0;

var game_state = null;

const game_ui =
{
	is_menu: true,
	menu:
	{
		choices: [
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			},
			{
				text: ""
			}
		],
		text: "",
		next: "Play"
	},

	game:
	{
		view_x: 31,
		view_y: 31,
		trim_x: 0,
		trim_y: 0,
		map_cells: null,
	}
};

function setup_menu()
{
	// FIXME handle lists longer than 7 by making menu entries for navigation
	for (var i=0; i<stories.length; i++)
	{
		game_ui.menu.choices[i].text = stories[i].name;
	}
	game_ui.menu.text = stories[0].description;
}

function setup_game()
{
	game_state = {}
	stories[story_id].generator(game_state);

	var mg = game_state.map_game;
	const start_map = mg.start.peer.map; // FIXME make accessor?
	start_map.unpack(game_ui.game);

	const player = game_state.player;
	const cell = game_ui.game.map_cells[player.map_x + 63*player.map_y];
	cell.creature = player;
}

function command_handler(cmd, param1, param2)
{
	console.log("command cmd="+cmd+" p1="+param1+" p2="+param2);
	if (cmd == Command.MENU_BUTTON)
		return menu_handler(cmd, param1, param2);

	if (cmd == Command.VIEW_CLICK)
		return view_click_handler(cmd, param1, param2);
}

function menu_handler(cmd, param1, param2)
{
	if (param1 == 110) // Play button
	{
		setup_game();
		game_ui.is_menu = false;
		ui.draw(game_ui);
		return false;
	}
}

function view_click_handler(cmd, param1, param2)
{
	const x = game_ui.game.view_x + param1;
	const y = game_ui.game.view_y + param2;

	const px = game_state.player.map_x;
	const py = game_state.player.map_y;

	// FIXME check if move is valid before moving
	// FIXME use steps for smooth animation of move
	game_ui.game.map_cells[px + 63*py].creature = null;

	game_ui.game.map_cells[x + 63*y].creature = game_state.player;
	game_state.player.map_x = x;
	game_state.player.map_y = y;
	game_ui.game.view_x = x;
	game_ui.game.view_y = y;

	ui.draw(game_ui);
}

