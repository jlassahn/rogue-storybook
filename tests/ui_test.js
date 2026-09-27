
import * as game from "../src/game.js"
import * as resources from "../src/resources.js"
import * as ui from "../src/ui.js"
import * as grid_functions from "../src/grid_functions.js";
import * as map from "../src/map.js";
import * as tile_info from "../src/tile_info.js";

console.log("Hello, this is the Rogue Storybook UI Test");

window.onload = setup;

function setup()
{
	console.log("ui_test::setup starting");
	ui.setup()
		.then(x => resources.setup())
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
		map_cells: null,
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
	const grid =
	{
		grid_dx: 63,
		grid_dy: 63,
		grid: new Uint16Array(63*63)
	};
	grid_functions.circle(grid, 31, 31, 30, 0x01);
	grid_functions.boundary(grid, 0x01, 0x02);
	grid_functions.clear(grid, 0x01);

	grid_functions.circle(grid, 46, 31, 9, 0x01);
	grid_functions.circle(grid, 16, 31, 9, 0x01);
	grid_functions.circle(grid, 31, 46, 9, 0x01);
	grid_functions.circle(grid, 31, 16, 9, 0x01);
	grid_functions.circle(grid, 31, 31, 4, 0x01);
	grid_functions.circle(grid, 5, 5, 4, 0x01);
	grid_functions.boundary(grid, 0x01, 0x02);
	//grid_functions.clear(grid, 0x01);

	game_data.game.map_cells = [];
	for (var i=0; i<63*63; i++)
	{
		const flags = tile_info.flags.KNOWN | tile_info.flags.VISIBLE;
		var cell_id = tile_info.cells.BASIC_BLANK;
		switch (grid.grid[i])
		{
			case 0:
				cell_id = tile_info.cells.BASIC_GROUND;
				break;
			case 1:
				cell_id = tile_info.cells.BASIC_FLOOR;
				break;
			case 2:
			case 3:
				cell_id = tile_info.cells.BASIC_WALL;
				break;
		}

		const cell = new map.MapCell(cell_id, flags);
		game_data.game.map_cells.push(cell);
	}
	game_data.game.map_cells[5 + 63*9].cell_id = tile_info.cells.BASIC_DOOR;
	game_data.game.map_cells[9 + 63*5].cell_id = tile_info.cells.BASIC_DOOR;
	game_data.game.map_cells[5 + 63*5].cell_id = tile_info.cells.BASIC_DOWN;
	game_data.game.map_cells[31 + 63*31].cell_id = tile_info.cells.BASIC_UP;

	const c0 = { trim_x: 0, trim_y: 0, tiles: [17]};
	game_data.game.map_cells[31 + 63*16].creature = c0;

	const c1 = { trim_x: -24, trim_y: -24, tiles: [17]};
	game_data.game.map_cells[30 + 63*15].creature = c1;

	const c2 = { trim_x: 0, trim_y: -24, tiles: [17]};
	game_data.game.map_cells[31 + 63*15].creature = c2;

	const c3 = { trim_x: 24, trim_y: -24, tiles: [17]};
	game_data.game.map_cells[32 + 63*15].creature = c3;

	const c4 = { trim_x: -24, trim_y: 0, tiles: [17]};
	game_data.game.map_cells[30 + 63*16].creature = c4;

	const c5 = { trim_x: 24, trim_y: 0, tiles: [17]};
	game_data.game.map_cells[32 + 63*16].creature = c5;

	const c6 = { trim_x: -24, trim_y: 24, tiles: [17]};
	game_data.game.map_cells[30 + 63*17].creature = c6;

	const c7 = { trim_x: 0, trim_y: 24, tiles: [17]};
	game_data.game.map_cells[31 + 63*17].creature = c7;

	const c8 = { trim_x: 24, trim_y: 24, tiles: [17]};
	game_data.game.map_cells[32 + 63*17].creature = c8;

	const pc = { trim_x: 0, trim_y: 0, tiles: [16]};
	game_data.game.map_cells[34 + 63*31].creature = pc;

	const item = {tiles: [8]};
	game_data.game.map_cells[28 + 63*31].item = item;
}

