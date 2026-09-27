
import * as game from "./game.js"
import * as resources from "./resources.js"
import * as ui from "./ui.js"
import story_example from "./story_example.js"
import story_elements from "./story_elements.js"

console.log("Hello, this is Rogue Storybook");

window.onload = setup;

const stories = [
{
	name: "Example Game",
	description:
		"Maps showing various\n"+
		"features of the game\n"+
		"engine.",
	generator: story_example
},
{
	name: "Quest For The Elements",
	description:
		"Find the gems of the\n"+
		"five elements to bring\n"+
		"harmony to the world.",
	generator: story_elements
}

];

function setup()
{
	console.log("main::setup starting");
	ui.setup()
		.then(x => resources.setup())
		.then(start)
		.catch(handle_setup_error);
	console.log("main:setup finished");
}

function start()
{
	console.log("main::start starting");
	ui.final_setup();
	game.start(ui, stories);
}

function handle_setup_error(err)
{
	ui.error_popup(err);
}

