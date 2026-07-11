
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
	]
};

function run_test()
{
	console.log("ui_test::run_test starting");
	ui.draw(game_data);
}

