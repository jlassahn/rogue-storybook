
export var data = {
	tiles: [],
	images: {
		banner: null
	}
};

const tile_files = [
	"../data/tile00.png",
	// "../data/tile01.png",
	// "../data/tile02.png",
];

var errors = [];
var resolver = null;
var rejecter = null;

export function setup()
{
	console.log("resources::setup starting");
	return new Promise(load);
}

var loading_count = 0;
function load(resolve, reject)
{
	console.log("resources::load starting");
	resolver = resolve;
	rejecter = reject;

	loading_count += tile_files.length;
	for (var i=0; i<tile_files.length; i++)
		data.tiles[i] = new Image(384, 512);

	loading_count ++;
	data.images.banner = new Image(960, 128);

	for (var i=0; i<tile_files.length; i++)
	{
		data.tiles[i].onload = resource_done;
		data.tiles[i].onerror = resource_failed;
		data.tiles[i].src = tile_files[i];
	}

	data.images.banner.onload = resource_done;
	data.images.banner.onerror = resource_failed;
	data.images.banner.src = "../data/banner.png";
}

function resource_done(err)
{
	console.log("resources::resource_done");
	loading_count --;
	if (loading_count <= 0)
		resource_complete();
}

function resource_failed(err)
{
	console.log("resources::resource_failed");
	errors.push("Failed image load: "+err.target.attributes.src.value);
	loading_count --;
	if (loading_count <= 0)
		resource_complete();
}

function resource_complete()
{
	if (errors.length > 0)
		rejecter(errors);
	else
		resolver("Resources done");
}

