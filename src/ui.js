
const ui_content = `
<div id="rogue_menu">
	The Main Menu
</div>
<div id="rogue_game">
	The Main Game Screen
</div>
<div id="rogue_popup" style="visibility: hidden;" >
	The emergency popup
</div>
`;

export function setup()
{
	console.log("ui::setup starting");

	const top_div = document.createElement("div");
	top_div.id = "rogue_ui";
	top_div.innerHTML = ui_content;
	const parent = document.getElementById("rogue_top");
	parent.appendChild(top_div);

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
}

// FIXME maybe a function to trigger sounds?

export function error_popup(err)
{
	console.log("ui::error_popup -- "+err);
	const popup = document.getElementById("rogue_popup");

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

