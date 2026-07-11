
import * as resources from "./resources.js"

const ui_elements = {
	popup: null,
	menu: null,
	menu_choices: [],
	menu_view: null,
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

function make_canvas(parent, width, height, left, top)
{
	return make_el("canvas", parent, width, height, left, top);
}

function make_icon_button(parent, width, height, left, top)
{
	return make_el("canvas", parent, width, height, left, top);
}

function make_base(parent, width, height, left, top)
{
	return make_el("div", parent, width, height, left, top);
}

function make_float(parent, width, height, left, top)
{
	return make_el("div", parent, width, height, left, top);
}

function make_text(parent, width, height, left, top)
{
	const el = make_el("div", parent, width, height, left, top);
	el.classList.add("rogue_text");
	return el;
}

export function setup()
{
	console.log("ui::setup starting");

	const root = document.getElementById("rogue_top");
	ui_elements.menu = make_base(root, "100%", "100%", "0%", "0%");
	ui_elements.game = make_base(root, "100%", "100%", "0%", "0%");
	ui_elements.popup = make_float(root, "50%", "50%", "25%", "25%");
	ui_elements.view = make_canvas(ui_elements.game, "66.66667%", "100%", "0%", "0%");
	ui_elements.map = make_canvas(ui_elements.game, "30%", "45%", "68%", "3%");
	for (var i=0; i<7; i++)
	{
		const x = (66.85+i*4.75).toString() + "%";
		const el = make_icon_button(ui_elements.game,
			"4.44444%", "6.66666%", x, "75%");
		ui_elements.usables.push(el);
	}
	for (var i=0; i<7; i++)
	{
		const x = (66.85+i*4.75).toString() + "%";
		const el = make_icon_button(ui_elements.game,
			"4.44444%", "6.66666%", x, "83%");
		ui_elements.usables.push(el);
	}
	for (var i=0; i<7; i++)
	{
		const x = (66.85+i*4.75).toString() + "%";
		const el = make_icon_button(ui_elements.game,
			"4.44444%", "6.66666%", x, "91%");
		ui_elements.usables.push(el);
	}

	ui_elements.inventory = make_float(ui_elements.game, "60%", "90%", "3%", "5%");
	for (var j=0; j<6; j++)
	for (var i=0; i<10; i++)
	{
		const xx = i;
		const yy = j;
		const y = (10+9*j).toString() + "%";
		const x = (5+i*9).toString() + "%";
		const el = make_icon_button(ui_elements.inventory,
			"7.4074%", "7.4074%", x, y);
		ui_elements.wearables.push(el);
		el.addEventListener("click", x => handle_wearable_click(xx, yy, x));
	}

	for (var i=0; i<7; i++)
	{
		const y = (30 + i*8).toString() + "%";
		const txt_el = make_text(ui_elements.menu, "50%", "6.667%", "16%", y);
		txt_el.style.fontSize = "6cqh";
		const img_el = make_canvas(ui_elements.menu, "4.444%", "6.667%", "10%", y);
		ui_elements.menu_choices.push({
			text: txt_el,
			image: img_el
		});
	}
	ui_elements.menu_view = make_canvas(ui_elements.menu, "13.333%", "20%", "76.667%", "30%");

	ui_elements.popup.style.visibility = "hidden";
	ui_elements.game.style.visibility = "hidden";
	ui_elements.menu.style.visibility = "hidden";

	ui_elements.view.addEventListener("click", handle_view_click);
	ui_elements.map.addEventListener("click", handle_map_click);

	ui_elements.map.width = 63*10;
	ui_elements.map.height = 63*10;

	return new Promise(
		(resolve, reject) =>
		{
			resolve("ui::setup done");
		}
	);
}

var splash_done = false;

export function hide_splash()
{
	console.log("ui::hide_splash");
	if (splash_done)
		return;

	const splash = document.getElementById("rogue_splash");
	splash.style.visibility = "hidden";

	ui_elements.menu.style.visibility = "visible";
	ui_elements.game.style.visibility = "visible";

	setup_with_resources();
	splash_done = true;
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

	if (gd.is_menu)
	{
		ui_elements.menu.style.visibility = "visible";
		ui_elements.game.style.visibility = "hidden";
		draw_menu(gd);
	}
	else
	{
		ui_elements.menu.style.visibility = "hidden";
		ui_elements.game.style.visibility = "visible";
	}

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

	{
		const canvas = ui_elements.map;
		const ctx = canvas.getContext("2d");
		for (var y=0; y<63; y++)
		for (var x=0; x<63; x++)
		{
			if ((x+y) & 1)
				ctx.fillRect(x*10, y*10, 10, 10);
		}
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

function handle_view_click(evt)
{
	console.log(evt);
}

function handle_map_click(evt)
{
	console.log(evt);
	// to compute canvas coordinates
	// canvas.getBoundingClientRect()
	// use event clientX and clientY for mouse coordinates
	// x = (clientX - rect.left)*xresolution/rect.width;
	var rc = ui_elements.map.getBoundingClientRect();
	console.log((evt.clientX - rc.left)*100/rc.width);
	console.log((evt.clientY - rc.top)*100/rc.height);
}

function handle_wearable_click(x, y, evt)
{
	console.log("x="+x+" y="+y+" evt="+evt);
}

function setup_with_resources()
{
	console.log("ui::setup_with_resources starting");

	const el = resources.data.images.banner;
	el.style.position = "absolute";
	el.style.width = "88.889%";
	el.style.height = "17.778%";
	el.style.left = "5.555%";
	el.style.top = "10%";
	ui_elements.menu.appendChild(el);
}

function draw_menu(gd)
{
	// FIXME what to do when the game data list isn't 7 items long?
	for (var i=0; i<7; i++)
	{
		const data = gd.menu_choices[i];
		const el = ui_elements.menu_choices[i];
		el.text.textContent = data.text;
	}
}

// FIXME cursor changes when moving over text, do something about it.
// FIXME maybe use cqh for more dimensions
// FIXME buid a validator that checks whether the game data meets UI requirements.
