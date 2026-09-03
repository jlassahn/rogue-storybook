
import * as game from "../src/game.js"
import * as resources from "../src/resources.js"
import * as ui from "../src/ui.js"
import * as grid_functions from "../src/grid_functions.js";

console.log("Hello, this is the Rogue Storybook UI Test");

window.onload = setup;

function setup()
{
	console.log("ui_test::setup starting");
	ui.setup()
		.then(x => resources.setup())
		.then(x => game.setup())
		.then(start)
		.catch(handle_setup_error);
	console.log("main:setup finished");
}

function start()
{
	console.log("ui_test::start starting");
	ui.final_setup();
	ui.set_command_callback(command_handler);
	run_test();
}

function handle_setup_error(err)
{
	ui.error_popup(err);
}


const game_data =
{
	is_menu: true,
	menu:
	{
		choices: [
			{
				text: "Menu Choice #1",
			},
			{
				text: "Menu Choice #2",
			},
			{
				text: "Menu Choice #3",
			},
			{
				text: "Menu Choice #4",
			},
			{
				text: "Menu Choice #5",
			},
			{
				text: "Menu Choice #6",
			},
			{
				text: "Menu Choice #7",
			}
		],
		text:
			"This is the main\n"+
			"menu text.  It gets\n"+
			"updated by the game\n"+
			"based on menu\n"+
			"selections.",
		next: "Play"
	},

	game:
	{
		view_x: 31,
		view_y: 31,
		trim_x: 0,
		trim_y: 0,
		grid_dx: 63,
		grid_dy: 63,
		grid: new Uint16Array(63*63),

		tiles: [
			{ tile: 2, is_wall: false },
			{ tile: 1, is_wall: false },
			{ tile: 0, is_wall: true },
			{ tile: 0, is_wall: true }
		]
	}
};

const local_state =
{
	view_dest_x: 31,
	view_dest_y: 31
};

function run_test()
{
	console.log("ui_test::run_test starting");
	set_up_map(game_data);
	ui.draw(game_data);
}

function command_handler(cmd, param1, param2)
{
	console.log("command cmd="+cmd+" p1="+param1+" p2="+param2);
	if ((cmd==ui.Command.MENU_BUTTON) && (param1 == 110))
	{
		game_data.is_menu = false;
		ui.draw(game_data);
		return false;
	}

	if (cmd == ui.Command.MAP_CLICK)
	{
		local_state.view_dest_x = param1;
		local_state.view_dest_y = param2;

		return move_update();
	}

	if (cmd == ui.Command.STEP)
	{
		return move_update();
	}
	return false;
}

function move_update()
{
	const step = 8;

	if (game_data.game.trim_x != 0)
	{
		if (game_data.game.view_x < local_state.view_dest_x)
		{
			game_data.game.trim_x += step;
			if (game_data.game.trim_x >= 48)
			{
				game_data.game.trim_x = 0;
				game_data.game.view_x ++;
			}
		}
		else
		{
			game_data.game.trim_x -= step;
		}
	}
	else if (game_data.game.view_x > local_state.view_dest_x)
	{
		game_data.game.view_x --;
		game_data.game.trim_x = 48 - step;
	}
	else if (game_data.game.view_x < local_state.view_dest_x)
	{
		game_data.game.trim_x += step;
	}


	if (game_data.game.trim_y != 0)
	{
		if (game_data.game.view_y < local_state.view_dest_y)
		{
			game_data.game.trim_y += step;
			if (game_data.game.trim_y >= 48)
			{
				game_data.game.trim_y = 0;
				game_data.game.view_y ++;
			}
		}
		else
		{
			game_data.game.trim_y -= step;
		}
	}
	else if (game_data.game.view_y > local_state.view_dest_y)
	{
		game_data.game.view_y --;
		game_data.game.trim_y = 48 - step;
	}
	else if (game_data.game.view_y < local_state.view_dest_y)
	{
		game_data.game.trim_y += step;
	}

	ui.draw(game_data);

	if ((game_data.game.view_x != local_state.view_dest_x)
	 || (game_data.game.view_y != local_state.view_dest_y)
	 || (game_data.game.trim_x != 0)
	 || (game_data.game.trim_y != 0))
	{
		return true;
	}
	return false;
}

function set_up_map(game_data)
{
	grid_functions.circle(game_data.game, 31, 31, 30, 0x01);
	grid_functions.boundary(game_data.game, 0x01, 0x02);
	grid_functions.clear(game_data.game, 0x01);

	grid_functions.circle(game_data.game, 46, 31, 9, 0x01);
	grid_functions.circle(game_data.game, 16, 31, 9, 0x01);
	grid_functions.circle(game_data.game, 31, 46, 9, 0x01);
	grid_functions.circle(game_data.game, 31, 16, 9, 0x01);
	grid_functions.circle(game_data.game, 31, 31, 4, 0x01);
	grid_functions.circle(game_data.game, 5, 5, 4, 0x01);
	grid_functions.boundary(game_data.game, 0x01, 0x02);
	//grid_functions.clear(game_data.game, 0x01);
}

