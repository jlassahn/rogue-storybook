
import * as resources from "./resources.js"

export function setup()
{
	console.log("ui::setup starting");
	const root = document.getElementById("rogue_top");
	setup_root(root);

	return new Promise(
		(resolve, reject) =>
		{
			resolve("ui::setup done");
		}
	);
}

export function final_setup()
{
	console.log("ui::final_setup");
	hide_splash();
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
		draw_game(gd);
	}
}

export function play_sound(snd)
{
	console.log("ui::play_sound");
}

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

// the callback should have the signature
//  (command_id, param1, param2) => boolean
// where returning true means call me again with a STEP command to do animation
export function set_command_callback(fn)
{
	console.log("ui::set_command_callback");
	command_callback = fn;
}

const ui_elements = {
	popup: null,
	menu: null,
	menu_choices: [],
	menu_view: null,
	menu_text: null,
	menu_next: null,
	game: null,
	view: null,
	map: null,
	usables: [],
	inventory: null,
	wearables: [],
};

var command_callback = null;

function make_el(kind, parent, width, height, left, top)
{
	const w = (width*100/720).toString() + "cqh";
	const h = (height*100/720).toString() + "cqh";
	const x = (left*100/720).toString() + "cqh";
	const y = (top*100/720).toString() + "cqh";

	const el = document.createElement(kind);
	el.style.position = "absolute";
	el.style.width = w;
	el.style.height = h;
	el.style.left = x;
	el.style.top = y;
	parent.appendChild(el);

	return el;
}

function make_canvas(parent, width, height, left, top)
{
	const el = make_el("canvas", parent, width, height, left, top);
	el.classList.add("rogue_view");
	return el;
}

function make_icon_button(parent, left, top)
{
	const el = make_el("canvas", parent, 48, 48, left, top);
	el.classList.add("rogue_ibutton");
	return el;
}

function make_base(parent)
{
	const el = make_el("div", parent, 1080, 720, 0, 0);
	el.classList.add("rogue_base");
	return el;
}

function make_float(parent, width, height, left, top)
{
	const el = make_el("div", parent, width, height, left, top);
	el.classList.add("rogue_float");
	return el;
}

function make_text(parent, width, height, left, top)
{
	const el = make_el("div", parent, width, height, left, top);
	el.classList.add("rogue_text");
	return el;
}

function setup_root(root)
{
	setup_menu(root);
	setup_game(root);
	setup_popup(root);
}

function setup_menu(root)
{
	ui_elements.menu = make_base(root);
	ui_elements.menu.style.visibility = "hidden";

	for (var i=0; i<7; i++)
	{
		const id = 101+i;
		const y = (216 + i*56);
		const txt_el = make_text(ui_elements.menu, 540, 48, 172, y);
		txt_el.style.fontSize = "6cqh";
		const img_el = make_icon_button(ui_elements.menu, 108, y);
		txt_el.onclick = (evt) => { button_click(id); }
		img_el.onclick = (evt) => { button_click(id); }
		img_el.onmouseover = (evt) => { console.log("mouseover"); }
		img_el.onmouseout = (evt) => { console.log("mouseout"); }
		ui_elements.menu_choices.push({
			text: txt_el,
			image: img_el
		});
	}
	ui_elements.menu_view = make_canvas(ui_elements.menu, 48*3, 48*3, 828, 216);
	ui_elements.menu_text = make_text(ui_elements.menu, 272, 224, 760, 384);
	ui_elements.menu_text.style.fontSize = "4cqh";
	ui_elements.menu_next = make_text(ui_elements.menu, 224, 48, 784, 616);
	ui_elements.menu_next.style.fontSize = "6cqh";
	ui_elements.menu_next.onclick = (evt) => { button_click(110); }
}

function setup_game(root)
{
	ui_elements.game = make_base(root);
	ui_elements.game.style.visibility = "hidden";

	ui_elements.view = make_canvas(ui_elements.game, 720, 720, 0, 0);
	ui_elements.map = make_canvas(ui_elements.game, 324, 324, 734, 20);
	for (var i=0; i<7; i++)
	{
		const x = (732+i*48);
		const el = make_icon_button(ui_elements.game, x, 540+56*0);
		ui_elements.usables.push(el);
	}
	for (var i=0; i<7; i++)
	{
		const x = (732+i*48);
		const el = make_icon_button(ui_elements.game, x, 540+56*1);
		ui_elements.usables.push(el);
	}
	for (var i=0; i<7; i++)
	{
		const x = (732+i*48);
		const el = make_icon_button(ui_elements.game, x, 540+56*2);
		ui_elements.usables.push(el);
	}

	ui_elements.inventory = make_float(ui_elements.game, 648, 648, 32, 36);
	for (var j=0; j<6; j++)
	for (var i=0; i<10; i++)
	{
		const xx = i;
		const yy = j;
		const y = (72+j*56);
		const x = (44+i*56);
		const el = make_icon_button(ui_elements.inventory, x, y);
		ui_elements.wearables.push(el);
		el.addEventListener("click", x => handle_wearable_click(xx, yy, x));
	}

	ui_elements.view.addEventListener("click", handle_view_click);
	ui_elements.map.addEventListener("click", handle_map_click);

	ui_elements.map.width = 63*10;
	ui_elements.map.height = 63*10;
}

function setup_popup(root)
{
	ui_elements.popup = make_float(root, 540, 360, 270, 180);
	ui_elements.popup.style.visibility = "hidden";
}

var splash_done = false;
function hide_splash()
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


function draw_game(gd)
{
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
	for (var i=0; i<7; i++)
	{
		const data = gd.menu_choices[i];
		const el = ui_elements.menu_choices[i];
		el.text.textContent = data.text;
	}
	ui_elements.menu_text.textContent = gd.menu_text;
	ui_elements.menu_next.textContent = gd.menu_next;
}

function button_click(id)
{
	command_callback(0, id, 0);
}

