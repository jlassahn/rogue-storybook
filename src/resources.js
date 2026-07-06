
export var data = {};

export function setup()
{
	console.log("resources::setup starting");

	return new Promise(load);
}

var loading_count = 0;
function load(resolve, reject)
{
	console.log("resources::load starting");

	//resolve("resource load done");
	reject("Resource loading failed");
}

/*
var assets_loading = 0;
function load_resources()
{
	console.log("load_resources starting");
	assets_loading = 1;

	const image = new Image(384, 512);
	image.onload = resource_done;
	image.onerror = resource_failed;
	image.src = "./data/tile00.png";
}
*/

