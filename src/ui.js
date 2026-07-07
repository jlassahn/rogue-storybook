
import * as resources from "./resources.js"

const ui_elements = {
	popup: null,
	menu: null,
	game: null,
	view: null,
	map: null,
	usables: [],
	inventory: null,
	wearables: [],
};

function make_el(kind, parent, width, height, left, top)
{
	const el = document.createElement(kind);
	el.style.position = "absolute";
	el.style.width = width;
	el.style.height = height;
	el.style.left = left;
	el.style.top = top;
	parent.appendChild(el);

	return el;
}

export function setup()
{
	console.log("ui::setup starting");

	const root = document.getElementById("rogue_top");
	ui_elements.popup = make_el("div", root, "50%", "50%", "25%", "25%");
	ui_elements.menu = make_el("div", root, "100%", "100%", "0%", "0%");
	ui_elements.game = make_el("div", root, "100%", "100%", "0%", "0%");
	ui_elements.view = make_el("canvas", ui_elements.game, "66.66667%", "100%", "0%", "0%");
	ui_elements.map = make_el("canvas", ui_elements.game, "30%", "45%", "68%", "3%");
	for (var i=0; i<7; i++)
	{
		const x = (66.85+i*4.75).toString() + "%";
		const el = make_el("canvas", ui_elements.game,
			"4.44444%", "6.66666%", x, "75%");
		ui_elements.usables.push(el);
	}
	for (var i=0; i<7; i++)
	{
		const x = (66.85+i*4.75).toString() + "%";
		const el = make_el("canvas", ui_elements.game,
			"4.44444%", "6.66666%", x, "83%");
		ui_elements.usables.push(el);
	}
	for (var i=0; i<7; i++)
	{
		const x = (66.85+i*4.75).toString() + "%";
		const el = make_el("canvas", ui_elements.game,
			"4.44444%", "6.66666%", x, "91%");
		ui_elements.usables.push(el);
	}

	ui_elements.inventory = make_el("div", ui_elements.game, "60%", "90%", "3%", "5%");
	for (var j=0; j<6; j++)
	for (var i=0; i<10; i++)
	{
		const y = (10+9*j).toString() + "%";
		const x = (5+i*9).toString() + "%";
		const el = make_el("canvas", ui_elements.inventory,
			"7.4074%", "7.4074%", x, y);
		ui_elements.wearables.push(el);
	}

	ui_elements.popup.style.visibility = "hidden";
	ui_elements.game.style.visibility = "hidden";
	ui_elements.menu.style.visibility = "hidden";

	return new Promise(
		(resolve, reject) =>
		{
			resolve("ui::setup done");
		}
	);
}

export function hide_splash()
{
	console.log("ui::hide_splash");
	const splash = document.getElementById("rogue_splash");
	splash.style.visibility = "hidden";

	ui_elements.menu.style.visibility = "visible";
	ui_elements.game.style.visibility = "visible";
}

// the callback should have the signature
//  (command_id, param1, param2) => boolean
// where returning true means call me again with a STEP command to do animation
export function set_command_callback(fn)
{
	console.log("ui::set_command_callback");
}

export function draw(gd)
{
	console.log("ui::draw");

	// FIXME fake
	const tile_img = resources.data.tiles[0];
	for (var i=0; i<5; i++)
	{
		const canvas = ui_elements.usables[i];
		canvas.width = 48;
		canvas.height = 48;
		const ctx = canvas.getContext("2d");
		const srcx = 0;
		const srcy = 80;
		ctx.drawImage(tile_img, srcx, srcy, 48, 48, 0, 0, 48, 48);
		canvas.setAttribute("draggable", "true");
	}
}

// FIXME maybe a function to trigger sounds?

export function error_popup(err)
{
	console.log("ui::error_popup -- "+err);
	const popup = ui_elements.popup;

	popup.replaceChildren();

	const el = document.createElement("div");
	el.textContent = "Errors:";
	popup.appendChild(el);

	for (var i=0; i<err.length; i++)
	{
		const el = document.createElement("div");
		el.textContent = err[i];
		popup.appendChild(el);
	}

	popup.style.visibility = "visible";
}

