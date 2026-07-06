
import * as game from "./game.js"
import * as resources from "./resources.js"
import * as ui from "./ui.js"

console.log("Hello, this is Rogue Storybook");

window.onload = setup;

function setup()
{
	console.log("main::setup starting");
	ui.setup()
		.then(x => resources.setup())
		.then(x => game.setup())
		.then(start)
		.catch(handle_setup_error);
	console.log("main:setup finished");
}

function start()
{
	console.log("main::start starting");
	ui.hide_splash();
	game.start();
}

function handle_setup_error(err)
{
	ui.error_popup(err);
}

