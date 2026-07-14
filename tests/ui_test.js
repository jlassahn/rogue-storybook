
import * as game from "../src/game.js"
import * as resources from "../src/resources.js"
import * as ui from "../src/ui.js"

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
	menu_choices: [
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
	menu_text:
		"This is the main\n"+
		"menu text.  It gets\n"+
		"updated by the game\n"+
		"based on menu\n"+
		"selections.",
	menu_next: "Play"
};

function run_test()
{
	console.log("ui_test::run_test starting");
	ui.draw(game_data);
}

function command_handler(cmd, param1, param2)
{
	console.log("command cmd="+cmd+" p1="+param1+" p2="+param2);
	if ((cmd==0) && (param1 == 110))
	{
		game_data.is_menu = false;
		ui.draw(game_data);
	}
	return false;
}

