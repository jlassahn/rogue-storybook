
import * as ui from "./ui.js"

export function setup()
{
	console.log("game::setup starting");
	return new Promise(
		(resolve, reject) =>
		{
			resolve("game::setup done");
		}
	);
}


export function start()
{
	console.log("game::start starting");
	const game = null;
	ui.draw(game);
}

